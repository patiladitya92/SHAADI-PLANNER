package com.exam.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileRes {
    private Long id;
    private String email;
    private String name;
    private String phone;
    private String role;           
    
   
    private Long customerId;
    private String customerCity;
    
    private Long vendorId;
    private String vendorBizname;
    private String vendorCity;
    private boolean vendorAvailable;
}

