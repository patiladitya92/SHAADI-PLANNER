package com.exam.service;

import com.exam.dto.PaymentCreateDto;
import com.exam.dto.PaymentRes;
import com.exam.entities.Payment;
import com.exam.entities.PaymentStatus;
import com.exam.entities.PaymentMode;
import com.exam.entities.Booking;
import com.exam.entities.BookingStatus;
import com.exam.exception.ResourceNotFoundException;
import com.exam.exception.ResourceAlreadyExistsException;
import com.exam.repository.PaymentRepo;
import com.exam.repository.BookingsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.razorpay.*;
import org.json.JSONObject;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepo paymentRepo;
    private final BookingsRepo bookingsRepo;

    @Override
    public PaymentRes createPayment(String email, Long bookingId, PaymentCreateDto dto) {
        
        // 1. Find YOUR booking #1 (amit@mail.com owns it)
        Booking booking = bookingsRepo.findById(bookingId)
            .filter(b -> b.getCust().getUser().getEmail().equals(email))
            .filter(b -> !b.isDeleted())
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + bookingId));

        if (!booking.getStatus().equals(BookingStatus.PENDING)) {
            throw new IllegalStateException("Only PENDING bookings can be paid");
        }

        if (paymentRepo.existsByBookingId(bookingId)) {
            throw new ResourceAlreadyExistsException("Payment already exists");
        }

        // ✅ REAL RAZORPAY ORDER
        String orderId;
        try {
            RazorpayClient client = new RazorpayClient(
                "rzp_test_S72CntxmHZ005O", 
                "6oEphQ3Q8PAe56rMaH3fa8zK"
            );
            
            JSONObject options = new JSONObject();
            options.put("amount", dto.getAmt().multiply(BigDecimal.valueOf(100)).longValue());  // Paise
            options.put("currency", "INR");
            options.put("receipt", "booking_" + bookingId);
            
            Order order = client.orders.create(options);
            orderId = order.get("id").toString();
            
        } catch (Exception e) {
            throw new RuntimeException("Razorpay failed: " + e.getMessage(), e);
        }

        // Save payment PENDING
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmt(dto.getAmt());
        payment.setStatus(PaymentStatus.PENDING);
        payment.setMode(PaymentMode.valueOf(dto.getMode().toUpperCase()));
        payment.setTxnid(orderId);
        payment.setPaydate(LocalDateTime.now());
        
        Payment saved = paymentRepo.save(payment);

        // Response with Razorpay order_id
        PaymentRes res = new PaymentRes();
        res.setId(saved.getId());
        res.setAmt(saved.getAmt());
        res.setStatus(saved.getStatus().name());
        res.setMode(saved.getMode().name());
        res.setTxnid(orderId);  // Razorpay order_id
        res.setPaydate(saved.getPaydate());
        res.setBookingId(bookingId);
        
        return res;
    }


    @Override
    public PaymentRes getPaymentForCustomer(String email, Long bookingId) {
        Payment payment = paymentRepo.findByBookingIdAndCustEmail(bookingId, email)
            .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));

        // Direct DTO creation
        PaymentRes response = new PaymentRes();
        response.setId(payment.getId());
        response.setAmt(payment.getAmt());
        response.setStatus(payment.getStatus().name());
        response.setMode(payment.getMode() != null ? payment.getMode().name() : null);
        response.setTxnid(payment.getTxnid());
        response.setPaydate(payment.getPaydate());
        response.setBookingId(payment.getBooking().getId());
        
        return response;
    }

    @Override
    public PaymentRes getPaymentForVendor(String email, Long bookingId) {
        Payment payment = paymentRepo.findByBookingIdAndVendorEmail(bookingId, email)
            .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));

        // Direct DTO creation
        PaymentRes response = new PaymentRes();
        response.setId(payment.getId());
        response.setAmt(payment.getAmt());
        response.setStatus(payment.getStatus().name());
        response.setMode(payment.getMode() != null ? payment.getMode().name() : null);
        response.setTxnid(payment.getTxnid());
        response.setPaydate(payment.getPaydate());
        response.setBookingId(payment.getBooking().getId());
        
        return response;
    }
}
