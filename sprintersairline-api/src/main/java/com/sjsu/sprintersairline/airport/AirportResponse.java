package com.sjsu.sprintersairline.airport;

import java.io.Serializable;
import java.util.List;

public class AirportResponse implements Serializable {
    private List<Airport> airports;

    public AirportResponse(List<Airport> airports) {
        this.airports = airports;
    }

    public List<Airport> getAirports() {
        return airports;
    }
}
