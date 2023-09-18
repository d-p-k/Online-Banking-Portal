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

import com.axis.entity.Users;
import com.axis.repository.AccountRepository;
import com.axis.repository.UserRepository;

@Service
public class EmailService {
	
	@Autowired
	private UserRepository ur;
	
	public void transactionConfirmationEmail(int userid, String accno, double totalBalance, double amount, String type, String desc) {
		Users user = ur.findByUserId(userid);
		String subject = "Transaction Confirmation - Apex Bank";
		String message = "Dear " + user.getUsername() + ",\n\n" +
                "We want to inform you that a " + type + " has been processed on your Apex Bank account.\n\n" +
                "Transaction Details:\n" +
                "- Type: " + type + "\n" +
                "- Description: " + desc + "\n" +
                "- Amount: ₹ " + amount + "\n" +
                "- Total Balance: ₹ " + totalBalance + "\n" +
                "- Date and Time: " + getCurrentDate() + "\n" + 
                "- Account: " + accno + "\n\n" + 
                "If you have any questions or concerns, please contact our customer support team.\n\n" +
                "Thank you for choosing Apex Bank.\n\n" +
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
