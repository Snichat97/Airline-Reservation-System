package com.sjsu.sprintersairline.airport;


import com.sjsu.sprintersairline.flight.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface AirportRepository extends MongoRepository<Airport, Integer> {

}
