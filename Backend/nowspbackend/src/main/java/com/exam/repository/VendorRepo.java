package com.exam.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entities.Vendor;

public interface VendorRepo extends JpaRepository<Vendor, Long> {



	Vendor findByUserIdAndDeletedFalse(Long userId);
	List<Vendor> findAllByDeletedFalse();
    Optional<Vendor> findByIdAndDeletedFalse(Long id);
 

	Optional<Vendor> findByUserId(Long vendorUserId);

	

}
