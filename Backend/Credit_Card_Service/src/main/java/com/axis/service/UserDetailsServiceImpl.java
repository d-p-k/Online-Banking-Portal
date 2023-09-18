package com.axis.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.axis.entity.Account;
import com.axis.entity.CreditCard;
import com.axis.entity.Users;
import com.axis.repository.AccountRepository;
import com.axis.repository.CreditCardRepository;
import com.axis.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	private UserRepository ur;

	@Autowired
	private AccountRepository ar;
	
	@Autowired
	private CreditCardRepository ccr;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("Validating user...................."+email);
		Users result = ur.findByEmail(email);
		System.out.println("User validation successful........."+result.getEmail());
		return new UserDetailsImpl(result);
	}
	
	public CreditCard findCreditCardByCreditCardId(int creditcardid) {
		return ccr.findCreditCardByCreditCardId(creditcardid);
	}
	
	public Users findUser(String email) {
		return ur.findByEmail(email);
	}
	
	public void applyForCreditCard(Users user,String creditcardname) {
		LocalDate expiryDate = LocalDate.now().plusMonths(60);
		CreditCard creditCard = new CreditCard(creditcardname, generateCreditCardNumber(), generateCVV(), 100000, expiryDate, "PENDING", findAccountByUserId(user.getId()));
		ccr.save(creditCard);
	}
	
	public void closeCreditCardRequest(Users user,String creditcardname) {
		Account account = ar.findAccountByUserId(user.getId());
		ccr.closeCreditCardRequest(account.getAccid(),creditcardname);
	}
	
	public List<CreditCard> getAllMyCreditCards(Users user) {
		Account account = ar.findAccountByUserId(user.getId());
		return ccr.getAllMyCreditCards(account.getAccid());
	}
	
	public void activateCreditCard(int creditcardid) {
		ccr.activateCreditCard(creditcardid);
	}
	
	public void foreCloseCreditCard(int creditcardid) {
		ccr.foreCloseCreditCard(creditcardid);
	}
	
	public List<CreditCard> pendingCreditCards() {
		return ccr.pendingCreditCards();
	}
	
	public List<CreditCard> activeCreditCards() {
		return ccr.activeCreditCards();
	}
	
	public List<CreditCard> closedCreditCards() {
		return ccr.closedCreditCards();
	}
	
	public List<CreditCard> closingCreditCardRequests() {
		return ccr.closingCreditCardRequests();
	}
	
	public List<CreditCard> allCreditCards() {
		return ccr.findAll();
	}

	public Account findAccountByUserId(int userid) {
		return ar.findAccountByUserId(userid);
	}
	
	public static String generateCreditCardNumber() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 16; i++) 
            sb.append(random.nextInt(10));
        return sb.toString();
    }

	public static String generateCVV() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 3; i++) 
            sb.append(random.nextInt(10));
        return sb.toString();
    }
}
