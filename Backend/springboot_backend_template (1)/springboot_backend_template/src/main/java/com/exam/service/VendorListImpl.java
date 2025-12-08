package com.exam.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.exam.dto.VendorListDto;
import com.exam.repository.VendorListRepo;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class VendorListImpl implements VendorList{

	private final VendorListRepo vendorListRepo;
	
	@Override
	public List<VendorListDto> getVendorList(String location, long catid) {
		return vendorListRepo.getVendorList(location, catid);
	}

}
