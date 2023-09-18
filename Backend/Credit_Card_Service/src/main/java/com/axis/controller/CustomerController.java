package com.axis.controller;

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

import com.axis.entity.CreditCard;
import com.axis.entity.Users;
import com.axis.service.EmailService;
import com.axis.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/credit-card/customer/creditcard")
//@CrossOrigin("http://localhost:3000/")
public class CustomerController {
	
	@Autowired
	private UserDetailsServiceImpl service;
	
	@Autowired
	private EmailService emailService;
	
	@PostMapping("/apply-for-credit-card")
	public String applyForCreditCard(HttpServletRequest request,@RequestBody Map<String, Object> requestData) {
		String email = request.getAttribute("email").toString();
		Users user = service.findUser(email);
		String creditcardname=String.valueOf(requestData.get("creditcardname").toString());
		
		List<CreditCard> lCreditCard = service.getAllMyCreditCards(user);
		for(CreditCard creditCard : lCreditCard) {
			if(creditCard.getCreditcardname().equals(creditcardname) && !creditCard.getStatus().equals("CLOSED"))
				return "Sorry you can't perform this action because you already have " + creditcardname;
		}
		service.applyForCreditCard(user,creditcardname);
		emailService.applyForCreditCardEmail(user, creditcardname);
		return "You've successfully applied for " + creditcardname;
	}
	
	@PutMapping("/close-credit-card-request")
	public String closeCreditCardRequest(HttpServletRequest request,@RequestBody Map<String, Object> requestData) {
		String email = request.getAttribute("email").toString();
		Users user = service.findUser(email);
		String creditcardname=String.valueOf(requestData.get("creditcardname").toString());
		
		boolean isCreditCardAvailable=false;
		List<CreditCard> lCreditCard = service.getAllMyCreditCards(user);
		for(CreditCard creditCard : lCreditCard) {
			if(creditCard.getCreditcardname().equals(creditcardname)) {
				isCreditCardAvailable=true;
				if(!creditCard.getStatus().equals("CLOSED")) {
					emailService.closeCreditCardRequestEmail(user, creditcardname);
					service.closeCreditCardRequest(user, creditcardname);
					return "Your request for closing " + creditcardname + " has been sent to employee successfully";
				}
			}
		}
		if(isCreditCardAvailable==true) 
			return "Sorry you can't perform this operation because your " + creditcardname + " is already closed.";
		return "Sorry you can't perform this action because you don't have " + creditcardname;
	}
	
	@GetMapping("/my-credit-cards")
	public List<CreditCard> getAllMyCreditCards(HttpServletRequest request) {
		String email = request.getAttribute("email").toString();
		Users user = service.findUser(email);
		return service.getAllMyCreditCards(user);
	}

}
