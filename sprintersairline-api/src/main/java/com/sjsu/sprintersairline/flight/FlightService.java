package com.sjsu.sprintersairline.flight;

import com.sjsu.sprintersairline.user.User;
import com.sjsu.sprintersairline.user.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    @Autowired
    FlightRepository flightRepository;

    @Autowired
    UserRepository userRepository;

    public List<Flight> searchFlights(FlightSearch flightSearch){
        List<Flight> flights = flightRepository.searchFlights(flightSearch);
        return flights;
    }

    public SeatAvailabilityResponse checkSeatAvailability(SeatAvailability seatAvailability){
        Optional<Flight> flightOptional = flightRepository.findById(seatAvailability.getFlight());
        Optional<User> userOptional= userRepository.findById(seatAvailability.getUser());
        User user = userOptional.get();
        Flight flight = flightOptional.get();
        int bookSeats = seatAvailability.getSeatCount();
        int availSeats = flight.getAvailSeats();

        if(bookSeats<=availSeats){
            return new SeatAvailabilityResponse(bookSeats,bookSeats*flight.getSeatCost()*1.0,user.getMileagePts());
        }
        return new SeatAvailabilityResponse(availSeats,-1.0, user.getMileagePts());
    }

    public Optional<Flight> getFlight (String flight){
        return flightRepository.findById(flight);
    }
    public Flight updateFlight(Flight flight){
        return flightRepository.save(flight);
    }

    public List<Flight> getAllFlights(){
        return flightRepository.findAll();
    }

    public Flight createFlight(Flight flight){
        return flightRepository.insert(flight);
    }

    public void deleteFlight(Flight flight) {
        flightRepository.delete(flight);
    }
}
