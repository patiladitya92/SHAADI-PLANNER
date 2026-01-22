package com.exam.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entities.Customer;


public interface CustomerRepo extends JpaRepository<Customer, Long> {

	Optional<Customer> findByUserId(Long userId);

}
