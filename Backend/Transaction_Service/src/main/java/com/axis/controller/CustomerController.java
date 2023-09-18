package com.axis.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.entity.Account;
import com.axis.entity.Transaction;
import com.axis.entity.Users;
import com.axis.service.EmailService;
import com.axis.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/transaction/customer/transaction")
//@CrossOrigin("http://localhost:3000/")
public class CustomerController {
	
	@Autowired
	private UserDetailsServiceImpl service;
	
	@Autowired
	private EmailService emailService;
	
	@GetMapping("/show-all-my-transactions")
	public List<Transaction> showAllMyTransactions(HttpServletRequest request) {
		String email=request.getAttribute("email").toString();
		int userid=service.findUserIdByEmail(email);
		int accid=service.findAccountIdByUserId(userid);
		return service.fetchTransactionsForAccId(accid);
	}
	
	@PutMapping("/deposit")
	public String deposit(HttpServletRequest request,@RequestBody Map<String, Object> requestData) {
		String email=request.getAttribute("email").toString();
		double amount=Double.valueOf(requestData.get("amount").toString());
		int userid=service.findUserIdByEmail(email);
		Account account=service.findAccountByUserId(userid);
		System.out.println("\n" + account.getStatus() + "\n");
		if(account.getStatus().equals("PENDING"))
			return "Sorry your account is not active yet. You can't perform transaction.";
		if(amount<0)
			return "Sorry you entered negative amount. Please enter positive amount.";
		
		emailService.transactionConfirmationEmail(userid, account.getAccno(), account.getBalance()+amount, amount, "Deposit", "Deposited From Bank/ATM");
		service.deposit(userid, account.getBalance()+amount,amount);
		return "Amount is successfully deposited.";
	}
	
	@PutMapping("/withdraw")
	public String withdraw(HttpServletRequest request,@RequestBody Map<String, Object> requestData) {
		String email=request.getAttribute("email").toString();
		double amount=Double.valueOf(requestData.get("amount").toString());
		int userid=service.findUserIdByEmail(email);
		Account account=service.findAccountByUserId(userid);
		if(account.getStatus().equals("PENDING"))
			return "Sorry your account is not active yet. You can't perform transaction.";
		if(amount<0)
			return "Sorry you entered negative amount. Please enter positive amount.";
		if(account.getBalance()-amount<10000)
			return "You don't have sufficient balance. Minimum balance should be 10000.";
		
		emailService.transactionConfirmationEmail(userid, account.getAccno(), account.getBalance()-amount, amount, "Withdrawal", "Withdrawal From Bank/ATM");
		service.withdraw(userid, account.getBalance()-amount,amount);
		return "Amount is successfully withdrawal.";
	}
	
	@PutMapping("/bank-transfer")
	public String bankTransfer(HttpServletRequest request,@RequestBody Map<String, Object> requestData) {
		String email1=request.getAttribute("email").toString();
		int userid1=service.findUserIdByEmail(email1);
		Account account1=service.findAccountByUserId(userid1);
		
		if(account1.getStatus().equals("PENDING"))
			return "Sorry your account is not active yet. You can't perform transaction.";
		
		String accno2=String.valueOf(requestData.get("accno").toString());
		String ifsccode2=String.valueOf(requestData.get("ifsccode").toString());
		String email2=String.valueOf(requestData.get("email").toString());
		double amount=Double.valueOf(requestData.get("amount").toString());
		
		int userid2=service.findUserIdByEmail(email2);
		
		Users user1=service.findUser(email1);
		Users user2=service.findUser(email2);
				
		if(user2!=null) {
			Account account2=service.findAccountByUserId(user2.getId());
			if(account2.getStatus().equals("PENDING"))
				return "Sorry receiver's account is not active yet. You can't perform transaction.";
			if(account2.getAccno().equals(accno2) && account2.getIfsccode().equals(ifsccode2)) {
				if(amount<0)
					return "Sorry you entered negative amount. Please enter positive amount.";
				if(account1.getBalance()-amount<10000)
					return "You don't have sufficient balance. Minimum balance should be 10000.";
				
				emailService.transactionConfirmationEmail(userid1, account1.getAccno(), account1.getBalance()-amount, amount, "Withdrawal", "Bank Transfer Withdrawal for " + user2.getUsername());
				service.bankTransferWithdraw(userid1,account1.getBalance()-amount,amount);
				
				emailService.transactionConfirmationEmail(userid2, account2.getAccno(), account2.getBalance()+amount, amount, "Deposit", "Bank Transfer Deposited by " + user1.getUsername());
				service.bankTransferDeposit(userid2,account2.getBalance()+amount,amount);
				return "Amount is successfully transfered.";
			}
		}
		return "Sorry you entered invalid details. Please try again.";
	}
}
