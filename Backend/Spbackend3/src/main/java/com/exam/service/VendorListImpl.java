package com.exam.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.exam.dto.VendorListDto;
import com.exam.dto.VendorListingReq;
import com.exam.dto.VendorListingVendorRes;
import com.exam.entities.Vendor;
import com.exam.entities.VendorListing;
import com.exam.repository.VendorListRepo;
import com.exam.repository.VendorRepo;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class VendorListImpl implements VendorList{

	private final VendorListRepo vendorListRepo;
	private final VendorRepo vendorRepo;
	private final ModelMapper mapper;
	@Override
	public List<VendorListDto> getVendorList(String location, Long catid) {
		return vendorListRepo.getVendorList(location, catid);
	}

	

	@Override
	public List<VendorListingVendorRes> getListForVendor(Long userId) {
		    return vendorListRepo.getListForVendor(userId);  // or JPQL with join on vendor.user.id
	}
//


	@Override
	public String createMyListing(Long userId, VendorListingReq dto2) {

	        // 1. Find vendor by linked user id
	        Vendor vendor = vendorRepo.findByUserIdAndDeletedFalse(userId);
//	                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found for user"));

	        // 2. Map DTO -> entity
	        VendorListing listing = mapper.map(dto2, VendorListing.class);

	        // 3. Set relationships & defaults
	        listing.setId(null);            // ensure insert
	        listing.setVendor(vendor);
	        listing.setDeleted(false);

	        // 4. Save
	        VendorListing temp = vendorListRepo.save(listing);
	        
	        return "added";
	}



	@Override
	public String updateMyListing(Long userId, Long id, VendorListingReq dto2) {
		VendorListing listing = vendorListRepo
                .findByIdAndVendorUserIdAndDeletedFalse(id, userId);
		 listing.setTitle(dto2.getTitle());
	        listing.setDescription(dto2.getDescription());
	        listing.setPrice(dto2.getPrice());
	        listing.setPhotourl(dto2.getPhotourl());
	        
	        return "updated";
	        
	}



	@Override
	public String deleteMyListing(Long listid) {
		VendorListing temp = vendorListRepo.findById(listid).orElseThrow();
		
		temp.setDeleted(true);
		
		return "deleted";
	}

	

}
