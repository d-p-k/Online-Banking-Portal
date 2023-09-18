package com.axis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.axis.entity.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

	@Query("SELECT r FROM Report r WHERE r.userid = :userid")
	public List<Report> findAllMyReportsByUserId(int userid);
	
	@Query("SELECT r FROM Report r WHERE r.assignee = :email")
	public List<Report> findAllReportsSubmittedToMe(String email);
	
	@Query("SELECT r FROM Report r WHERE r.assignee = :email AND r.status = 'PENDING'")
	public List<Report> findPendingReportsSubmittedToMe(String email);
	
	@Query("SELECT r FROM Report r WHERE r.assignee = :email AND r.status = 'APPROVED'")
	public List<Report> findApprovedReportsSubmittedToMe(String email);
	
	@Query("SELECT r FROM Report r WHERE r.assignee = :email AND r.status = 'REJECTED'")
	public List<Report> findRejectedReportsSubmittedToMe(String email);
	
	@Modifying
	@Transactional
    @Query("UPDATE Report r SET r.status = 'APPROVED', r.remark = 'No remark' WHERE r.reportid = :reportid")
    public void approveReport(int reportid);
	
	@Modifying
	@Transactional
    @Query("UPDATE Report r SET r.status = 'REJECTED', r.remark = :remark WHERE r.reportid = :reportid")
    public void rejectReport(int reportid, String remark);
	
	@Query("SELECT r FROM Report r WHERE r.status = 'APPROVED'")
	public List<Report> findAllApprovedReports();
	
	@Modifying
	@Transactional
    @Query("UPDATE Report r SET r.assignee = :newEmail WHERE r.assignee = :oldEmail")
    public void editReport(String oldEmail, String newEmail);
	
	@Modifying
	@Transactional
    @Query("UPDATE Report r SET r.username = :username WHERE r.userid = :userid")
    public void editVendorNameInReport(int userid, String username);
}
