package com.exam.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.exam.dto.BookingRes;
import com.exam.repository.BookingsRepo;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BookingService {
	private final BookingsRepo bookingsRepo;

	public List<BookingRes> getallBookings(Long id) {
		// TODO Auto-generated method stub
		 List<BookingRes> list = bookingsRepo.getAllBookings(id);
		 
		 return list;
	}
	
	
}
