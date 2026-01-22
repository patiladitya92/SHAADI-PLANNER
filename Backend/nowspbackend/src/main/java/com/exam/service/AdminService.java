package com.exam.service;

import java.util.List;

import com.exam.dto.BookingRes;
import com.exam.dto.CustomerAdminDto;
import com.exam.dto.PaymentAdminDto;
import com.exam.dto.UserDto;
import com.exam.dto.VendorAdminDto;


public interface AdminService {

	public List<UserDto> getAllUsers();
	public List<VendorAdminDto> getVendorList();
	public List<CustomerAdminDto> getAllCustomers();
	public List<BookingRes> getAllBookings();
	public List<PaymentAdminDto> getAllPayments();
	
}
