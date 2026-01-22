package com.exam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.service.AdminService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@AllArgsConstructor
public class AdminController {
	
	public final AdminService adminService;
	
	
	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers() {
	    return ResponseEntity.ok(adminService.getAllUsers());
	}
	
	
	@GetMapping("/vendors")
	public ResponseEntity<?> getAllVendors() {
		return ResponseEntity.ok(adminService.getVendorList());
	}
	
	 @GetMapping("/customers")
	 public ResponseEntity<?> getAllCustomers() {
		 return ResponseEntity.ok(adminService.getAllCustomers());
	 }
	 
	 @GetMapping("/bookings")
	 public ResponseEntity<?> getAllBookings() {
		 return ResponseEntity.ok(adminService.getAllBookings());
	 }
	 
	 @GetMapping("/payments")
	 public ResponseEntity<?> getAllPayments() { 
		 return ResponseEntity.ok(adminService.getAllPayments());
	 }
	
}
