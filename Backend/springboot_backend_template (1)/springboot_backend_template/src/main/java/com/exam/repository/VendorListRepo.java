package com.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.exam.dto.VendorListDto;
import com.exam.entities.VendorListing;

public interface VendorListRepo extends JpaRepository<VendorListing, Long>{

	@Query("""
	        select new com.exam.dto.VendorListDto(
	            l.id,
	            l.title,
	            l.description,
	            l.price,
	            l.vendor.id,
	            l.vendor.user.name,
	            l.vendor.city,
	            l.vendor.cat.name,
	            l.photourl
	        )
	        from VendorListing l
	        where lower(l.vendor.city) = lower(?1)
	          and l.vendor.cat.id = ?2
	          and l.deleted = false
	        order by l.price asc
	        """)
	    List<VendorListDto> getVendorList(String city, long catid);
}		
