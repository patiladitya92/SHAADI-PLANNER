package com.exam.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class BookingStatusResponse {
    private Long id;
    private String status;  // "ACCEPTED", "REJECTED"
    private String message; // "Booking accepted successfully"
}
	