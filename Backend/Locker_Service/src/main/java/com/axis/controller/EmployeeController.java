package com.axis.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.entity.Locker;
import com.axis.service.EmailService;
import com.axis.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/locker/employee/locker")
//@CrossOrigin("http://localhost:3000/")
public class EmployeeController {
	
	@Autowired
	private UserDetailsServiceImpl service;
	
	@Autowired
	private EmailService emailService;
	
	@GetMapping("/pending-lockers")
	public List<Locker> pendingLockerRequests() {
		return service.pendingLockers();
	}
	
	@GetMapping("/active-lockers")
	public List<Locker> activeLockers() {
		return service.activeLockers();
	}
	
	@GetMapping("/closed-lockers")
	public List<Locker> closedLockers() {
		return service.closedLockers();
	}
	
	@GetMapping("/closing-locker-requests")
	public List<Locker> closingLockerRequests() {
		return service.closingLockerRequests();
	}
	
	@PutMapping("/activate-locker")
	public String activateLocker(@RequestBody Map<String, Object> requestData) {
		int lockerid = Integer.valueOf(requestData.get("lockerid").toString());
		Locker locker = service.findLockerByLockerId(lockerid);
		
		service.activateLocker(lockerid);
		emailService.activateLockerEmail(locker);
		
		return "Locker is successfully activated now";
	}
	
	@GetMapping("/all-lockers")
	public List<Locker> getAllLockers() {
		return service.getAllLockers();
	}
	
	@PutMapping("/close-locker")
	public String foreCloseLocker(@RequestBody Map<String, Object> requestData) {
		int lockerid = Integer.valueOf(requestData.get("lockerid").toString());
		Locker locker = service.findLockerByLockerId(lockerid);
		
		emailService.foreCloseLockerEmail(locker);
		service.foreCloseLocker(lockerid);
		
		return "Locker is successfully closed now";
	}
	
}
