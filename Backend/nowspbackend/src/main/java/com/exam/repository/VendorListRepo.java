package com.exam.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.exam.dto.VendorListDto;
import com.exam.dto.VendorListingVendorRes;
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
	
	
	@Query("""
		    select new com.exam.dto.VendorListingVendorRes(
		        l.id,
		        l.title,
		        l.description,
		        l.price,
		        l.photourl,
				l.vendor.user.id
		    )
		    from VendorListing l
		    where l.vendor.user.id = ?1
		      and l.deleted = false
		""")
		List<VendorListingVendorRes> getListForVendor(Long userId);

	
	 VendorListing findByIdAndVendorUserIdAndDeletedFalse(Long id, Long userId);
	 
	 
	 @Query("SELECT l FROM VendorListing l WHERE l.id = ?1 AND l.deleted = false")
	    Optional<VendorListing> findActiveById(Long id);
}		
