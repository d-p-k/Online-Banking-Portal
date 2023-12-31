package com.axis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.axis.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

	@Query("SELECT a.userid FROM Account a WHERE a.accid = :accid")
	public int getUserIdByAccId(int accid);
	
	@Query("SELECT a FROM Account a WHERE a.userid = :userid")
	Account findAccountByUserId(int userid);
	
	@Query("SELECT a.accid FROM Account a WHERE a.userid = :userid")
	int findAccountIdByUserId(int userid);
	
	@Modifying
	@Transactional
    @Query("UPDATE Account a SET a.balance = a.balance + :amount WHERE a.accid = :accid")
    public void updateAmount(double amount,int accid);
	
	@Modifying
	@Transactional
    @Query("UPDATE Account a SET a.balance = a.balance - :loanemi WHERE a.accid = :accid")
    public void loanPayment(double loanemi,int accid);

}
