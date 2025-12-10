package com.exam.service;

import java.util.List;

import com.exam.dto.VendorListDto;
import com.exam.dto.VendorListingReq;
import com.exam.dto.VendorListingVendorRes;

public interface VendorList {
	public List<VendorListDto> getVendorList(String location, Long catid);
	
	public List<VendorListingVendorRes> getListingsByVendorUserId(Long userid);

	public String createMyListing(Long userId, VendorListingReq dto2);

	public String updateMyListing(Long userId, Long id, VendorListingReq dto2);
	
	public String deleteMyListing(Long listid);
}
