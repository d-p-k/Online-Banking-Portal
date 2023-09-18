package com.axis.controller;

import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.LoginServiceApplication;
import com.axis.entity.AuthRequest;
import com.axis.entity.Report;
import com.axis.entity.Users;
import com.axis.entity.Vendor;
import com.axis.service.UserDetailsServiceImpl;
import com.axis.util.JwtUtil;

@RestController
@RequestMapping("/login/vendor")
//@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
public class VendorController {

	Logger logger=LoggerFactory.getLogger(LoginServiceApplication.class);
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserDetailsServiceImpl service;
	
//	@Autowired
//	private EmailService emailService;
	
	@GetMapping("/home")
	public String home(HttpServletRequest request) {
		String email = request.getAttribute("email").toString();
		Users user=service.viewProfile(email);
		return "Hello "+user.getUsername()+", welcome home. You're logged in now.";
	}
	
	@PostMapping("/authenticate")
	public String authenticate(@RequestBody AuthRequest authRequest) throws Exception{
		logger.info("Request in vendor login: {}",authRequest.getEmail());
		
		Users existingUser = service.viewProfile(authRequest.getEmail());
		if(existingUser!=null && service.getRoleByUserId(existingUser.getId()).equals("ROLE_VENDOR") && existingUser.getPassword().equals(authRequest.getPassword())) {
			System.out.println("Request by vendor................"+authRequest.getEmail());
			try {
				authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
			}catch(Exception ex) {
				throw new Exception("Invalid email/password...............................");
			}
			logger.info("Vendor authentication successful. Token generated for Vendor.");
			return jwtUtil.generateToken(authRequest.getEmail());
		}
		logger.info("Wrong credentials found in vendor login : {}",authRequest.getEmail());
		return "Invalid email or password";
	}
	
	@GetMapping("/profile")
	public Map<String, Object> profile(HttpServletRequest request) {
		String email=request.getAttribute("email").toString();
		Users user=service.viewProfile(email);
		Vendor vendor = service.findVendorByUserId(user.getId());
		
		Map<String, Object> profileMap = new HashMap<>();
		profileMap.put("id", user.getId());
		profileMap.put("username", user.getUsername());
	    profileMap.put("password", user.getPassword());
	    profileMap.put("email", user.getEmail());
	    profileMap.put("phone", user.getPhone());
	    profileMap.put("address", user.getAddress());
	    profileMap.put("tpid", vendor.getTpid());
	    profileMap.put("process", vendor.getProcess());
	    profileMap.put("joblocation", vendor.getJoblocation());
		
		return profileMap;
	}
	
	@PostMapping("/mark-productivity")
	public String markProductivity(HttpServletRequest request,@RequestBody Map<String, Object> requestData) {
		String email=request.getAttribute("email").toString();
		Users user=service.viewProfile(email);
		Vendor vendor = service.findVendorByUserId(user.getId());
		
		String taskdescription=String.valueOf(requestData.get("taskdescription").toString());
		String date=String.valueOf(requestData.get("date").toString());
		int hours = Integer.valueOf(requestData.get("hours").toString());
		int minutes = Integer.valueOf(requestData.get("minutes").toString());
		String assignee=String.valueOf(requestData.get("assignee").toString());
		
		service.markProductivity(user,vendor,taskdescription,date,hours,minutes,assignee);
		
		return "Report is submitted successfully";
	}
	
	@GetMapping("/my-reports")
	public List<Report> viewAllMyReports(HttpServletRequest request) {
		String email=request.getAttribute("email").toString();
		Users user=service.viewProfile(email);
		return service.listAllMyReports(user.getId());
	}
	
	@GetMapping("/all-teamleaders")
	public List<Users> allTeamLeader() {
		return service.listAllTeamLeaders();
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
