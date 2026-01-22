package com.exam.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterReq {
    @NotBlank private String name;
    @Email @NotBlank private String email;
    @NotBlank private String phone;
    @NotBlank private String password;
    @NotBlank private String role;
    
    // Vendor REQUIRED fields
    private String bizname;
    private String addr;      // ✅ Added
    private String city;
    private String state;
    private Long catId;
    
    @AssertTrue(message = "Vendors must provide ALL fields: bizname, addr, city, state, catId")
    public boolean isValidVendor() {
        if (!"ROLE_VENDOR".equalsIgnoreCase(role)) return true;
        return bizname != null && !bizname.trim().isEmpty()
            && addr != null && !addr.trim().isEmpty()
            && city != null && !city.trim().isEmpty()
            && state != null && !state.trim().isEmpty()
            && catId != null && catId > 0;
    }
}
