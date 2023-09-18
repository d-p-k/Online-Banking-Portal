package com.axis.service;

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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.entity.Users;
import com.axis.repository.AccountRepository;
import com.axis.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {
	
	private Map<String, String> map = new HashMap<>();
	
	@Autowired
	private AccountRepository ar;
	
	@Autowired
	private UserRepository ur;
	
	public void activateAccountEmail(int accid) {
		int userid = ar.findUserIdByAccId(accid);
		Users user = ur.findByUserId(userid);
		String subject = "Account Activated - Welcome to Apex Bank!";
		String message = "Dear " + user.getUsername() + ",\n\n" +
                "Good news! Your Apex Bank account is now activated. Welcome!\n\n" +
                "With your activated account, you can enjoy a range of convenient and secure banking services. From managing your finances online to making transactions hassle-free, we're here to make your banking experience smooth and efficient.\n\n" +
                "If you have any questions, our team is ready to assist you. Feel free to contact us through our customer support helpline or visit our nearest branch.\n\n" +
                "Thank you for choosing Apex Bank. We're excited to be your banking partner.\n\n" +
                "Best regards,\n" +
                "Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}

	public void deleteUserAndAccount(int userid) {
		Users user = ur.findByUserId(userid);
		String subject = "Account Closure Notice from Apex Bank!";
		String message = "Dear " + user.getUsername() + ",\n\n" +
                "We hope this message finds you well. We wanted to inform you of an important account update regarding your Apex Bank account.\n\n" +
                "Please be advised that, as per your request or for administrative reasons, your account has been removed from our system. We would like to express our gratitude for being a valued customer during your time with Apex Bank.\n\n" +
                "If you have any questions or require further assistance, our customer support team is here to help. Feel free to reach out to us via phone or visit one of our branches.\n\n" +
                "Thank you for being a part of Apex Bank. We appreciate your trust and hope to have the opportunity to serve you again in the future.\n\n" +
                "Best regards,\n" +
                "Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}
	
	public void accountRegisteredEmail(Users user) {
		String subject = "Welcome to Apex Bank - Account Registration Successful!";
		String message = "Dear " + user.getUsername() + ",\n\n" +
                "Congratulations on successfully registering your account with Apex Bank! We are excited to have you on board.\n\n" +
                "Please note that your account will require approval from our team before you can log in. Once your account is approved, we will send you an email with login instructions.\n\n" +
                "At Apex Bank, we are committed to providing you with a seamless and secure banking experience. Our online services include easy fund transfers, bill payment, mobile banking, and access to our extensive ATM network.\n\n" +
                "Thank you for choosing Apex Bank as your banking partner. We look forward to serving you soon.\n\n" +
                "Best regards,\n" +
                "Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}
	
	public void employeeRegisteredEmail(Users user) { 
		String subject = "Welcome to Apex Bank - Employee Registration Successful!";
		String message = "Dear " + user.getUsername() + ",\n\n" +
                "Congratulations! You have been successfully added to Apex Bank.\n\n" +
                "Your employee account has been created, and you can now access the internal systems and tools.\n\n" +
                "Please use the provided login credentials to access your employee account:\n" +
                "Email: " + user.getEmail() + "\n" +
                "Password: " + user.getPassword() + "\n\n" +
                "We recommend changing your password upon your first login for security purposes.\n\n" +
                "If you have any questions or require any assistance, please contact the HR department or your supervisor.\n\n" +
                "Thank you for joining Apex Bank. We look forward to working with you.\n\n" +
                "Best regards,\n" +
                "Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}
	
	public void deleteEmployeeEmail(int userid) { 
		Users user = ur.findByUserId(userid);
		String subject = "Account Closure Notice from Apex Bank!";
		String message = "Dear " + user.getUsername() + ",\n\n" +
                "We regret to inform you that your employee account at Apex Bank has been deleted by the administrator.\n\n" +
                "You will no longer have access to the internal systems and tools.\n\n" +
                "If you have any questions or require any further information, please contact the HR department.\n\n" +
                "Thank you for your contributions during your time at Apex Bank.\n\n" +
                "Best regards,\n" +
                "Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}
	
	public void sendOTPEmail(String email) {
		String OTP = generateOTP();
		map.put(email, OTP);
		
		Users user = ur.findByEmail(email);
		
		String subject = "Password Reset - Verification Code";
		String message = "Dear " + user.getUsername() + ",\n\n" +
                "You have requested to reset your password for your Apex Bank account.\n\n" +
                "Please use the following verification code (OTP) to proceed with the password reset process:\n\n" +
                "Verification Code: " + OTP + "\n\n" +
                "If you didn't initiate this password reset request, please ignore this email.\n\n" +
                "If you have any questions or require any assistance, please contact our customer support.\n\n" +
                "Thank you for choosing Apex Bank.\n\n" +
                "Best regards,\n" +
                "Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(email, subject, message);
	}
	
	public void passwordChangedEmail(String email) {
		Users user = ur.findByEmail(email);
		String subject = "Password Change Confirmation";
		String message = "Dear " + user.getUsername() + ",\n\n" +
		                 "This is to confirm that the password for your Apex Bank account has been successfully changed.\n\n" +
		                 "If you did not authorize this change, please contact our customer support immediately.\n\n" +
		                 "If you have any questions or require any further assistance, please feel free to reach out to us.\n\n" +
		                 "Thank you for choosing Apex Bank.\n\n" +
		                 "Best regards,\n" +
		                 "Apex Bank\n\n" +
		 				 "Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
		 				 "Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
		 				 "@ApexBank";
		sendEmail(email, subject, message);
	}
	
	public boolean resetPassword(String email, String password, String otp) {
		if(otp.equals(map.get(email))) {
			ur.resetPassword(email, password);
			map.remove(email);
			return true;
		}
		return false;
	}
	
	public static String generateOTP() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) 
            sb.append(random.nextInt(10));
        return sb.toString();
    }
	

	public void answerQueryEmail(String email, String name) {
		String subject = "Regarding Your Query - Apex Bank!";
		String message = "Dear " + name + ",\n\n" +
                "Thank you for reaching out to us. We have received your query and apologize for any inconvenience caused. Our team is actively working on resolving it.\n\n" +
                "We value your patience and will update you soon.\n\n" +
                "Best regards,\n" +
                "Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(email, subject, message);
		
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
