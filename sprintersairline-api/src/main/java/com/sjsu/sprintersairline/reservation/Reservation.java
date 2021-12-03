package com.sjsu.sprintersairline.reservation;

import com.sjsu.sprintersairline.flight.Flight;
import com.sjsu.sprintersairline.user.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.PostMapping;

@Getter
@Setter
@ToString

@Document(collection = "reservation")
public class Reservation {

    @Id
    private String id;

    @DBRef
    private User user;
    @DBRef
    private Flight flight;
    private int seats;
    double cost;

    public Reservation(User user, Flight flight, int seats, double cost) {
        this.user = user;
        this.flight = flight;
        this.seats = seats;
        this.cost = cost;
    }

    public Reservation(String id){
        this.id = id;
    }

    public Reservation(){

    }

    public Reservation(String id, User user, Flight flight, int seats, double cost) {
        this.id = id;
        this.user = user;
        this.flight = flight;
        this.seats = seats;
        this.cost = cost;
    }
}
