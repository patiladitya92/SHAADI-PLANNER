package com.exam.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.exam.dto.BookingCreateReq;
import com.exam.dto.BookingCreateRes;
import com.exam.dto.BookingRes;
import com.exam.dto.BookingStatusResponse;
import com.exam.entities.Booking;
import com.exam.entities.BookingStatus;
import com.exam.entities.Customer;
import com.exam.entities.Vendor;
import com.exam.entities.VendorListing;
import com.exam.exception.ResourceNotFoundException;
import com.exam.repository.BookingsRepo;
import com.exam.repository.CustomerRepo;
import com.exam.repository.VendorListRepo;
import com.exam.repository.VendorRepo;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BookingService {
	private final BookingsRepo bookingsRepo;
    private final CustomerRepo  customerRepo;
   private final VendorListRepo vendorListingRepo;
   private final ModelMapper modelMapper;
   private final VendorRepo vendorrepo;
	public List<BookingRes> getallBookings(Long id) {
		// TODO Auto-generated method stub
		 List<BookingRes> list = bookingsRepo.getAllBookings(id);
		 
		 return list;
	}


	
	   public BookingCreateRes createBooking(Long userId, BookingCreateReq req) {
	        Customer customer = customerRepo.findByUserId(userId)
	            .orElseThrow(() -> new ResourceNotFoundException("Customer not found for userId: " + userId));
	        VendorListing listing = vendorListingRepo.findActiveById(req.getListingId())
	            .orElseThrow(() -> new ResourceNotFoundException("Listing not found or inactive: " + req.getListingId()));
	        // 3. Business validation: future event date
	        if (req.getEventdate().isBefore(LocalDate.now())) {
	            throw new IllegalArgumentException("Event date must be in the future");
	        }
	        // 4. Check if listing vendor is active
	        if (listing.getVendor().isDeleted() || !listing.getVendor().isAvail()) {
	            throw new IllegalArgumentException("Vendor is inactive or unavailable");
	        }
	        // 5. Create new booking
	        Booking booking = new Booking();
	        booking.setCust(customer);
	        booking.setVendor(listing.getVendor());
	        booking.setList(listing);
	        booking.setEventdate(req.getEventdate());
	        booking.setBookdate(LocalDateTime.now());
	        booking.setStatus(BookingStatus.PENDING);
	        booking.setAmt(listing.getPrice());
	        booking.setDeleted(false);

	      
	        Booking savedBooking = bookingsRepo.save(booking);
	        BookingCreateRes dto = modelMapper.map(savedBooking, BookingCreateRes.class);
	        
	        
	        dto.setStatus(savedBooking.getStatus().name());
	       
	        	return dto;
	        
	        
	    }



	public List<BookingRes> getVendorBookings(Long userId) {
		
		 Vendor vendor = vendorrepo.findByUserId(userId).orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));
			        
			    
			    // 2. Get all bookings for this vendor's listings
			    List<BookingRes> bookings = bookingsRepo.getVendorBookings(vendor.getId());
			    
			    return bookings;
	}



	public BookingStatusResponse updateBookingStatus(Long vendorUserId, Long bookingId, String status) {
	    
		Vendor vendor = vendorrepo.findByUserId(vendorUserId).orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));
	       
	    
	    Booking booking = bookingsRepo.findByVendorIdAndBookingId(vendor.getId(), bookingId)
	        .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
	    
	    BookingStatus newStatus = BookingStatus.valueOf(status.toUpperCase());
	    booking.setStatus(newStatus);
	    bookingsRepo.save(booking);
	    
	    // ✅ MINIMAL RESPONSE (3 fields only)
	    return new BookingStatusResponse(bookingId, newStatus.name(), "Status updated to " + newStatus.name());
	}



	public BookingRes getBookingById(Long bookingId) {
		BookingRes temp = bookingsRepo.findBookingResById(bookingId)  // ← Changed method name
        .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
	       
	    
	    // ✅ MAPPER IN SERVICE (your preference)
	    return temp;
	}



	
	
}
