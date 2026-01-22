package com.exam.service;

import java.util.List;

import com.exam.dto.CategoryReq;
import com.exam.dto.CategoryUpdate;
import com.exam.dto.ServiceCatDto;

public interface ServiceCat {
	public List<ServiceCatDto> getAllService();
	
	public String createCategory(CategoryReq dto);

	public String updateCategory(Long id, CategoryUpdate dto);

	public String deleteCategory(Long id);
}
