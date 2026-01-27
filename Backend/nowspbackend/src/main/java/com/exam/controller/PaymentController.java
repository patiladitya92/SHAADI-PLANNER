package com.exam.controller;

import com.exam.dto.JwtDTO;
import com.exam.dto.PaymentCreateDto;
import com.exam.dto.PaymentRes;
import com.exam.service.PaymentServiceImpl;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@RequestMapping("/api/payments")
@AllArgsConstructor
public class PaymentController {

    private final PaymentServiceImpl paymentService; 
    
    @PostMapping("/booking/{bookingId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<PaymentRes> createPayment(
    		@AuthenticationPrincipal JwtDTO jwtdto,
            @PathVariable Long bookingId,
            @RequestBody PaymentCreateDto dto) {
        
        String email = jwtdto.getEmail();
        System.out.println(email);
        PaymentRes payment = paymentService.createPayment(email, bookingId, dto);
        return ResponseEntity.status(201).body(payment);
    }

    // Customer: Get payment for my booking
    @GetMapping("/booking/{bookingId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<PaymentRes> getByBookingForCustomer(
    		@AuthenticationPrincipal JwtDTO jwtdto,
            @PathVariable Long bookingId) {
        
        String email = jwtdto.getEmail();
        PaymentRes payment = paymentService.getPaymentForCustomer(email, bookingId);
        return ResponseEntity.ok(payment);
    }

    // Vendor: See payment for booking of my listing
    @GetMapping("/vendor/booking/{bookingId}")
    @PreAuthorize("hasRole('VENDOR')")
    public ResponseEntity<PaymentRes> getByBookingForVendor(
    		@AuthenticationPrincipal JwtDTO jwtdto,
            @PathVariable Long bookingId) {
        
        String email = jwtdto.getEmail();
        PaymentRes payment = paymentService.getPaymentForVendor(email, bookingId);
        return ResponseEntity.ok(payment);
    }
}
