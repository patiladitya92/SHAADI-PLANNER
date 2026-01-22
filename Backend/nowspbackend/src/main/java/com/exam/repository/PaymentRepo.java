package com.exam.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entities.Payment;

public interface PaymentRepo extends JpaRepository<Payment, Long>{
	List<Payment> findAllByDeletedFalse();
	 boolean existsByBookingId(Long bookingId);
	 Optional<Payment> findByBookingId(Long bookingId);

}
