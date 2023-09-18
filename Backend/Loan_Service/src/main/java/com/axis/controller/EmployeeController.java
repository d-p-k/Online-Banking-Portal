package com.axis.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.entity.Loan;
import com.axis.service.EmailService;
import com.axis.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/loan/employee/loan")
//@CrossOrigin("http://localhost:3000/")
public class EmployeeController {
	
	@Autowired
	private UserDetailsServiceImpl service;
	
	@Autowired
	private EmailService emailService;
	
	@GetMapping("/all-loans")
	public List<Loan> allLoans() {		
		return service.fetchAllLoans();
	}
	
	@GetMapping("/pending-loans")
	public List<Loan> pendingLoanRequests() {		
		return service.fetchAllPendingLoans();
	}
	
	@GetMapping("/active-loans")
	public List<Loan> activeLoans() {		
		return service.fetchAllActiveLoans();
	}
	
	@GetMapping("/completed-loans")
	public List<Loan> completedLoanRequests() {		
		return service.fetchAllCompletedLoans();
	}
	
	
	@PutMapping("/activate-loan")
	public String activeLoan(@RequestBody Map<String, Object> requestData) {
		int loanid = Integer.valueOf(requestData.get("loanid").toString());
		Loan loan = service.findLoanByLoanId(loanid);
		
		service.activeLoanStatus(loanid);
		service.updateAmountByAccId(loan.getLoanamount(),loan.getAccount().getAccid());
		service.loanDeposit(loan.getLoanamount(), loan.getLoantype(), loan.getAccount());
		emailService.activateLoanEmail(loan);
		
		return loan.getLoantype() + " is activated successfully";
	}
	
	@PutMapping("/close-loan")
	public String closeLoan(@RequestBody Map<String, Object> requestData) {
		int loanid = Integer.valueOf(requestData.get("loanid").toString());
		Loan loan = service.findLoanByLoanId(loanid);
		
		emailService.closeLoan(loan);
		service.closeLoan(loanid);
		
		return "Loan is foreclosed successfully";
	}
	
}
