package com.exam.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import org.hibernate.Hibernate;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.exam.dto.BookingRes;
import com.exam.dto.CustomerAdminDto;
import com.exam.dto.PaymentAdminDto;
import com.exam.dto.UserDto;
import com.exam.dto.VendorAdminDto;
import com.exam.entities.Booking;
import com.exam.entities.Customer;
import com.exam.entities.Payment;
import com.exam.entities.User;
import com.exam.entities.Vendor;
import com.exam.exception.ResourceNotFoundException;
import com.exam.repository.BookingsRepo;
import com.exam.repository.CustomerRepo;
import com.exam.repository.PaymentRepo;
import com.exam.repository.UserRepository;
import com.exam.repository.VendorRepo;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class AdminServiceImpl implements AdminService {

	private final UserRepository userRepository;
	private final VendorRepo vendorRepo;
	private final CustomerRepo customerRepo; 
	private final ModelMapper map;
	private final BookingsRepo bookingsRepo;
	private final PaymentRepo paymentRepo;
	
	@Override
	public List<UserDto> getAllUsers() {
		List<User> userlist = userRepository.findAllByDeletedFalse();
		List<UserDto> list = new ArrayList<>();     
		for(User user : userlist) {
	        UserDto dto = map.map(user, UserDto.class);              
	        list.add(dto);                                           
	    }
		
//		List<UserDto> list2 = list.stream().map(t -> map.map(t, UserDto.class)).toList();
		return list;
	}

	@Override
	public List<VendorAdminDto> getVendorList() {
		 List<Vendor> vendorList = vendorRepo.findAllByDeletedFalse();
		    List<VendorAdminDto> list = new ArrayList<>();
		    
		    for (Vendor vendor : vendorList) {
		        VendorAdminDto res = new VendorAdminDto();
		        res.setId(vendor.getId());
		        res.setEmail(vendor.getUser().getEmail());     
		        res.setBizname(vendor.getBizname());
		        res.setCategory(vendor.getCat().getName());    
		        res.setCity(vendor.getCity());
		        res.setState(vendor.getState());
		        res.setAvail(vendor.isAvail());    
		        list.add(res);
		    }
		    return list;
	}

	@Override
	public List<CustomerAdminDto> getAllCustomers() {
		List<Customer> customerList = customerRepo.findAllByDeletedFalse();
	    List<CustomerAdminDto> list = new ArrayList<>();
	    
	    for(Customer customer : customerList) {
	        CustomerAdminDto dto = new CustomerAdminDto();
	        dto.setId(customer.getId());
	        dto.setEmail(customer.getUser().getEmail());     // Via EAGER association
	        dto.setFullname(customer.getUser().getName());
	        dto.setPhone(customer.getUser().getPhone());
	        dto.setAddr(customer.getAddr());
	        dto.setCity(customer.getCity());
	        dto.setState(customer.getState());
	        dto.setDeleted(customer.getUser().isDeleted());    // Via EAGER association
	        list.add(dto);
	    }
	    return list;
	}

	@Override
	public List<BookingRes> getAllBookings() {
	    List<Booking> bookingList = bookingsRepo.findAllByDeletedFalse();
	    List<BookingRes> list = new ArrayList<>();
	    
	    for (Booking booking : bookingList) {
	    
	        BookingRes res = new BookingRes();
	        res.setId(booking.getId());
	        res.setEventdate(booking.getEventdate());
	        res.setBookdate(booking.getBookdate());
	        res.setStatus(booking.getStatus().name());
	        res.setAmt(booking.getAmt());
	        
	        // Listing info
	        res.setListingId(booking.getList().getId());
	        res.setListingTitle(booking.getList().getTitle());
	        res.setListingPrice(booking.getList().getPrice());
	        
	        // Vendor info
	        res.setVendorId(booking.getVendor().getId());
	        res.setVendorBizname(booking.getVendor().getBizname());
	        res.setVendorCity(booking.getVendor().getCity());
	        res.setVendorState(booking.getVendor().getState());
	        
	        // Customer info
	        res.setCustomerId(booking.getCust().getId());
	        res.setCustomerName(booking.getCust().getUser().getName());
	        res.setCustomerCity(booking.getCust().getCity());
	        
	        list.add(res);
	    }
	    return list;
	}

	public List<PaymentAdminDto> getAllPayments() {
	    List<Payment> paymentList = paymentRepo.findAllByDeletedFalse();
	    List<PaymentAdminDto> list = new ArrayList<>();
	    
	    for (Payment payment : paymentList) {
	        // Force load LAZY booking association
	        Hibernate.initialize(payment.getBooking());
	        
	        PaymentAdminDto res = new PaymentAdminDto();
	        res.setId(payment.getId());
	        res.setAmt(payment.getAmt());
	        res.setStatus(payment.getStatus().name());
	        res.setMode(payment.getMode() != null ? payment.getMode().name() : null);
	        res.setTxnid(payment.getTxnid());
	        res.setPaydate(payment.getPaydate());
	        
	        // Booking info
	        if (payment.getBooking() != null) {
	            res.setBookingId(payment.getBooking().getId());
	            res.setBookingStatus(payment.getBooking().getStatus().name());
	        }
	        
	        list.add(res);
	    }
	    return list;
	}
	
	public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }
	
	 public boolean toggleUserDeleted(Long userId) {
	        log.info("🔄 Admin toggling deleted status for user: {}", userId);  // ✅ Works
	        
	        User user = userRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));  // ✅ Generic exception
	        
	        user.setDeleted(!user.isDeleted());  // ✅ Changed to deleted field
	        userRepository.save(user);
	        
	        log.info("✅ User {} deleted status: {}", userId, user.isDeleted());
	        return user.isDeleted();
	    }




}
