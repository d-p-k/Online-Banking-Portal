package com.axis.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.entity.Account;
import com.axis.entity.GiftCard;
import com.axis.entity.GiftCardResponse;
import com.axis.entity.Users;
import com.axis.service.EmailService;
import com.axis.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/gift-card/customer/giftcard")
//@CrossOrigin("http://localhost:3000/")
public class CustomerController {
	
	@Autowired
	private UserDetailsServiceImpl service;
	
	@Autowired
	private EmailService emailService;
	
	@PostMapping("/buy-giftcard")
	public String buyGiftCard(HttpServletRequest request,@RequestBody Map<String, Object> requestData) {
		String email = request.getAttribute("email").toString();
		Users user = service.findUser(email);
		Account account = service.findAccount(user.getId());
		
		String giftcardname = String.valueOf(requestData.get("giftcardname").toString());
		String recipientname = String.valueOf(requestData.get("recipientname").toString());
		String recipientemail = String.valueOf(requestData.get("recipientemail").toString());
		double giftcardamount=Double.valueOf(requestData.get("giftcardamount").toString());
		
		Users recipient = service.findUser(recipientemail);
		
		GiftCard giftCard = new GiftCard(giftcardname,recipientname,recipientemail,giftcardamount,account);
		service.buyGiftCard(giftCard);
		emailService.buyGiftCardEmail(user, recipient, giftcardname, giftcardamount);
		
		return "You've successfully purchased " + giftcardname;
	}
	
	@GetMapping("/my-giftcards-purchased")
	public List<GiftCardResponse> myGiftCardsPurchased(HttpServletRequest request) {
		String email = request.getAttribute("email").toString();
		Users user = service.findUser(email);
		Account account = service.findAccount(user.getId());
		
		List<GiftCard> lGiftCard = service.showAllMyGiftCardsPurchased(account.getAccid());
		
		List<GiftCardResponse> lGiftCardResponse = new ArrayList<>();
		for(GiftCard g : lGiftCard) {
			GiftCardResponse gcr = new GiftCardResponse(g.getGiftcardname(),g.getRecipientname(),g.getRecipientemail(),g.getGiftcardamount());
			lGiftCardResponse.add(gcr);
		}
		
		return lGiftCardResponse;
	}
	
}
