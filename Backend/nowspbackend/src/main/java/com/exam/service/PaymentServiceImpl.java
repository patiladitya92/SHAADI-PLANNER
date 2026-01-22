package com.exam.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.exam.dto.PaymentCreateDto;
import com.exam.entities.Booking;
import com.exam.entities.BookingStatus;
import com.exam.entities.Payment;
import com.exam.entities.PaymentStatus;
import com.exam.repository.BookingsRepo;
import com.exam.repository.PaymentRepo;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService{
	private final PaymentRepo paymentRepo;
	private final BookingsRepo bookingsRepo;
	@Override
	public String createPayment(String email, Long bookingId, @Valid PaymentCreateDto dto) {
	    // 1. Find booking and validate ownership
	    Booking booking = bookingsRepo.findByIdAndCustUserEmailAndDeletedFalse(bookingId, email).orElseThrow();        
	    
	    // 2. Check if payment already exists
	    if (paymentRepo.existsByBookingId(bookingId)) {
	        return "booking id already exists";
	    }
	    
	    // 3. Validate booking status
	    if (!booking.getStatus().equals(BookingStatus.PENDING)) {
	        throw new IllegalStateException("Booking must be PENDING to create payment");
	    }
	    
	    // 4. Create payment
	    Payment payment = new Payment();
	    payment.setBooking(booking);
	    payment.setAmt(dto.getAmt());
	    payment.setStatus(PaymentStatus.PENDING);
	    payment.setMode(dto.getMode());
	    payment.setPaydate(LocalDateTime.now());
	    payment.setDeleted(false);
	    
	    paymentRepo.save(payment);
	    return "payment created";
	}

}
