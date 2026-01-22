package com.exam.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entities.ServiceCategory;
import com.exam.entities.User;

public interface UserRepo extends JpaRepository<User, Long>{
	Optional<User> findByEmail(String email);

	boolean existsByEmail(String email);

	Optional<User> findByEmailIgnoreCase(String email);

	Optional<User> findByResetToken(String token);
}	
