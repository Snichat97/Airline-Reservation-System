package com.sjsu.sprintersairline.airport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AirportController {

    @Autowired
    AirportService airportService;

    @GetMapping("/airports")
    @CrossOrigin(origins = "*")
    public ResponseEntity<?> getAllAirports(){
        List<Airport> airports = airportService.getAllAirports();
        AirportResponse airportResponse = new AirportResponse(airports);
        return ResponseEntity.ok(airportResponse);
    }
}
