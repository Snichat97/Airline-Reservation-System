package com.sjsu.sprintersairline.reservation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class ReservationCreateRequest {
    String id;
    String user;
    String flight;
    private int seats;
    double cost;


}
