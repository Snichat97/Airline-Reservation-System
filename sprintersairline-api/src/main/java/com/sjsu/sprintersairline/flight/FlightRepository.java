package com.sjsu.sprintersairline.flight;


import com.sjsu.sprintersairline.flight.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface FlightRepository extends MongoRepository<Flight, String>,FlightTemplateRepository {

}
