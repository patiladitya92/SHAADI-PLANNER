package com.exam.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VendorAdminDto {
    private Long id;
    private String email;           // from user.email
    private String bizname;
    private String category;        // from cat.name
    private String city;
    private String state;
    private boolean avail;       // from user.active
}
