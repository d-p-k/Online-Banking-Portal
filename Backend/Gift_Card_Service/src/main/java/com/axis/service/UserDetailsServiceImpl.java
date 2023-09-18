package com.axis.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.axis.entity.Account;
import com.axis.entity.GiftCard;
import com.axis.entity.Transaction;
import com.axis.entity.Users;
import com.axis.repository.AccountRepository;
import com.axis.repository.CustomerTransactionRepository;
import com.axis.repository.GiftCardRepository;
import com.axis.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	private UserRepository ur;
	
	@Autowired
	private AccountRepository ar;
	
	@Autowired
	private GiftCardRepository gr;
	
	@Autowired
	private CustomerTransactionRepository ctr;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("Validating user...................."+email);
		Users result = ur.findByEmail(email);
		System.out.println("User validation successful........."+result.getEmail());
		return new UserDetailsImpl(result);
	}
	
	public void buyGiftCard(GiftCard giftCard) {
		gr.save(giftCard);
		ar.withdrawAmount(giftCard.getAccount().getAccid(), giftCard.getGiftcardamount());
		Transaction t=new Transaction(generateTransactionId(), LocalDateTime.now(), giftCard.getGiftcardamount(), giftCard.getGiftcardname() + " Withdrawal", "DEBIT", giftCard.getAccount());
		ctr.save(t);
	}
	
	public List<GiftCard> showAllMyGiftCardsPurchased(int accid) {
		return gr.findGiftCardsByAccId(accid);
	}
	
	public Users findUser(String email) {
		return ur.findByEmail(email);
	}
	
	public Account findAccount(int userid) {
		return ar.findAccountByUserId(userid);
	}
	
	public static String generateTransactionId() {
		String ALPHANUMERIC_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	    int ID_LENGTH = 15;
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(ID_LENGTH);
        for (int i = 0; i < ID_LENGTH; i++) {
            int randomIndex = random.nextInt(ALPHANUMERIC_CHARS.length());
            char randomChar = ALPHANUMERIC_CHARS.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString();
    }
	

}
