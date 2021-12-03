package com.sjsu.sprintersairline.reservation;

import com.sjsu.sprintersairline.flight.Flight;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@ToString
public class ReservationResponse implements Serializable {
    private List<Reservation> reservations;

    ReservationResponse(List<Reservation> reservations){
        this.reservations = reservations;
    }
}
