package com.exam.service;

import com.exam.dto.PaymentCreateDto;

import jakarta.validation.Valid;

public interface PaymentService {

	String createPayment(String email, Long bookingId, @Valid PaymentCreateDto dto);

}
