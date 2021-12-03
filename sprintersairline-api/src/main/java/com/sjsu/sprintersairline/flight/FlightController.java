package com.sjsu.sprintersairline.flight;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FlightController {

    @Autowired
    FlightService flightService;

    @PostMapping("/flight/search")
    public ResponseEntity<?> searchFlights(@RequestBody FlightSearch flightSearch){
        if(flightSearch.getArrivalAirport()!=null && flightSearch.getDepartureAirport()!=null && flightSearch.getDepartureDate()!=null){
            List<Flight> flights = flightService.searchFlights(flightSearch);
            FlightSearchResponse flightSearchResponse = new FlightSearchResponse(flights);
            return ResponseEntity.ok(flightSearchResponse);
        }else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/flight/available")
    public ResponseEntity<?> checkAvailability(@RequestBody SeatAvailability seatAvailability){
        SeatAvailabilityResponse seatAvailabilityResponse =  flightService.checkSeatAvailability(seatAvailability);
        return ResponseEntity.ok(seatAvailabilityResponse);
    }

    @GetMapping("/flight")
    public ResponseEntity<?> getAllFlights(){
        List<Flight> flights = flightService.getAllFlights();
        FlightSearchResponse flightSearchResponse = new FlightSearchResponse(flights);
        return ResponseEntity.ok(flightSearchResponse);
    }

    @PostMapping("/flight/create")
    public ResponseEntity<?> createFlight(@RequestBody Flight flight){
        flightService.createFlight(flight);
        return ResponseEntity.ok(new FlightSearchResponse(null));
    }

    @PostMapping("/flight/delete")
    public ResponseEntity<?> deleteFlight(@RequestBody Flight flight){
        flightService.deleteFlight(flight);
        return ResponseEntity.ok(new FlightSearchResponse(null));
    }



}
