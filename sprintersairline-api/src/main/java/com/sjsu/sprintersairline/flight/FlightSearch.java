package com.sjsu.sprintersairline.flight;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.sjsu.sprintersairline.airport.Airport;
import com.sjsu.sprintersairline.util.ObjectIdUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@ToString

@JsonDeserialize(using = FlightSearchDeserializer.class)
public class FlightSearch {

    // TODO learn how to deserialize custom types
    private ObjectId arrivalAirport;
    private ObjectId departureAirport;

    private LocalDateTime departureDate;

    public FlightSearch(){

    }

    public FlightSearch(ObjectId arrivalAirport, ObjectId departureAirport, LocalDateTime departureDate){
        this.arrivalAirport = arrivalAirport;
        this.departureAirport = departureAirport;
        this.departureDate = departureDate;
    }

}
