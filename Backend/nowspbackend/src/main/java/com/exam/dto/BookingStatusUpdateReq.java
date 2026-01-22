package com.exam.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BookingStatusUpdateReq {
    
    @NotNull(message = "Status is required")
    private String status;  // "ACCEPTED", "REJECTED"
}
