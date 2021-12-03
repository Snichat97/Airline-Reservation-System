package com.sjsu.sprintersairline.flight;

import java.util.List;

public interface FlightTemplateRepository {
        List<Flight> searchFlights(FlightSearch flightSearch);
}
