package com.axis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.axis.entity.Loan;

public interface LoanRepository extends JpaRepository<Loan, Integer> {

	@Query("SELECT l FROM Loan l WHERE l.account.accid = :accid")
	public List<Loan> getAllMyLoansByAccountId(int accid);
	
	@Query("SELECT l.account.accid from Loan l WHERE l.loanid = :loanid")
	public int getAccIdByLoanId(int loanid);
	
	@Modifying
	@Transactional
    @Query("UPDATE Loan l SET l.status = 'ACTIVE' WHERE l.loanid = :loanid")
    public void updateLoanStatus(int loanid);
	
	@Query("SELECT l FROM Loan l WHERE l.status = 'PENDING'")
	public List<Loan> findByStatusPending();
	
	@Query("SELECT l FROM Loan l WHERE l.status = 'ACTIVE'")
	public List<Loan> findByStatusActive();
	
	@Query("SELECT l FROM Loan l WHERE l.status = 'COMPLETED'")
	public List<Loan> findByStatusCompleted();
	
	@Modifying
	@Transactional
    @Query("UPDATE Loan l SET l.status = 'COMPLETED' WHERE l.loanid = :loanid")
    public void foreCloseLoan(int loanid);
	
	@Query("SELECT l FROM Loan l WHERE l.loanid = :loanid")
	public Loan findById(int loanid);
	
}
