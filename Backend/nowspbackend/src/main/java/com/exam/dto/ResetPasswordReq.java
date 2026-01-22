package com.exam.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ResetPasswordReq {
    @NotBlank private String token;
    @NotBlank @Size(min = 3, message = "Password must be 6+ chars")
    private String newPassword;
}
