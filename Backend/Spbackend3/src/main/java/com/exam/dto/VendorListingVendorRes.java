

package com.exam.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VendorListingVendorRes {

    private Long id;              // listing id
    private String title;
    private String description;
    private BigDecimal price;
    
    private Long categoryId;

    private Long vendorId;
  
  

    // if you have auditing; else remove
}
	
