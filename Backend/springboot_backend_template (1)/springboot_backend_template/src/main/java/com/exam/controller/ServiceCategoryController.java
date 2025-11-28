package com.exam.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.service.ServiceCat;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/servicecategory")
@AllArgsConstructor
public class ServiceCategoryController {
	public final ServiceCat serviceCategory;
	
	@GetMapping("/categories")
	public ResponseEntity<?> getAllServiceCategory(){
		return ResponseEntity.status(HttpStatus.OK).body(serviceCategory.getAllService());
	}
}
