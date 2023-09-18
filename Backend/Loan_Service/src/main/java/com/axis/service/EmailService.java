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

import com.axis.entity.Loan;
import com.axis.entity.Users;
import com.axis.repository.AccountRepository;
import com.axis.repository.LoanRepository;
import com.axis.repository.UserRepository;

@Service
public class EmailService {

	@Autowired
	private UserRepository ur;
	
	@Autowired
	private LoanRepository lr;
	
	@Autowired
	private AccountRepository ar;

	public void applyLoanEmail(Users user, String loanType, double loanAmount, int duration) {
		String subject = "Loan Application Request By You - Apex Bank";
		String message = "Dear " + user.getUsername() + ",\n\n" +
				"We have received your loan application for a " + loanType + ". We are currently reviewing your request and will provide an update soon.\n\n" +
                "Loan Details:\n" +
                "- Loan Type: " + loanType + "\n" +
                "- Loan Amount: ₹" + loanAmount + "\n" +
                "- Duration: " + duration + " months\n\n" +
                "- Date and Time: " + getCurrentDate() + "\n\n" +
                "The approved loan amount will be transferred to your Apex Bank account shortly. You will receive a notification once the transfer is completed.\n\n" +
                "If you have any questions or require further assistance, please contact our loan department.\n\n" +
                "Thank you for choosing Apex Bank.\n\n" +
                "Best regards,\n" +
				"Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}
	
	public void loanPaymentEmail(Users user, String loanType, double loanEMI) {		
		String subject = "Loan EMI Payment Confirmation - Apex Bank";
		String message = "Dear " + user.getUsername() + ",\n\n" +
                "This is to confirm that your EMI payment for your " + loanType + " has been successfully processed.\n\n" +
                "Payment Details:\n" +
                "- Loan Type: " + loanType + "\n" +
                "- EMI Amount: " + loanEMI + "\n" +
                "- Date and Time: " + getCurrentDate() + "\n\n" +
                "Thank you for your prompt payment. It contributes to maintaining a healthy financial standing.\n\n" +
                "If you have any questions or require further assistance, please feel free to contact our loan department.\n\n" +
                "Best regards,\n" +
				"Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}
	
	public void activateLoanEmail(Loan loan) {
		int accid = lr.getAccIdByLoanId(loan.getLoanid());
		int userid = ar.getUserIdByAccId(accid);
		Users user = ur.findByUserId(userid);
		
		String subject = "Loan Approval - Apex Bank";
		String message = "Dear " + user.getUsername() + ",\n\n" +
                "Congratulations! We are pleased to inform you that your loan application for a " + loan.getLoantype() + " has been approved.\n\n" +
                "Our team has reviewed your application, and we are confident in your eligibility for the loan.\n\n" +
                "Please note that the approved loan amount will be credited to your account within the next business day.\n\n" +
                "If you have any questions or require further assistance, please feel free to contact our loan department.\n\n" +
                "Best regards,\n" +
				"Apex Bank\n\n" +
				"Please use our toll free number 1800-233-4526 and 1800-102-2636 for any banking related query.\n" +
				"Connect with us Facebook, Twitter, Instagram, Linkedin.\n" + 
				"@ApexBank";
		sendEmail(user.getEmail(), subject, message);
	}
	
	public void closeLoan(Loan loan) {
		int accid = lr.getAccIdByLoanId(loan.getLoanid());
		int userid = ar.getUserIdByAccId(accid);
		Users user = ur.findByUserId(userid);
		
		String subject = "Loan Closure - Apex Bank";
		String message = "Dear " + user.getUsername() + ",\n\n" +
                "Congratulations! We are delighted to inform you that your " + loan.getLoantype() + " has been successfully closed.\n\n" +
                "You have completed all the loan EMIs, and the outstanding balance has been fully settled.\n\n" +
                "We would like to extend our appreciation for your commitment to timely repayments throughout the loan tenure.\n\n" +
                "If you require any further assistance or have any queries, please do not hesitate to contact our loan department.\n\n" +
                "Thank you for choosing Apex Bank. We look forward to serving you in the future.\n\n" +
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
