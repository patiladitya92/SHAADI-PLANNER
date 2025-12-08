package com.exam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exam.service.VendorList;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class VendorListingController {
	private final VendorList vendorList;
	
	@GetMapping("/listings")
	public ResponseEntity<?> getByCityAndCat(@RequestParam String city, @RequestParam Long catId){
		return ResponseEntity.ok(vendorList.getVendorList(city, catId));
	}	

}