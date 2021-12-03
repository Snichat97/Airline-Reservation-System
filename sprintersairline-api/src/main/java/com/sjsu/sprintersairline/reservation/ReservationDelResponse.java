package com.sjsu.sprintersairline.reservation;

import com.sjsu.sprintersairline.flight.Flight;
import com.sjsu.sprintersairline.user.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@ToString

public class ReservationDelResponse implements Serializable {

    private String id;
    private User user;
    private Flight flight;
    private int seats;
    double cost;
    boolean success;

    public ReservationDelResponse(boolean success){
        this.success = success;
    }

}
