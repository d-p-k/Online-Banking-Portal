package com.axis.service;

import java.text.SimpleDateFormat;
import java.util.Date;
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

import com.axis.entity.Locker;
import com.axis.entity.Users;
import com.axis.repository.AccountRepository;
import com.axis.repository.LockerRepository;
import com.axis.repository.UserRepository;

@Service
public class EmailService {

	@Autowired
	private UserRepository ur;
	
	@Autowired
	private AccountRepository ar;
	
	@Autowired
	private LockerRepository lr;

	public void applyForLockerEmail(Users user, String lockerType, String lockerSize, String lockerLocation) {
		String subject = "Locker Application Request By You - Apex Bank";
		String message = "Dear " + user.getUsername() + ",\n\n" +
				"We have received your application for a " + lockerType + " at Apex Bank.\n\n" +
                "Locker Details:\n" +
                "- Locker Type: " + lockerType + "\n" +
                "- Locker Size: " + lockerSize + "\n" +
                "- Locker Location: " + lockerLocation + "\n\n" +
                "Our team is currently reviewing your application, and we will notify you as soon as a locker becomes available.\n\n" +
                "If you have any questions or require further assistance, please feel free to contact our customer service.\n\n" +
                "Thank you for choosing Apex Bank for your banking needs.\n\n" +
                "Best regards,\n" +
				"Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}
	
	public void closeLockerRequestEmail(Users user, String lockerType) {
		String subject = "Locker Closure Request By You - Apex Bank";
		String message = "Dear " + user.getUsername() + ",\n\n" +
				"We have received your request for the closure of your " + lockerType + " at Apex Bank.\n\n" +
                "Our team is currently reviewing your request, and we will process it accordingly.\n\n" +
                "Once your locker closure request has been approved and processed by our employees, we will notify you with the confirmation and further instructions.\n\n" +
                "If you have any questions or require any assistance, please feel free to contact our customer service or visit your nearest branch.\n\n" +
                "Thank you for using our locker services. We appreciate your cooperation.\n\n" +
                "Best regards,\n" +
				"Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}
	
	public void lockerPaymentEmail(Users user, String lockerType, Double lockerAmount) {		
		String subject = "Locker Payment Confirmation - Apex Bank";
		String message = "Dear " + user.getUsername() + ",\n\n" +
				"This is to confirm that your payment for the " + lockerType + " has been successfully processed.\n\n" +
                "Payment Details:\n" +
                "- Locker Type: " + lockerType + "\n" +
                "- Amount: ₹" + lockerAmount + "\n" +
                "- Date and Time: " + getCurrentDate() + "\n\n" +
                "Thank you for your prompt payment. Your cooperation is greatly appreciated.\n\n" +
                "If you have any questions or require any further assistance, please feel free to contact our customer service.\n\n" +
                "Best regards,\n" +
				"Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}
	
	public void activateLockerEmail(Locker locker) {
		int accid = lr.getAccIdByLockerId(locker.getLockerid());
		int userid = ar.getUserIdByAccId(accid);
		Users user = ur.findByUserId(userid);
		
		String subject = "Locker Approval - Apex Bank";
		String message = "Dear " + user.getUsername() + ",\n\n" +
				"We are pleased to inform you that your " + locker.getLockertype() + " at Apex Bank has been successfully activated.\n\n" +
                "You now have access to your locker to store your belongings securely.\n\n" +
                "If you have any questions or require any assistance, please feel free to contact our customer service or visit your nearest branch.\n\n" +
                "Thank you for choosing Apex Bank for your locker needs. We appreciate your trust.\n\n" +
                "Best regards,\n" +
                "Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}

	public void foreCloseLockerEmail(Locker locker) {
		int accid = lr.getAccIdByLockerId(locker.getLockerid());
		int userid = ar.getUserIdByAccId(accid);
		Users user = ur.findByUserId(userid);
		
		String subject = "Locker Closure - Apex Bank";
		String message = "Dear " + user.getUsername() + ",\n\n" +
				"We regret to inform you that your " + locker.getLockertype() + " at Apex Bank has been closed.\n\n" +
                "As per your request, our employee has processed the closure of your locker.\n\n" +
                "Please make sure to remove all your belongings from the locker by the designated date and time.\n\n" +
                "If you have any questions or require any assistance, please contact our customer service or visit your nearest branch.\n\n" +
                "Thank you for using our locker services. We appreciate your cooperation.\n\n" +
                "Best regards,\n" +
                "Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}
	
	private String getCurrentDate() {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return dateFormat.format(new Date());
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
