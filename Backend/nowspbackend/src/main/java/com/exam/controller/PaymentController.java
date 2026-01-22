package com.exam.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.dto.PaymentCreateDto;
import com.exam.service.PaymentService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@AllArgsConstructor
public class PaymentController {
	
	private final PaymentService paymentService;
	
	@PostMapping("/booking/{bookingId}")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<?> createPayment(Authentication auth, @PathVariable Long bookingId, @RequestBody PaymentCreateDto dto) {
		String email = auth.getName();
	    return ResponseEntity.status(HttpStatus.CREATED).body(paymentService.createPayment(email, bookingId, dto));
	}
}
