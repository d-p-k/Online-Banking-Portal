package com.axis.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.LoginServiceApplication;
import com.axis.entity.Account;
import com.axis.entity.AuthRequest;
import com.axis.entity.Users;
import com.axis.service.EmailService;
import com.axis.service.UserDetailsServiceImpl;
import com.axis.util.JwtUtil;

@RestController
@RequestMapping("/login/customer")
//@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
public class CustomerController {

	Logger logger=LoggerFactory.getLogger(LoginServiceApplication.class);
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserDetailsServiceImpl service;
	
	@Autowired
	private EmailService emailService;
	
	@GetMapping("/home")
	public String home(HttpServletRequest request) {
		String email = request.getAttribute("email").toString();
		Users user=service.viewProfile(email);
		return "Hello "+user.getUsername()+", welcome home. You're logged in now.";
	}
	
	@PostMapping("/authenticate")
	public String authenticate(@RequestBody AuthRequest authRequest) throws Exception{
		logger.info("Request in customer login : {}",authRequest.getEmail());
		
		Users existingUser = service.viewProfile(authRequest.getEmail());
		if(existingUser!=null && service.getRoleByUserId(existingUser.getId()).equals("ROLE_CUSTOMER") && existingUser.getPassword().equals(authRequest.getPassword())) {
			System.out.println("Request by customer................"+authRequest.getEmail());
			Account account = service.findAccountByUserId(existingUser.getId());
			if(account.getStatus().equals("PENDING"))
				return "Sorry you can't perform this operation because your account is not activated yet.";
			try {
				authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
			}catch(Exception ex) {
				throw new Exception("Invalid email/password...............................");
			}
			logger.info("Customer authentication successful. Token generated for customer.");
			return jwtUtil.generateToken(authRequest.getEmail());
		}
		logger.info("Wrong credentials found in customer login : {}",authRequest.getEmail());
		return "Invalid email or password";
	}
	
	@PostMapping("/register")
	public String create(@RequestBody Users user) {
		Users existingUser = service.viewProfile(user.getEmail());
		if(existingUser == null) {
			service.createCustomer(user);
			emailService.accountRegisteredEmail(user);
			return "You are registered successfully";
		}
		return "This email is already registered";
	}
	
	@GetMapping("/profile")
	public Users profile(HttpServletRequest request) {
		String email=request.getAttribute("email").toString();
		Users user=service.viewProfile(email);
		return user;
	}
	
	@GetMapping("/account-details")
	public Account accountDetails(HttpServletRequest request) {
		String email=request.getAttribute("email").toString();
		Users user=service.viewProfile(email);
		Account account=service.findAccountByUserId(user.getId());
		return account;
	}
	
	@PostMapping("/send-otp")
	public String sendOTP(@RequestBody Map<String, Object> requestData) {
		String email=String.valueOf(requestData.get("email").toString());
		emailService.sendOTPEmail(email);
		return "OTP is sent successfully";
	}
	
	@PostMapping("/reset-password")
	public String resetPassword(@RequestBody Map<String, Object> requestData) {
		String email=String.valueOf(requestData.get("email").toString());
		String otp=String.valueOf(requestData.get("otp").toString());
		String password=String.valueOf(requestData.get("password").toString());
		boolean result = emailService.resetPassword(email, password, otp);
		if(result == true) {
			emailService.passwordChangedEmail(email);
			return "Password has been changed successfully";
		}
		return "Please enter correct OTP";
	}
	
	@PostMapping("/change-password")
	public String changePassword(@RequestBody Map<String, Object> requestData) {
		int userid = Integer.valueOf(requestData.get("userid").toString());
		String oldpassword=String.valueOf(requestData.get("oldpassword").toString());
		String newpassword=String.valueOf(requestData.get("newpassword").toString());
		String newpasswordagain=String.valueOf(requestData.get("newpasswordagain").toString());
		
		if(newpassword.equals(newpasswordagain)) {
			if(oldpassword.equals(service.findPasswordByUserId(userid))) {
				service.changePassword(userid,newpassword);
				return "Password is changed successfully";
			}
			return "Old password is not correct";
		}
		return "Please enter both new passwords same";
	}
	
	@PostMapping("/contact-us")
	public String contactUs(@RequestBody Map<String, Object> requestData) {
		String email=String.valueOf(requestData.get("email").toString());
		String name=String.valueOf(requestData.get("name").toString());
		emailService.answerQueryEmail(email,name);
		return "Your message has been sent successfully";
	}
	
}
