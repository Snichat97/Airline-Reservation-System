package com.sjsu.sprintersairline.flight;

import java.io.Serializable;
import java.util.List;

public class FlightSearchResponse implements Serializable {
    private List<Flight> flights;

    FlightSearchResponse(List<Flight> flights){
        this.flights = flights;
    }

    public List<Flight> getFlights() {
        return flights;
    }
}
