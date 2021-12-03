package com.sjsu.sprintersairline.reservation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class ReservationCreateResponse implements Serializable {
    private String id;
    private String user;
    private String flight;
    private int seats;
    double finalCost;
    double discountedCost;
    boolean success;

    ReservationCreateResponse(String id, boolean success, String user, String flight,
                              int seats, double finalCost, double discountedCost){
        this.user = user;
        this.flight = flight;
        this.seats = seats;
        this.finalCost = finalCost;
        this.discountedCost = discountedCost;
        this.success = success;
        this.id = id;
    }
    ReservationCreateResponse(boolean success){
        this.success = success;
    }

}
