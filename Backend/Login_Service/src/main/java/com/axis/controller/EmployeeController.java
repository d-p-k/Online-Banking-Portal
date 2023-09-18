package com.axis.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
@RequestMapping("/login/employee")
//@CrossOrigin("http://localhost:3000/")
public class EmployeeController {

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
		logger.info("Request in employee login : {}",authRequest.getEmail());
		
		Users existingUser = service.viewProfile(authRequest.getEmail());
		if(existingUser!=null && service.getRoleByUserId(existingUser.getId()).equals("ROLE_EMPLOYEE") && existingUser.getPassword().equals(authRequest.getPassword())) {
			System.out.println("Request by employee................"+authRequest.getEmail());
			try {
				authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
			}catch(Exception ex) {
				throw new Exception("Invalid email/password...............................");
			}
			logger.info("Employee authentication successful. Token generated for employee.");
			return jwtUtil.generateToken(authRequest.getEmail());
		}
		logger.info("Wrong credentials found in employee login : {}",authRequest.getEmail());
		return "Invalid email or password";
	}
	
	@GetMapping("/profile")
	public Users profile(HttpServletRequest request) {
		String email=request.getAttribute("email").toString();
		Users user=service.viewProfile(email);
		return user;
	}
	
	@GetMapping("/pending-accounts")
	public List<Account> viewAllPendingAccounts() {
		return service.viewAllPendingAccounts();
	}
	
	@GetMapping("/active-accounts")
	public List<Account> viewAllActiveAccounts() {
		return service.viewAllActiveAccounts();
	}
	
	@PutMapping("/activate-account")
	public String activateAccount(@RequestBody Map<String, Object> requestData) {
		int accountid=Integer.valueOf(requestData.get("accid").toString());
		service.activateAccount(accountid);
		emailService.activateAccountEmail(accountid);
		return "Account is activated successfully";
	}
	
	@GetMapping("/all-accounts")
	public List<Account> viewAllAccounts() {
		return service.listAllAccounts();
	}
	
	@GetMapping("/all-customers")
	public List<Users> viewAllCustomers() {
		return service.listAllCustomers();
	}
	
//	@DeleteMapping("/delete-customer")
	@PutMapping("/delete-customer")
	public String deleteCustomer(@RequestBody Map<String, Object> requestData) {
		int userid=Integer.valueOf(requestData.get("userid").toString());
		emailService.deleteUserAndAccount(userid);
		service.deleteUserAndAccount(userid);
		return "Customer is deleted successfully";
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
}
