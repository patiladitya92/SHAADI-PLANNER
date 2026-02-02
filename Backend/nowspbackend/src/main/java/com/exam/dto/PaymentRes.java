package com.exam.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRes {
    private Long id;
    private BigDecimal amt;
    private String status;
    private String mode;
    private String razorpayOrderId; 
    private String txnid;
    private LocalDateTime paydate;
    private Long bookingId;
}
