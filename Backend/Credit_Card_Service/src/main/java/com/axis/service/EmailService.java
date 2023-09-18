package com.axis.service;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.entity.CreditCard;
import com.axis.entity.Users;
import com.axis.repository.AccountRepository;
import com.axis.repository.CreditCardRepository;
import com.axis.repository.UserRepository;

@Service
public class EmailService {

	@Autowired
	private UserRepository ur;
	
	@Autowired
	private AccountRepository ar;
	
	@Autowired
	private CreditCardRepository ccr;
	
	public void applyForCreditCardEmail(Users user, String creditCardName) {
		String subject = "Credit Card Request By You - Apex Bank";
		String message = "Dear " + user.getUsername() + ",\n\n" +
                "Thank you for applying for the " + creditCardName + " at Apex Bank.\n\n" +
                "We have received your credit card application, and our team is currently reviewing it.\n\n" +
                "Once the application review is complete, we will notify you regarding the status of your application.\n\n" +
                "If you have any questions or require any further assistance, please feel free to contact our customer service.\n\n" +
                "Thank you for choosing Apex Bank for your financial needs. We look forward to serving you.\n\n" +
                "Best regards,\n" +
                "Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}
	
	public void closeCreditCardRequestEmail(Users user, String creditCardName) {
		String subject = "Credit Card Closure Request By You - Apex Bank";
		String message = "Dear " + user.getUsername() + ",\n\n" +
				"We have received your request for the closure of your " + creditCardName + " at Apex Bank.\n\n" +
                "Our team is currently reviewing your request, and we will process it accordingly.\n\n" +
                "Once your credit card closure request has been approved and processed by our employees, we will notify you with the confirmation and further instructions.\n\n" +
                "If you have any questions or require any assistance, please feel free to contact our customer service.\n\n" +
                "Thank you for being a valued customer of Apex Bank.\n\n" +
                "Best regards,\n" +
                "Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}
	
	public void activateCreditCardEmail(CreditCard creditCard) {
		int accid = ccr.getAccIdByCreditCardId(creditCard.getCreditcardid());
		int userid = ar.findUserIdByAccountId(accid);
		Users user = ur.findByUserId(userid);
		
		String subject = "Credit Card Activation - Apex Bank";
		String message = "Dear " + user.getUsername() + ",\n\n" +
                "We are delighted to inform you that your " + creditCard.getCreditcardname() + " at Apex Bank has been successfully activated.\n\n" +
                "You can now start enjoying the benefits and privileges that come with your new credit card.\n\n" +
                "If you have any questions or require any assistance, please feel free to contact our customer service or refer to the user guide provided with your credit card.\n\n" +
                "Thank you for choosing Apex Bank. We appreciate your trust in us.\n\n" +
                "Best regards,\n" +
                "Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}
	
	public void closeCreditCardEmail(CreditCard creditCard) {
		int accid = ccr.getAccIdByCreditCardId(creditCard.getCreditcardid());
		int userid = ar.findUserIdByAccountId(accid);
		Users user = ur.findByUserId(userid);
		
		String subject = "Credit Card Closure - Apex Bank";
		String message = "Dear " + user.getUsername() + ",\n\n" +
				"We regret to inform you that your " + creditCard.getCreditcardname() + " at Apex Bank has been closed.\n\n" +
                "As per your request, our employee has processed the closure of your credit card.\n\n" +
                "Please ensure to settle any pending dues and cut the credit card into multiple pieces for security reasons.\n\n" +
                "If you have any questions or require any assistance, please contact our customer service or visit your nearest branch.\n\n" +
                "Thank you for being a valued customer of Apex Bank.\n\n" +
                "Best regards,\n" +
                "Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}

	public boolean sendEmail(String to, String subject, String message) {
		boolean f = false;

		String from = "info.apexbanking@gmail.com";

		// variable for email
		String host = "smtp.gmail.com";

		// get the system properties
		Properties properties = System.getProperties();
		System.out.print(properties);

		// host set
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", 465);
		properties.put("mail.smtp.ssl.enable", "true");
		properties.put("mail.smtp.auth", "true");

		// get the session object
		Session session = Session.getInstance(properties, new Authenticator() {

			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication("info.apexbanking@gmail.com", "hhvjdcdgclhgxrls");
			}

		});
		session.setDebug(true);

		MimeMessage m = new MimeMessage(session);

		try {
			m.setFrom(from);
			m.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
			m.setSubject(subject);
			m.setText(message);
			Transport.send(m);
			System.out.println("Sent Successfully...");
			f = true;
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		return f;
	}
}
