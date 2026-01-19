package com.exam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entities.Vendor;

public interface VendorRepo extends JpaRepository<Vendor, Long> {

	Vendor findByUserIdAndDeletedFalse(Long userId);

}
