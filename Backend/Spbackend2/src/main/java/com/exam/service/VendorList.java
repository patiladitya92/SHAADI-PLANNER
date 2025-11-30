package com.exam.service;

import java.util.List;

import com.exam.dto.VendorListDto;

public interface VendorList {
	public List<VendorListDto> getVendorList(String name, long catid);
}
