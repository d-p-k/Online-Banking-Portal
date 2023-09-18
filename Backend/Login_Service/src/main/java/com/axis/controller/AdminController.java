package com.axis.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.LoginServiceApplication;
import com.axis.entity.AuthRequest;
import com.axis.entity.Report;
import com.axis.entity.Users;
import com.axis.service.EmailService;
import com.axis.service.UserDetailsServiceImpl;
import com.axis.util.JwtUtil;

@RestController
@RequestMapping("/login/admin")
//@CrossOrigin("http://localhost:3000/")
public class AdminController {
	
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
		logger.info("Request in admin login : {}",authRequest.getEmail());
		
		Users existingUser = service.viewProfile(authRequest.getEmail());
		if(existingUser!=null && service.getRoleByUserId(existingUser.getId()).equals("ROLE_ADMIN") && existingUser.getPassword().equals(authRequest.getPassword())) {
			System.out.println("Request by admin................"+authRequest.getEmail());
			
			try {
				authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
			}catch(Exception ex) {
				throw new Exception("Invalid email/password...............................");
			}
			logger.info("Admin authentication successful. Token generated for admin.");
			return jwtUtil.generateToken(authRequest.getEmail());
		}
		
		logger.info("Wrong credentials found in admin login : {}",authRequest.getEmail());
		return "Invalid email or password";
	}
	
	@PostMapping("/register-employee")
	public String createEmployee(@RequestBody Users user) {
		Users existingUser = service.viewProfile(user.getEmail());
		if(existingUser == null) {
			service.createEmployee(user);
			emailService.employeeRegisteredEmail(user);
			return "Employee is added successfully";
		}
		return "This email is already registered";
	}
	
//	@DeleteMapping("/delete-employee")
	@PutMapping("/delete-employee")
	public String deleteEmployee(@RequestBody Map<String, Object> requestData) {
		int userid=Integer.valueOf(requestData.get("userid").toString());
		emailService.deleteEmployeeEmail(userid);
		service.deleteEmployee(userid);
		return "Employee is deleted successfully";
	}
	
	@GetMapping("/profile")
	public Users profile(HttpServletRequest request) {
		String email=request.getAttribute("email").toString();
		return service.viewProfile(email);
	}
	
	@GetMapping("/all-employees")
	public List<Users> allEmployees() {
		return service.listAllEmployees();
	}
	
	@PutMapping("/edit-user")
	public String editUser(@RequestBody Map<String, Object> requestData) {
		int userid=Integer.valueOf(requestData.get("userid").toString());
		String username=String.valueOf(requestData.get("username").toString());
		String email=String.valueOf(requestData.get("email").toString());
		String phone=String.valueOf(requestData.get("phone").toString());
		String address=String.valueOf(requestData.get("address").toString());
		
		Users existingUser = service.viewProfile(email);
		if(existingUser == null || existingUser.getId() == userid) {
			if(service.getRoleByUserId(userid).equals("ROLE_TEAMLEADER")) {
				service.editTeamLeader(userid,username,service.findEmailByUserId(userid),email,phone,address);
			}
			else if(service.getRoleByUserId(userid).equals("ROLE_VENDOR")) {
				String process=String.valueOf(requestData.get("process").toString());
				String joblocation=String.valueOf(requestData.get("joblocation").toString());
				service.editVendor(userid,username,email,phone,address,process,joblocation);
			}
			else {
				service.editUser(userid,username,email,phone,address);
			}
			return "Users's details are changed successfully";
		}
		return "This email is already registered";
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
	
//	======================== FOR VPM ========================
	
	@PostMapping("/register-vendor")
	public String createVendor(@RequestBody Map<String, Object> requestData) {
		String username=String.valueOf(requestData.get("username").toString());
		String password=String.valueOf(requestData.get("password").toString());
		String email=String.valueOf(requestData.get("email").toString());
		String phone=String.valueOf(requestData.get("phone").toString());
		String address=String.valueOf(requestData.get("address").toString());
		String process=String.valueOf(requestData.get("process").toString());
		String joblocation=String.valueOf(requestData.get("joblocation").toString());
		
		Users user = new Users(username, password, Collections.singleton(new SimpleGrantedAuthority("ROLE_VENDOR")), username, password, email, address, phone);
		
		Users existingUser = service.viewProfile(user.getEmail());
		if(existingUser == null) {
			service.createVendor(user,process,joblocation);
//			emailService.employeeRegisteredEmail(user);
			return "Vendor is added successfully";
		}
		return "This email is already registered";
	}
	
	@PostMapping("/register-teamleader")
	public String createTeamLeader(@RequestBody Users user) {
		Users existingUser = service.viewProfile(user.getEmail());
		if(existingUser == null) {
			service.createTeamLeader(user);
//			emailService.employeeRegisteredEmail(user);
			return "Team Leader is added successfully";
		}
		return "This email is already registered";
	}
	
	@PutMapping("/delete-vendor")
	public String deleteVendor(@RequestBody Map<String, Object> requestData) {
		int userid=Integer.valueOf(requestData.get("userid").toString());
//		emailService.deleteEmployeeEmail(userid);
		service.deleteVendor(userid);
		return "Vendor is deleted successfully";
	}
	
	@PutMapping("/delete-teamleader")
	public String deleteTeamLeader(@RequestBody Map<String, Object> requestData) {
		int userid=Integer.valueOf(requestData.get("userid").toString());
//		emailService.deleteEmployeeEmail(userid);
		service.deleteTeamLeader(userid);
		return "Team Leader is deleted successfully";
	}
	
	@GetMapping("/all-vendors")
	public List<Map<String, Object>> allVendors() {
		return service.listAllVendors();
	}
	
	@GetMapping("/all-teamleaders")
	public List<Users> allTeamLeader() {
		return service.listAllTeamLeaders();
	}
	
	@GetMapping("/all-approved-reports")
	public List<Report> allApprovedReports() {
		return service.allApprovedReports();
	}
}
