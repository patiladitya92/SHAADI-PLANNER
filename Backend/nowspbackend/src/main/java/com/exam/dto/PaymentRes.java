package com.exam.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRes {
    private Long id;
    private BigDecimal amt;
    private String status;           // PENDING, SUCCESS, FAILED
    private String mode;
    private String txnid;
    private LocalDateTime paydate;
    private Long bookingId;
}
