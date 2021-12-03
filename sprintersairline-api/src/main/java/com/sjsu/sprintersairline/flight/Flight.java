package com.sjsu.sprintersairline.flight;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.sjsu.sprintersairline.airport.Airport;
import com.sjsu.sprintersairline.util.ObjectIdUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString

@Document(collection="flight")
@JsonDeserialize(using = FlightDeserializer.class)
public class Flight {

    @Id
    private String id;

    private String flightNum;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;


    @DBRef
    private Airport departureAirport;
    @DBRef
    private Airport arrivalAirport;
    private double seatCost;
    private int totalSeats;
    private int availSeats;

    public Flight(String id){
        this.id = id;
    }

    public Flight(String flightNum, LocalDateTime departureTime, LocalDateTime arrivalTime, Airport departureAirport, Airport arrivalAirport, double seatCost, int totalSeats, int availSeats) {
        this.flightNum = flightNum;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.seatCost = seatCost;
        this.totalSeats = totalSeats;
        this.availSeats = availSeats;
    }

    public Flight(Airport departureAirport, Airport arrivalAirport) {
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
    }

    public Flight(String id, String flightNum, LocalDateTime departureTime, LocalDateTime arrivalTime, Airport departureAirport, Airport arrivalAirport, double seatCost, int totalSeats, int availSeats) {
        this.id = id;
        this.flightNum = flightNum;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.seatCost = seatCost;
        this.totalSeats = totalSeats;
        this.availSeats = availSeats;
    }

    public Flight(){

    }
}
