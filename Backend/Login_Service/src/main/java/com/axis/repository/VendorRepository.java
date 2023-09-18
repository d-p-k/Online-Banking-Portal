package com.axis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.axis.entity.Vendor;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, String> {

	@Query("SELECT v FROM Vendor v where v.userid = :userid")
	public Vendor findByUserId(int userid);
	
	@Transactional
    @Modifying
    @Query("DELETE FROM Vendor v WHERE v.userid = :userid")
	public void deleteVendorByUserId(int userid);
	
	@Modifying
	@Transactional
    @Query("UPDATE Vendor v SET v.process = :process, v.joblocation = :joblocation WHERE v.userid = :userid")
    public void editVendor(int userid, String process, String joblocation);
}
