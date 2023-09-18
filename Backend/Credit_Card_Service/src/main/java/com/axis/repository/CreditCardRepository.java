package com.axis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.axis.entity.CreditCard;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Integer> {
	
	@Query("SELECT c FROM CreditCard c WHERE c.creditcardid = :creditcardid")
	public CreditCard findCreditCardByCreditCardId(int creditcardid);
	
	@Query("SELECT c.account.accid from CreditCard c WHERE c.creditcardid = :creditcardid")
	public int getAccIdByCreditCardId(int creditcardid);

	@Modifying
	@Transactional
    @Query("UPDATE CreditCard c SET c.status = 'REQUESTED FOR CLOSING' WHERE c.account.accid = :accid AND c.creditcardname = :creditcardname")
    public void closeCreditCardRequest(int accid,String creditcardname);
	
	@Query("SELECT c FROM CreditCard c WHERE c.account.accid = :accid")
	public List<CreditCard> getAllMyCreditCards(int accid);
	
	@Modifying
	@Transactional
    @Query("UPDATE CreditCard c SET c.status = 'ACTIVE' WHERE c.creditcardid = :creditcardid")
    public void activateCreditCard(int creditcardid);
	
	@Modifying
	@Transactional
    @Query("UPDATE CreditCard c SET c.status = 'CLOSED' WHERE c.creditcardid = :creditcardid")
    public void foreCloseCreditCard(int creditcardid);
	
	@Query("SELECT c FROM CreditCard c WHERE c.status = 'PENDING'")
	public List<CreditCard> pendingCreditCards();
	
	@Query("SELECT c FROM CreditCard c WHERE c.status = 'ACTIVE'")
	public List<CreditCard> activeCreditCards();
	
	@Query("SELECT c FROM CreditCard c WHERE c.status = 'CLOSED'")
	public List<CreditCard> closedCreditCards();
	
	@Query("SELECT c FROM CreditCard c WHERE c.status = 'REQUESTED FOR CLOSING'")
	public List<CreditCard> closingCreditCardRequests();
	
}
