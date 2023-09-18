package com.axis.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.entity.CreditCard;
import com.axis.service.EmailService;
import com.axis.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/credit-card/employee/creditcard")
//@CrossOrigin("http://localhost:3000/")
public class EmployeeController {

	@Autowired
	private UserDetailsServiceImpl service;
	
	@Autowired
	private EmailService emailService;
	
	@PutMapping("/activate-credit-card")
	public String activateCreditCard(@RequestBody Map<String, Object> requestData) {
		int creditcardid=Integer.valueOf(requestData.get("creditcardid").toString());
		CreditCard creditCard = service.findCreditCardByCreditCardId(creditcardid);
		emailService.activateCreditCardEmail(creditCard);
		service.activateCreditCard(creditcardid);
		return "Credit card is successfully activated now";
	}
	
	@PutMapping("/foreclose-credit-card")
	public String foreCloseCreditCard(@RequestBody Map<String, Object> requestData) {
		int creditcardid=Integer.valueOf(requestData.get("creditcardid").toString());
		CreditCard creditCard = service.findCreditCardByCreditCardId(creditcardid);
		emailService.closeCreditCardEmail(creditCard);
		service.foreCloseCreditCard(creditcardid);
		return "Credit card is successfully closed now";
	}
	
	@GetMapping("/pending-credit-cards")
	public List<CreditCard> pendingCreditCards() {
		return service.pendingCreditCards();
	}
	
	@GetMapping("/active-credit-cards")
	public List<CreditCard> activeCreditCards() {
		return service.activeCreditCards();
	}
	
	@GetMapping("/closed-credit-cards")
	public List<CreditCard> closedCreditCards() {
		return service.closedCreditCards();
	}
	
	@GetMapping("/credit-card-closing-requests")
	public List<CreditCard> closingCreditCardRequests() {
		return service.closingCreditCardRequests();
	}
	
	@GetMapping("/all-credit-cards")
	public List<CreditCard> allCreditCards() {
		return service.allCreditCards();
	}
	
}
