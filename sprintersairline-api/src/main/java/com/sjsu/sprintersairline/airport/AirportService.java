package com.sjsu.sprintersairline.airport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AirportService {

    @Autowired
    AirportRepository airportRepository;

    public List<Airport> getAllAirports(){
        List<Airport> airports = airportRepository.findAll();
        return airports;
    }
}
