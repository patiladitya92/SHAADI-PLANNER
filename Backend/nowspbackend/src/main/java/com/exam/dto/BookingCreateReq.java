package com.exam.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingCreateReq {
    @NotNull @Future
    private LocalDate eventdate;
    @NotNull
    private Long listingId;
    // getters/setters
}

