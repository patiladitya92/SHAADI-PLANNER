package com.exam.dto;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.exam.entities.BookingStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class BookingRes {

    private Long id;                 // booking id

    private LocalDate eventdate;
    private LocalDateTime bookdate;
    private String status;           // BookingStatus name
    private BigDecimal amt;

    // listing info
    private Long listingId;
    private String listingTitle;
    private BigDecimal listingPrice;

    // vendor info
    private Long vendorId;
    private String vendorBizname;
    private String vendorCity;
    private String vendorState;

    // customer info
    private Long customerId;
    private String customerName;
    private String customerCity;

    // for constructor expression:
    public BookingRes(Long id,
            LocalDate eventdate,
            LocalDateTime bookdate,
            BookingStatus status,
            BigDecimal amt,
            Long listingId,
            String listingTitle,
            BigDecimal listingPrice,
            Long vendorId,
            String vendorBizname,
            String vendorCity,
            String vendorState,
            Long customerId,
            String customerName,
            String customerCity) {
this.id = id;
this.eventdate = eventdate;
this.bookdate = bookdate;
this.status = status.name();
this.amt = amt;
this.listingId = listingId;
this.listingTitle = listingTitle;
this.listingPrice = listingPrice;
this.vendorId = vendorId;
this.vendorBizname = vendorBizname;
this.vendorCity = vendorCity;
this.vendorState = vendorState;
this.customerId = customerId;
this.customerName = customerName;
this.customerCity = customerCity;
}
}

