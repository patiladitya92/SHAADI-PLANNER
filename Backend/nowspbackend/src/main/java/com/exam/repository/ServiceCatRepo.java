package com.exam.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entities.ServiceCategory;

public interface ServiceCatRepo extends JpaRepository<ServiceCategory, Long>{
boolean existsByNameIgnoreCase(String name);
    
    List<ServiceCategory> findAllByDeletedFalse();
    boolean existsByNameIgnoreCaseAndIdNot(String name, Long id);
    Optional<ServiceCategory> findByIdAndDeletedFalse(Long id);
    
}
