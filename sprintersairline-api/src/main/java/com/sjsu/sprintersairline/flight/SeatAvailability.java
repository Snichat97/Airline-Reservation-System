package com.sjsu.sprintersairline.flight;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SeatAvailability {

    String flight;
    int seatCount;
    String user;

    public SeatAvailability(String flight, int seatCount, String user) {
        this.flight = flight;
        this.seatCount = seatCount;
        this.user = user;
    }
    public SeatAvailability(){

    }
}
