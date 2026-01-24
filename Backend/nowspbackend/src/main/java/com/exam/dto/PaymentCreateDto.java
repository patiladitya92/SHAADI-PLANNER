package com.exam.dto;

import java.math.BigDecimal;


import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PaymentCreateDto {
	@DecimalMin("0.01")
    private BigDecimal amt;
    
    @NotNull
    private String mode;
}
