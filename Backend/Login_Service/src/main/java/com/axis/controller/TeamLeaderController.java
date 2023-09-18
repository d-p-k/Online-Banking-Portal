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
import com.axis.entity.AuthRequest;
import com.axis.entity.Report;
import com.axis.entity.Users;
import com.axis.service.UserDetailsServiceImpl;
import com.axis.util.JwtUtil;

@RestController
@RequestMapping("/login/teamleader")
//@CrossOrigin("http://localhost:3000/")
public class TeamLeaderController {

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
		logger.info("Request in teamleader login : {}",authRequest.getEmail());
		
		Users existingUser = service.viewProfile(authRequest.getEmail());
		if(existingUser!=null && service.getRoleByUserId(existingUser.getId()).equals("ROLE_TEAMLEADER") && existingUser.getPassword().equals(authRequest.getPassword())) {
			System.out.println("Request by teamleader................"+authRequest.getEmail());
			try {
				authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
			}catch(Exception ex) {
				throw new Exception("Invalid email/password...............................");
			}
			logger.info("Teamleader authentication successful. Token generated for teamleader.");
			return jwtUtil.generateToken(authRequest.getEmail());
		}
		logger.info("Wrong credentials found in team leader login : {}",authRequest.getEmail());
		return "Invalid email or password";
	}
	
	@GetMapping("/profile")
	public Users profile(HttpServletRequest request) {
		String email=request.getAttribute("email").toString();
		Users user=service.viewProfile(email);
		return user;
	}
	
	@GetMapping("/all-reports-submitted-to-me")
	public List<Report> viewAllReportsSubmittedToMe(HttpServletRequest request) {
		String email = request.getAttribute("email").toString();
		return service.listAllReportsSubmittedToMe(email);
	}
	
	@GetMapping("/pending-reports-submitted-to-me")
	public List<Report> viewPendingReportsSubmittedToMe(HttpServletRequest request) {
		String email = request.getAttribute("email").toString();
		return service.listPendingReportsSubmittedToMe(email);
	}
	
	@GetMapping("/approved-reports-submitted-to-me")
	public List<Report> viewApprovedReportsSubmittedToMe(HttpServletRequest request) {
		String email = request.getAttribute("email").toString();
		return service.listApprovedReportsSubmittedToMe(email);
	}
	
	@GetMapping("/rejected-reports-submitted-to-me")
	public List<Report> viewRejectedReportsSubmittedToMe(HttpServletRequest request) {
		String email = request.getAttribute("email").toString();
		return service.listRejectedReportsSubmittedToMe(email);
	}
	
	@PutMapping("/approve-report")
	public String approveReport(@RequestBody Map<String, Object> requestData) {
		int reportid = Integer.valueOf(requestData.get("reportid").toString());
		service.approveReport(reportid);
		return "Report is approved successfully";            
	}
	
	@PutMapping("/reject-report")
	public String rejectReport(@RequestBody Map<String, Object> requestData) {
		int reportid = Integer.valueOf(requestData.get("reportid").toString());
		String remark = String.valueOf(requestData.get("remark").toString());
		service.rejectReport(reportid,remark);
		return "Report is rejected successfully";            
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
