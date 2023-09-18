package com.axis.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.axis.entity.Account;
import com.axis.entity.Report;
import com.axis.entity.Roles;
import com.axis.entity.Users;
import com.axis.entity.Vendor;
import com.axis.repository.AccountRepository;
import com.axis.repository.ReportRepository;
import com.axis.repository.RoleRepository;
import com.axis.repository.UserRepository;
import com.axis.repository.VendorRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	private UserRepository ur;
	
	@Autowired
	private RoleRepository rr;
	
	@Autowired
	private AccountRepository ar;
	
	@Autowired
	private VendorRepository vr;
	
	@Autowired
	private ReportRepository reportRepository;
 
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("Validating user...................."+email);
		Users result = ur.findByEmail(email);
		System.out.println("User validation successful........."+result.getEmail());
		return new UserDetailsImpl(result);
	}
	
	public Users createCustomer(Users user) {
		Users u=ur.save(user);
		rr.save(new Roles("ROLE_CUSTOMER",u.getId()));
		ar.save(new Account(u.getId(),generateAccountNumber(),"SAVINGS A/C","APEX0015014",10000.0,"PENDING"));
		return u;
	}
	
	public Users createEmployee(Users user) {
		Users u=ur.save(user);
		rr.save(new Roles("ROLE_EMPLOYEE",u.getId()));
		return u;
	}
	
	public void deleteEmployee(int userid) {
		ur.deleteUserByUserId(userid);
		rr.deleteRoleByUserId(userid);
	}
	
	public Users viewProfile(String email) {
		return ur.findByEmail(email);
	}
	
	public String findEmailByUserId(int id) {
		return ur.findEmailByUserId(id);
	}
	
	public String findPasswordByUserId(int id) {
		return ur.findPasswordByUserId(id);
	}
	
	public List<Account> viewAllPendingAccounts() {
		return ar.findByStatusPending();
	}
	
	public List<Account> viewAllActiveAccounts() {
		return ar.findByStatusActive();
	}
	
	public void activateAccount(int accountid) {
		ar.updateStatus(accountid);
	}
	
	public List<Users> listAllEmployees() {
		return ur.findAllEmployees();
	}

	public List<Account> listAllAccounts() {
		return ar.findAll();
	}
	
	public List<Users>  listAllCustomers() {
		return ur.findAllCustomers();
	}
	
	public void deleteUserAndAccount(int userid) {
		ur.deleteUserByUserId(userid);
		rr.deleteRoleByUserId(userid);
		ar.deleteAccountByUserId(userid);
	}
	
	public Account findAccountByUserId(int userid) {
		return ar.findAccountByUserId(userid);
	}
	
	public String getRoleByUserId(int userid) {
		return rr.getRoleByUserId(userid);
	}
	
	public void editUser(int userid, String username, String email, String phone, String address) {
		ur.editUser(userid,username,email,phone,address);
	}
	
	public void editTeamLeader(int userid, String username, String oldEmail, String newEmail, String phone, String address) {
		ur.editUser(userid,username,newEmail,phone,address);
		reportRepository.editReport(oldEmail,newEmail);
	}
	
	public void editVendor(int userid, String username, String email, String phone, String address, String process, String joblocation) {
		ur.editUser(userid,username,email,phone,address);
		vr.editVendor(userid,process,joblocation);
		reportRepository.editVendorNameInReport(userid, username);
	}
	
	public void changePassword(int userid, String newpassword) {
		ur.changePassword(userid, newpassword);
	}
	
	public static String generateAccountNumber() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 15; i++) 
            sb.append(random.nextInt(10));
        return sb.toString();
    }
	
//	======================== FOR VPM ========================
	
	public Vendor findVendorByUserId(int userid) {
		return vr.findByUserId(userid);
	}
	
	public Users createVendor(Users user, String process, String joblocation) {
		Users u=ur.save(user);
		rr.save(new Roles("ROLE_VENDOR",u.getId()));
		vr.save(new Vendor(generateTpId(), user.getId(), process, joblocation));
		return u;
	}
	
	public Users createTeamLeader(Users user) {
		Users u=ur.save(user);
		rr.save(new Roles("ROLE_TEAMLEADER",u.getId()));
		return u;
	}
	
	public void deleteVendor(int userid) {
		ur.deleteUserByUserId(userid);
		vr.deleteVendorByUserId(userid);
		rr.deleteRoleByUserId(userid);
	}
	
	public void deleteTeamLeader(int userid) {
		ur.deleteUserByUserId(userid);
		rr.deleteRoleByUserId(userid);
	}
	
	public static String generateTpId() {
	    Random random = new Random();
        long randomNumber = random.nextLong(90000000) + 10000000;
        return "tp" + randomNumber;
    }

	public List<Map<String, Object>> listAllVendors() {
		List<Map<String, Object>> listOfVendors = new ArrayList<>();
		List<Users> listOfUsers = ur.findAllVendors();
		for(Users user : listOfUsers) {
			Vendor vendor = vr.findByUserId(user.getId());
			Map<String, Object> profileMap = new HashMap<>();
			profileMap.put("userid", user.getId());
			profileMap.put("username", user.getUsername());
		    profileMap.put("password", user.getPassword());
		    profileMap.put("email", user.getEmail());
		    profileMap.put("phone", user.getPhone());
		    profileMap.put("address", user.getAddress());
		    profileMap.put("tpid", vendor.getTpid());
		    profileMap.put("process", vendor.getProcess());
		    profileMap.put("joblocation", vendor.getJoblocation());
		    listOfVendors.add(profileMap);
		}
		return listOfVendors;
	}
	
	public List<Users> listAllTeamLeaders() {
		return ur.findAllTeamLeaders();
	}
	
	public void markProductivity(Users user, Vendor vendor, String taskdescription, String date, int hours, int minutes, String assignee) {
		LocalTime localTime = LocalTime.of(hours, minutes);
        Duration duration = Duration.between(LocalTime.MIN, localTime);
        String formattedDuration = String.format("%02d:%02d:%02d", duration.toHours(), duration.toMinutesPart(), duration.toSecondsPart());
     
		Report report = new Report(vendor.getTpid(), user.getId(), user.getUsername(), LocalDate.parse(date), taskdescription, assignee, formattedDuration, "PENDING", "PENDING");
		reportRepository.save(report);
	}
	
	public List<Report> listAllMyReports(int userid) {
		return reportRepository.findAllMyReportsByUserId(userid);
	}
	
	public List<Report> listAllReportsSubmittedToMe(String email) {
		return reportRepository.findAllReportsSubmittedToMe(email);
	}
	
	public List<Report> listPendingReportsSubmittedToMe(String email) {
		return reportRepository.findPendingReportsSubmittedToMe(email);
	}
	
	public List<Report> listApprovedReportsSubmittedToMe(String email) {
		return reportRepository.findApprovedReportsSubmittedToMe(email);
	}
	
	public List<Report> listRejectedReportsSubmittedToMe(String email) {
		return reportRepository.findRejectedReportsSubmittedToMe(email);
	}
	
	public void approveReport(int reportid) {
		reportRepository.approveReport(reportid);
	}
	
	public void rejectReport(int reportid, String remark) {
		reportRepository.rejectReport(reportid, remark);
	}
	
	public List<Report> allApprovedReports() {
		return reportRepository.findAllApprovedReports();
	}

}
