package com.exam.controller;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exam.dto.JwtDTO;
import com.exam.service.VendorList;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/vendorlistings")
@AllArgsConstructor
public class VendorListingController {
	
		private final VendorList vendorList;
		
		
		@GetMapping("/api/listings")
		public ResponseEntity<?> getByCityAndCat(@RequestParam String city,@RequestParam Long catId) {
			return ResponseEntity.ok(vendorList.getVendorList(city, catId));
		}
		
		 @GetMapping("/api/vendors/me/listings")
		 @PreAuthorize("hasRole('VENDOR')")
		 public ResponseEntity<List<VendorListingVendorRes>> getMyListings(@AuthenticationPrincipal JwtDTO dto) { }
	
}