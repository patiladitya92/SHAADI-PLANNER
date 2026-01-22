package com.exam.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.exam.dto.BookingRes;
import com.exam.entities.Booking;
import com.exam.entities.Customer;

public interface BookingsRepo extends JpaRepository<Booking, Long>{
	
	
	 @Query("""
		 select new com.exam.dto.BookingRes(
            b.id,
            b.eventdate,
            b.bookdate,
            b.status,         
            b.amt,
            b.list.id,
            b.list.title,
            b.list.price,
            b.vendor.id,
            b.vendor.bizname,
            b.vendor.city,
            b.vendor.state,
            b.cust.id,
            b.cust.user.name,
            b.cust.city
        )
        from Booking b
        where b.cust.user.id = ?1 
          and b.deleted = false
        order by b.bookdate desc
        """)
	List<BookingRes> getAllBookings(Long id);
	 
	 
	 @Query("""
			    SELECT new com.exam.dto.BookingRes(
			        b.id, b.eventdate, b.bookdate, b.status, b.amt,
			        b.list.id, b.list.title, b.list.price,
			        b.vendor.id, b.vendor.bizname, b.vendor.city, b.vendor.state,
			        b.cust.id, b.cust.user.name, b.cust.city
			    )
			    FROM Booking b 
			    WHERE b.vendor.id = ?1 AND b.deleted = false
			    ORDER BY b.bookdate DESC
			    """)
	 List<BookingRes> getVendorBookings(Long vendorId);


	 @Query("""
			    SELECT b FROM Booking b 
			    WHERE b.vendor.id = ?1
			    AND b.id = ?2
			    AND b.deleted = false
			    """)
			Optional<Booking> findByVendorIdAndBookingId(Long vendorId,Long bookingId
			);


	 @Query("""
			    SELECT new com.exam.dto.BookingRes(
			        b.id, b.eventdate, b.bookdate, b.status, b.amt,
			        b.list.id, b.list.title, b.list.price,
			        b.vendor.id, b.vendor.bizname, b.vendor.city, b.vendor.state,
			        b.cust.id, b.cust.user.name, b.cust.city
			    )
			    FROM Booking b 
			    WHERE b.id = ?1 AND b.deleted = false
			    """)
			Optional<BookingRes> findBookingResById(Long id); 





}
