package com.axis.service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.axis.entity.Account;
import com.axis.entity.Loan;
import com.axis.entity.Transaction;
import com.axis.entity.Users;
import com.axis.repository.AccountRepository;
import com.axis.repository.CustomerTransactionRepository;
import com.axis.repository.LoanRepository;
import com.axis.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	private UserRepository ur;
	
	@Autowired
	private AccountRepository ar;
	
	@Autowired
	private LoanRepository lr;
	
	@Autowired
	private CustomerTransactionRepository ctr;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("Validating user...................."+email);
		Users result = ur.findByEmail(email);
		System.out.println("User validation successful........."+result.getEmail());
		return new UserDetailsImpl(result);
	}
	
	public List<Loan> fetchAllMyLoans(int accid) {
		return lr.getAllMyLoansByAccountId(accid);
	}
	
	public void applyLoan(String loantype,double loanamount,int duration,int userid) {
		LocalDate startdate = LocalDate.now();
		LocalDate enddate = startdate.plusMonths(duration);
		Loan loan = new Loan(loantype,loanamount,calculateEMI(loanamount, duration),startdate,enddate,duration,"PENDING",ar.findAccountByUserId(userid));
		lr.save(loan);
	}
	
	public List<Loan> fetchAllLoans() {
		return lr.findAll();
	}
	
	public void activeLoanStatus(int loanid) {
		lr.updateLoanStatus(loanid);
	}
	
	public List<Loan> fetchAllPendingLoans() {
		return lr.findByStatusPending();
	}
	
	public List<Loan> fetchAllActiveLoans() {
		return lr.findByStatusActive();
	}
	
	public List<Loan> fetchAllCompletedLoans() {
		return lr.findByStatusCompleted();
	}
	
	public void closeLoan(int loanid) {
		lr.foreCloseLoan(loanid);
	}
	
	public Loan findLoanByLoanId(int loanid) {
		return lr.findById(loanid);
	}
	
	public void updateAmountByAccId(double amount,int accid) {
		ar.updateAmount(amount, accid);
	}
	
	public void loanDeposit(double amount,String loantype,Account account) {
		Transaction t=new Transaction(generateTransactionId(), LocalDateTime.now(), amount, loantype + " Deposit", "CREDIT", account);
		ctr.save(t);
	}
	
	public void loanPayment(String loantype,double loanemi,int accid,int userid) {
		ar.loanPayment(loanemi,accid);
		Transaction t=new Transaction(generateTransactionId(), LocalDateTime.now(), loanemi, loantype + " EMI Withdrawal", "DEBIT", ar.findAccountByUserId(userid));
		ctr.save(t);
	}
	
	public static double calculateEMI(double loanAmount, int loanDurationInMonths) {
        double interestRate = 13;
        double monthlyInterestRate = (interestRate / 100) / 12;
        double emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanDurationInMonths)) / (Math.pow(1 + monthlyInterestRate, loanDurationInMonths) - 1);
        return Math.round(emi * 100.0) / 100.0;
    }
	
	public static String generateTransactionId() {
		String ALPHANUMERIC_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	    int ID_LENGTH = 15;
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(ID_LENGTH);
        for (int i = 0; i < ID_LENGTH; i++) {
            int randomIndex = random.nextInt(ALPHANUMERIC_CHARS.length());
            char randomChar = ALPHANUMERIC_CHARS.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString();
    }

	public Users findUser(String email) {
		return ur.findByEmail(email);
	}
	
	public int findAccId(int userid) {
		return ar.findAccountIdByUserId(userid);
	}

}
