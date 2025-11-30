package com.exam.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AuthRes {

    public AuthRes(Long id, String email, String name, String role, String token) {
		super();
		this.id = id;
		this.email = email;
		this.name = name;
		this.role = role;
		this.token = token;
	}
	private Long id;
    private String email;
    private String name;
    private String role;    // "ROLE_CUSTOMER" / "ROLE_VENDOR" / "ROLE_ADMIN"
    private String token;   // JWT string

    // constructor(s), getters
}