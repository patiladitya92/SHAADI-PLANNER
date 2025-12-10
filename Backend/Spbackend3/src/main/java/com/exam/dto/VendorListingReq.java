package com.exam.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VendorListingReq {

    private String title;
    private String description;
    private BigDecimal price;
    private String photourl;   // optional, can be null

     // required so backend knows which category
}
