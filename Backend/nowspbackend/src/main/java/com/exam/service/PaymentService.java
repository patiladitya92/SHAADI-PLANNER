package com.exam.service;

import com.exam.dto.PaymentCreateDto;
import com.exam.dto.PaymentRes;

public interface PaymentService {
	PaymentRes createPayment(String email, Long bookingId, PaymentCreateDto dto);
	PaymentRes getPaymentForCustomer(String email, Long bookingId);
	PaymentRes getPaymentForVendor(String email, Long bookingId);

}
