package com.exam.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PaymentAdminDto {
	private Long id;
	private Long bookingId;
    private BigDecimal amt;
    private String status;
    private String mode;
    private String txnid;
    private LocalDateTime paydate;
    private String bookingStatus;
}
