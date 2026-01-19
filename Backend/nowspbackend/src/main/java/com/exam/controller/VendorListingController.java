package com.exam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exam.dto.JwtDTO;
import com.exam.dto.VendorListingReq;
import com.exam.dto.VendorListingVendorRes;
import com.exam.service.VendorList;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping
@AllArgsConstructor
public class VendorListingController {
	
	private final VendorList vendorList;

	@GetMapping("/api/listings")
	public ResponseEntity<?> getByCityAndCat(@RequestParam String city,@RequestParam Long catId) {
		return ResponseEntity.ok(vendorList.getVendorList(city, catId));
	}
	
	
	 
	@GetMapping("/api/vendors/me/listings")
	@PreAuthorize("hasRole('VENDOR')")
	public ResponseEntity<?> getMyListings(@AuthenticationPrincipal JwtDTO dto) {

	    return ResponseEntity.ok(vendorList.getListForVendor(dto.getUserId()));
	}
	
	@PostMapping("/api/vendors/me/listings")
	@PreAuthorize("hasRole('VENDOR')")
	public ResponseEntity<?> createMyListing(@AuthenticationPrincipal JwtDTO dto,@RequestBody VendorListingReq dto2) { 
		return ResponseEntity.ok(vendorList.createMyListing(dto.getUserId(),dto2));
	}
	
	
	@PutMapping("/api/vendors/me/listings/{id}")
	@PreAuthorize("hasRole('VENDOR')")
	public ResponseEntity<?> updateMyListing(@AuthenticationPrincipal JwtDTO dto,@PathVariable Long id,@RequestBody VendorListingReq dto2) { 
		return ResponseEntity.ok(vendorList.updateMyListing(dto.getUserId(),id,dto2));
	}
	
	@DeleteMapping("/api/vendors/me/listings/{id}")
	@PreAuthorize("hasRole('VENDOR')")
	public ResponseEntity<?> deleteMyListing(@AuthenticationPrincipal JwtDTO dto,@PathVariable Long id) {
		return ResponseEntity.ok(vendorList.deleteMyListing(id));
	}
	
	
}