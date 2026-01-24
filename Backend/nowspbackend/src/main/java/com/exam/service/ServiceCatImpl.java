package com.exam.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.exam.dto.CategoryReq;
import com.exam.dto.CategoryUpdate;
import com.exam.dto.ServiceCatDto;
import com.exam.entities.ServiceCategory;
import com.exam.exception.ResourceNotFoundException;
import com.exam.repository.ServiceCatRepo;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ServiceCatImpl implements ServiceCat {
	
	private final ServiceCatRepo serviceCatRepo;
	private final ModelMapper m;
	@Override
	public List<ServiceCatDto> getAllService() {
		List<ServiceCategory> list = serviceCatRepo.findAll();
		List<ServiceCatDto> result = list.stream().map(t->m.map(t, ServiceCatDto.class)).toList();
		return result;
	}
	
	@Override
	public String createCategory(CategoryReq dto) {
		if (serviceCatRepo.existsByNameIgnoreCase(dto.getName())) {
            return "already exists";
        }
		ServiceCategory category = new ServiceCategory();
        category.setName(dto.getName());
        category.setDeleted(false);
        serviceCatRepo.save(category);
        return "created";
	}

	@Override
	public String updateCategory(Long id, CategoryUpdate dto) {
		ServiceCategory category = serviceCatRepo.findByIdAndDeletedFalse(id).orElseThrow(() -> new ResourceNotFoundException("Service category not found: " + id));
		    
		    if (serviceCatRepo.existsByNameIgnoreCaseAndIdNot(dto.getName(), id)) {
		        return "category already present";
		    }
		    
		    category.setName(dto.getName());
		    serviceCatRepo.save(category);
		return "updated";
	}

	@Override
	public String deleteCategory(Long id) {
		ServiceCategory category = serviceCatRepo.findByIdAndDeletedFalse(id).orElseThrow(() -> new ResourceNotFoundException("Service category not found: " + id));
		    category.setDeleted(true);
		    serviceCatRepo.save(category);
		    return "deleted";
	}
	
	
}
