package com.axis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.axis.entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users,String>{
	
	@Query("SELECT u FROM Users u where u.email = :email")
	public Users findByEmail(String email);
	
	@Query("SELECT u FROM Users u WHERE u.id = :id")
	public Users findByUserId(int id);

}
