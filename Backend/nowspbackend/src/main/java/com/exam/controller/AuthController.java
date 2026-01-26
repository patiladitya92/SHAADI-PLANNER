package com.exam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.dto.ApiResponse;
import com.exam.dto.AuthRes;
import com.exam.dto.ForgotPasswordReq;
import com.exam.dto.JwtDTO;
import com.exam.dto.LoginReq;
import com.exam.dto.RegisterReq;
import com.exam.dto.ResetPasswordReq;
import com.exam.dto.UserProfileRes;
import com.exam.entities.User;
import com.exam.security.JwtUtils;
import com.exam.service.AuthService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;


@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;
	private final AuthService authService;
	
	
	
	 @PostMapping("/login")
	    public ResponseEntity<AuthRes> login(@RequestBody LoginReq dto) {
		 System.out.println("in user auth "+dto);
			UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
			 Authentication fullyAuthenticated = authenticationManager.authenticate(authToken);
			   User user = (User) fullyAuthenticated.getPrincipal(); 
			   String jwt = jwtUtils.genrateToken(fullyAuthenticated);
			   AuthRes res = new AuthRes(
			            user.getId(),
			            user.getEmail(),
			            user.getName(),
			            user.getRole().name(),   // "ROLE_CUSTOMER" etc.
			            jwt
			    );
			   return ResponseEntity.ok(res);
			
	 }
	 
	
	     
	     
	     

	     
	     @PostMapping("/register")
	     public ResponseEntity<ApiResponse<Void>> register(@RequestBody @Valid RegisterReq dto) {
	         authService.register(dto);
	         return ResponseEntity.ok(new ApiResponse<>(true, null, "Registered successfully"));
	     }
	     
	     @PreAuthorize("isAuthenticated()")
	     @GetMapping("/me")
	     public ResponseEntity<?> me(Authentication auth) {
	    	 
	    	  JwtDTO dto = (JwtDTO) auth.getPrincipal();  // ✅ Full User object
	    	    String email = dto.getEmail();   // JWT subject = email
	         UserProfileRes profile = authService.getUserProfile(email);
	         return ResponseEntity.ok(new ApiResponse<>(true, profile, "Profile fetched"));
	     }
	     
	     @PostMapping("/forgot-password")
	     public ResponseEntity<ApiResponse<Void>> forgotPassword(@RequestBody @Valid ForgotPasswordReq dto) {
	         authService.forgotPassword(dto.getEmail());
	         return ResponseEntity.ok(new ApiResponse<>(true, null, "Reset link sent to your email"));
	     }

	     @PostMapping("/reset-password")
	     public ResponseEntity<ApiResponse<Void>> resetPassword(@RequestBody @Valid ResetPasswordReq dto) {
	         authService.resetPassword(dto.getToken(), dto.getNewPassword());
	         return ResponseEntity.ok(new ApiResponse<>(true, null, "Password reset successful"));
	     }


	 


}
