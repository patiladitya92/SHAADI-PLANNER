package com.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.exam.dto.BookingRes;
import com.exam.entities.Booking;

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

}
