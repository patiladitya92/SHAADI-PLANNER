package com.exam.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entities.Customer;
import com.exam.entities.Vendor;

public interface VendorRepo extends JpaRepository<Vendor, Long> {



	Vendor findByUserIdAndDeletedFalse(Long userId);

	Optional<Vendor> findByUserId(Long vendorUserId);

	

}
