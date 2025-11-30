package com.exam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;


import com.exam.dto.JwtDTO;

import com.exam.service.BookingService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/bookings")
@AllArgsConstructor
public class BookingController {
	
	private final BookingService bookingService;
	
	@PreAuthorize("hasRole('CUSTOMER')")
	@GetMapping("/me")
	public ResponseEntity<?> getMyBookings(@AuthenticationPrincipal JwtDTO dto) {
	   return  ResponseEntity.ok().body(bookingService.getallBookings(dto.getUserId()));
	    
	}

	


}
