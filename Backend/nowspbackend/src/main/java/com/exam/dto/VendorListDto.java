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
public class VendorListDto {
		private Long id;         	private String title;  	private String description;	private BigDecimal price; 	private Long vendorid;	private String vendorname;	private String city;	private String catname; 
	private String photourl;

}
