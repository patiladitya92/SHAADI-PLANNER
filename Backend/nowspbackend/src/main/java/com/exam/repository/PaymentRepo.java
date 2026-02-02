package com.exam.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.exam.entities.Booking;
import com.exam.entities.Payment;

public interface PaymentRepo extends JpaRepository<Payment, Long>{
	List<Payment> findAllByDeletedFalse();
	Optional<Payment> findByBookingId(Long bookingId);
	boolean existsByBookingId(Long bookingId);
	Optional<Payment> findByBookingIdAndDeletedFalse(Long bookingId);
	@Query("SELECT p FROM Payment p WHERE p.booking.id = :bookingId AND p.booking.cust.user.email = :email AND p.deleted = false")
	Optional<Payment> findByBookingIdAndCustEmail(@Param("bookingId") Long bookingId, @Param("email") String email);
	@Query("SELECT p FROM Payment p WHERE p.booking.id = :bookingId AND p.booking.vendor.user.email = :email AND p.deleted = false")
	Optional<Payment> findByBookingIdAndVendorEmail(@Param("bookingId") Long bookingId, @Param("email") String email);
	Optional<Payment> findByTxnid(String orderId);
}
