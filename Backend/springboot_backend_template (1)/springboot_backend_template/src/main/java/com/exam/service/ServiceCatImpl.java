package com.exam.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.exam.dto.ServiceCatDto;
import com.exam.entities.ServiceCategory;
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
	
}
