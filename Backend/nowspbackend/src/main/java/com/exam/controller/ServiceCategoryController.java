package com.exam.controller;

import org.springframework.http.HttpStatus;
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
import org.springframework.web.bind.annotation.RestController;

import com.exam.dto.CategoryReq;
import com.exam.dto.CategoryUpdate;
import com.exam.dto.JwtDTO;
import com.exam.service.ServiceCat;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ServiceCategoryController {
	public final ServiceCat serviceCategory;
	
	@GetMapping("/categories")
	public ResponseEntity<?> getAllServiceCategory(){
		return ResponseEntity.status(HttpStatus.OK).body(serviceCategory.getAllService());
	}
	

	 @PostMapping("/categories")
	 @PreAuthorize("hasRole('ADMIN')")
	 public ResponseEntity<?> create(@AuthenticationPrincipal JwtDTO dto,@RequestBody CategoryReq catdto) { 
		    return ResponseEntity.status(HttpStatus.OK).body(serviceCategory.createCategory(catdto));
	 }
	 
	 @PutMapping("/{id}")
	 @PreAuthorize("hasRole('ADMIN')")
	 public ResponseEntity<?> update(@AuthenticationPrincipal JwtDTO dto,@PathVariable Long id,@RequestBody CategoryUpdate catdto) {
		 return ResponseEntity.status(HttpStatus.OK).body(serviceCategory.updateCategory(id, catdto));
		    
	 }
	 
	 @DeleteMapping("/{id}")
	 @PreAuthorize("hasRole('ADMIN')")
	 public ResponseEntity<?> delete(@PathVariable Long id) {
		 return ResponseEntity.status(HttpStatus.OK).body(serviceCategory.deleteCategory(id));
	 }
	 

}
