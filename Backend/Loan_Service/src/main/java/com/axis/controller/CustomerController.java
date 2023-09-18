package com.axis.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.entity.Loan;
import com.axis.entity.LoanResponse;
import com.axis.entity.Users;
import com.axis.service.EmailService;
import com.axis.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/loan/customer/loan")
//@CrossOrigin("http://localhost:3000/")
public class CustomerController {
	
	@Autowired
	private UserDetailsServiceImpl service;
	
	@Autowired
	private EmailService emailService;
	
	@GetMapping("/my-loans")
	public List<LoanResponse> myLoans(HttpServletRequest request) {
		String email = request.getAttribute("email").toString();
		Users user = service.findUser(email);
		int accid = service.findAccId(user.getId());
		List<Loan> lLoan = service.fetchAllMyLoans(accid);
		
		List<LoanResponse> lLoanResponse = new ArrayList<>();
		for(Loan l : lLoan) {
			LoanResponse loanResponse = new LoanResponse(l.getLoanid(),l.getLoantype(),l.getLoanamount(),l.getMonthlyemi(),l.getStatedate(),l.getEnddate(),l.getDuration(),l.getStatus());
			lLoanResponse.add(loanResponse);
		}
		return lLoanResponse;
	}
	
	@PostMapping("/apply-loan")
	public String applyLoan(HttpServletRequest request,@RequestBody Map<String, Object> requestData) {
		String email = request.getAttribute("email").toString();
		Users user = service.findUser(email);
		
		String loantype = String.valueOf(requestData.get("loantype").toString());
		double loanamount=Double.valueOf(requestData.get("loanamount").toString());
		int duration = Integer.valueOf(requestData.get("duration").toString());
		
		int accid = service.findAccId(user.getId());
		List<Loan> lLoan = service.fetchAllMyLoans(accid);
		for(Loan loan : lLoan) {
			if(loan.getLoantype().equals(loantype) && !loan.getStatus().equals("COMPLETED")) 
				return "Sorry you can't perform this action because you already have " + loantype;
		}
		
		service.applyLoan(loantype, loanamount, duration, user.getId());
		emailService.applyLoanEmail(user, loantype, loanamount, duration);
		
		return "You've successfully applied for " + loantype;
	}
	
	@PutMapping("/loan-payment")
	public String loanPayment(HttpServletRequest request,@RequestBody Map<String, Object> requestData) {
		String email = request.getAttribute("email").toString();
		Users user = service.findUser(email);
		int accid = service.findAccId(user.getId());
		
		String loantype = String.valueOf(requestData.get("loantype").toString());
		double loanemi=Double.valueOf(requestData.get("loanemi").toString());
		
		List<Loan> lLoan = service.fetchAllMyLoans(accid);
		for(Loan loan : lLoan) {
			if(loan.getLoantype().equals(loantype) && loan.getStatus().equals("ACTIVE")) {
				
				service.loanPayment(loantype, loanemi, accid, user.getId());
				emailService.loanPaymentEmail(user, loantype, loanemi);
				
				return loantype + " EMI payment is done successfully.";
			}
		}
		return "Sorry you can't perform this action because you don't have any active " + loantype;
	}
}
