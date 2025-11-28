package com.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entities.VendorListing;

public interface VendorListRepo extends JpaRepository<VendorListing, Long>{
	List<VendorListing> findByVendor_CityAndVendor_Cat_IdAndDeletedFalse(
            String city,
            Long catId
    );
}		
