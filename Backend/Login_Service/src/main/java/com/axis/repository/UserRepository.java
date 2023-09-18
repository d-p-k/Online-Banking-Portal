package com.axis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.axis.entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users,String>{

	public Users findByUsername(String username);
	
	@Query("SELECT u FROM Users u where u.email = :email")
	public Users findByEmail(String email);
	
	@Query("SELECT u FROM Users u where u.id = :id")
	public Users findByUserId(int id);
	
	@Query("SELECT u.email FROM Users u where u.id = :id")
	public String findEmailByUserId(int id);
	
	@Query("SELECT u.password FROM Users u where u.id = :id")
	public String findPasswordByUserId(int id);
	
	@Query("SELECT u FROM Users u JOIN Roles r ON u.id = r.userid WHERE r.name = 'ROLE_EMPLOYEE'")
	public List<Users> findAllEmployees();
	
	@Query("SELECT u FROM Users u JOIN Roles r ON u.id = r.userid WHERE r.name = 'ROLE_CUSTOMER'")
	public List<Users> findAllCustomers();
	
	@Query("SELECT u FROM Users u JOIN Roles r ON u.id = r.userid WHERE r.name = 'ROLE_TEAMLEADER'")
	public List<Users> findAllTeamLeaders();
	
	@Query("SELECT u FROM Users u JOIN Roles r ON u.id = r.userid WHERE r.name = 'ROLE_VENDOR'")
	public List<Users> findAllVendors();
	
	@Transactional
    @Modifying
    @Query("DELETE FROM Users u WHERE u.id = :userid")
	public void deleteUserByUserId(int userid);
	
	@Modifying
	@Transactional
    @Query("UPDATE Users u SET u.password = :password WHERE u.email = :email")
    public void resetPassword(String email, String password);

	@Modifying
	@Transactional
    @Query("UPDATE Users u SET u.username = :username, u.email = :email, u.phone = :phone, u.address = :address WHERE u.id = :userid")
	public void editUser(int userid, String username, String email, String phone, String address);
	
	@Modifying
	@Transactional
    @Query("UPDATE Users u SET u.password = :newpassword WHERE u.id = :userid")
	public void changePassword(int userid, String newpassword);
	
}
