package com.axis.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.entity.Locker;
import com.axis.entity.Users;
import com.axis.service.EmailService;
import com.axis.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/locker/customer/locker")
//@CrossOrigin("http://localhost:3000/")
public class CustomerController {
	
	@Autowired
	private UserDetailsServiceImpl service;
	
	@Autowired
	private EmailService emailService;
	
	@PostMapping("/apply-for-locker")
	public String applyForLocker(HttpServletRequest request,@RequestBody Map<String, Object> requestData) {
		String email = request.getAttribute("email").toString();
		Users user = service.findUser(email);
		
		String lockertype = String.valueOf(requestData.get("lockertype").toString());
		String lockersize = String.valueOf(requestData.get("lockersize").toString());
		String lockerlocation = String.valueOf(requestData.get("lockerlocation").toString());
		
		int accid = service.findAccId(user.getId());
		List<Locker> lLocker = service.getAllMyLockers(accid);
		for(Locker locker : lLocker) {
			if(locker.getLockertype().equals(lockertype) && !locker.getLockerstatus().equals("CLOSED")) 
				return "Sorry you can't perform this action because you already have " + lockertype;
		}
		service.applyForLocker(user, lockertype, lockerlocation, lockersize);
		emailService.applyForLockerEmail(user, lockertype, lockersize, lockerlocation);
		return "You've successfully applied for " + lockertype + " of size " + lockersize;
	}
	
	@GetMapping("/my-lockers")
	public List<Locker> getAllMyLockers(HttpServletRequest request) {
		String email = request.getAttribute("email").toString();
		Users user = service.findUser(email);
		int accid = service.findAccId(user.getId());
		return service.getAllMyLockers(accid);
	}
	
	@PutMapping("/locker-payment")
	public String lockerPayment(HttpServletRequest request,@RequestBody Map<String, Object> requestData) {
		String email = request.getAttribute("email").toString();
		Users user = service.findUser(email);
		
		String lockertype = String.valueOf(requestData.get("lockertype").toString());
		Double lockeramount = Double.valueOf(requestData.get("lockeramount").toString());
				
		int accid = service.findAccId(user.getId());
		List<Locker> lLocker = service.getAllMyLockers(accid);
		for(Locker locker : lLocker) {
			if(locker.getLockertype().equals(lockertype) && locker.getLockerstatus().equals("ACTIVE")) {
				service.lockerPayment(lockertype, lockeramount, user);
				emailService.lockerPaymentEmail(user, lockertype, lockeramount);
				return "You've successfully done payment for " + lockertype;
			}
		}
		return "Sorry you can't perform this action because you don't have any active " + lockertype;
		
	}
	
	@PutMapping("/close-locker-request")
	public String closeLockerRequest(HttpServletRequest request,@RequestBody Map<String, Object> requestData) {
		String email = request.getAttribute("email").toString();
		Users user = service.findUser(email);
		
		String lockertype = String.valueOf(requestData.get("lockertype").toString());
		
		boolean isLockerAvailable=false;
		int accid = service.findAccId(user.getId());
		List<Locker> lLocker = service.getAllMyLockers(accid);
		for(Locker locker : lLocker) {
			if(locker.getLockertype().equals(lockertype)) {
				isLockerAvailable=true;
				if(!locker.getLockerstatus().equals("CLOSED")) {
					service.closeLockerRequest(user, lockertype);
					emailService.closeLockerRequestEmail(user, lockertype);
					return "Your request for closing " + lockertype + " has been sent to employee successfully";
				}
			}
		}
		if(isLockerAvailable==true) 
			return "Sorry you can't perform this operation because your " + lockertype + " is already closed.";
		return "Sorry you can't perform this action because you don't have " + lockertype;
	}
	
}
