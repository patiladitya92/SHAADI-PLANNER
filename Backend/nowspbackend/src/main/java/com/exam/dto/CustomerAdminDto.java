package com.exam.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomerAdminDto {
	private Long id;
    private String email;        // from user.email
    private String fullname;
    private String phone;
    private String addr;
    private String city;
    private String state;
    private boolean deleted;      // from user.active
}
