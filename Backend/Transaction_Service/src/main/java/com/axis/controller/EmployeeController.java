package com.axis.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.entity.Transaction;
import com.axis.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/transaction/employee/transaction")
//@CrossOrigin("http://localhost:3000/")
public class EmployeeController {

	@Autowired
	private UserDetailsServiceImpl service;
	
	@GetMapping("/show-all-transactions")
	public List<Transaction> showAllTransactions() {
		return service.fetchAllTransactions();
	}

}
