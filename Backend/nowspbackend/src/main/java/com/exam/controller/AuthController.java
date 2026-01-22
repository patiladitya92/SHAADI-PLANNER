package com.exam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.dto.AuthRes;
import com.exam.dto.LoginReq;
import com.exam.entities.User;
import com.exam.security.JwtUtils;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
	private final AuthenticationManager authenticationManager;
	private JwtUtils jwtUtils;
	
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
}
