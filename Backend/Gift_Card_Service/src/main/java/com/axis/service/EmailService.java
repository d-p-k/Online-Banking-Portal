package com.axis.service;

import java.time.LocalDate;
import java.util.Properties;
import java.util.Random;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

import com.axis.entity.Users;

@Service
public class EmailService {

	public void buyGiftCardEmail(Users customer, Users recipient, String giftCardName, double giftCardAmount) {
		
		String customerSubject = "Gift Card Purchase Confirmation - Apex Bank";
		String customerMessage = "Dear " + customer.getUsername() + ",\n\n" + 
				"Thank you for purchasing a " + giftCardName + " from Apex Bank.\n\n" + 
				"You have successfully purchased a gift card worth ₹" + giftCardAmount + " for " + recipient.getUsername() + ".\n\n" + 
				"Please keep this email as your purchase confirmation. The gift card will be sent to the recipient's email address provided.\n\n" + 
				"If you have any questions or require any further assistance, please feel free to contact our customer service.\n\n" + 
				"Thank you for choosing Apex Bank for your gift card needs. We appreciate your business.\n\n" +
				"Best regards,\n" +
				"Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";

		sendEmail(customer.getEmail(), customerSubject, customerMessage);

		String recipientSubject = "Gift Card Received - Apex Bank";
		String recipientMessage = "Dear " + recipient.getUsername() + ",\n\n" + 
				"Congratulations! You have received a " + giftCardName + " from " + customer.getUsername() + ".\n\n" + 
				"Please find below the details of your gift card:\n" + 
				"- Serial Number: " + generateSerialNumber() + "\n" + 
				"- PIN: " + generateRedemptionPin() + "\n" + 
				"- Value: ₹" + giftCardAmount + "\n" + 
				"- Validity: " + LocalDate.now().plusMonths(1) + "\n\n" + 
				"Please keep this information safe and secure. When using the gift card, you will be required to provide the serial number and PIN.\n\n" + 
				"If you have any questions or require any assistance, please feel free to contact our customer service.\n\n" + 
				"Thank you for choosing Apex Bank. We hope you enjoy your gift card.\n\n" + 
				"Best regards,\n" +
				"Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";

		sendEmail(recipient.getEmail(), recipientSubject, recipientMessage);
	}

	public static String generateSerialNumber() {
		Random random = new Random();
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < 16; i++)
			sb.append(random.nextInt(10));
		return sb.toString();
	}

	public static String generateRedemptionPin() {
		Random random = new Random();
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < 6; i++)
			sb.append(random.nextInt(10));
		return sb.toString();
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
