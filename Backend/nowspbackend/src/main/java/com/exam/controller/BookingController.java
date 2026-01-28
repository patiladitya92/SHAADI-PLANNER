package com.exam.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.exam.dto.ApiResponse;
import com.exam.dto.BookingCreateReq;
import com.exam.dto.BookingRes;
import com.exam.dto.BookingStatusResponse;
import com.exam.dto.BookingStatusUpdateReq;
import com.exam.dto.JwtDTO;

import com.exam.service.BookingService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@RequestMapping("/api/bookings")
@AllArgsConstructor
public class BookingController {
	
	private final BookingService bookingService;
	
	@PreAuthorize("hasRole('CUSTOMER')")
	@GetMapping("/me")
	public ResponseEntity<?> getMyBookings(@AuthenticationPrincipal JwtDTO dto) {
	   return  ResponseEntity.ok().body(bookingService.getallBookings(dto.getUserId()));
	    
	}
	
	@PreAuthorize("hasRole('CUSTOMER')")
	@PostMapping
	public ResponseEntity<?> createBooking(@AuthenticationPrincipal JwtDTO dto, 
	                                       @RequestBody @Valid BookingCreateReq bookdto) {
	    return ResponseEntity.status(HttpStatus.CREATED)
	        .body(bookingService.createBooking(dto.getUserId(), bookdto));
	}
	
	 @GetMapping("/vendor/me")
	 @PreAuthorize("hasRole('VENDOR')")
	 public ResponseEntity<?> getVendorBookings(@AuthenticationPrincipal JwtDTO dto) { 
		   return ResponseEntity.ok(bookingService.getVendorBookings(dto.getUserId()));
	 }
	   
	   
	  @PutMapping("/{id}/status")
	  @PreAuthorize("hasRole('VENDOR')")
	  public ResponseEntity<?> updateStatus(
	           @AuthenticationPrincipal JwtDTO dto,
	           @PathVariable Long id,
	           @RequestBody @Valid BookingStatusUpdateReq req) {
	       
	   BookingStatusResponse result = bookingService.updateBookingStatus(dto.getUserId(), id, req.getStatus());
	   return ResponseEntity.ok(new ApiResponse<>(true, result, "Status updated successfully"));
	   }
	   
	   
	   @GetMapping("/{id}")
	   public ResponseEntity<BookingRes> getById(@PathVariable Long id) {
	       BookingRes booking = bookingService.getBookingById(id);
	       return ResponseEntity.ok(booking);
	   }




}
