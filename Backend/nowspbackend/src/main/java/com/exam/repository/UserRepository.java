package com.exam.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{
	List<User> findAllByDeletedFalse();
    Optional<User> findByIdAndDeletedFalse(Long id);
    Optional<User> findByEmailAndDeletedFalse(String email);

}
