package com.exam.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingCreateRes {
    
    private Long id;
    private LocalDate eventdate;
    private String status;           // "PENDING", "PAID", etc.
    private BigDecimal amt;
    
    // Listing info (booking.list.*)
    private String listingTitle;
    private String photoUrl;
    
    // Vendor info (booking.vendor.*)  
    private String vendorBizname;
    private String vendorCity;
}
