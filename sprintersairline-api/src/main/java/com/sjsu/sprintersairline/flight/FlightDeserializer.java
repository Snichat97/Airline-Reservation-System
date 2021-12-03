package com.sjsu.sprintersairline.flight;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.IntNode;
import com.sjsu.sprintersairline.airport.Airport;
import com.sjsu.sprintersairline.util.ObjectIdUtil;
import lombok.SneakyThrows;
import org.bson.types.ObjectId;

import java.io.IOException;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

public class FlightDeserializer extends JsonDeserializer<Flight> {

    public Flight deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonNode node = jp.getCodec().readTree(jp);
        String flightNum = node.get("flightNum").asText();
        double seatCost = node.get("seatCost").asDouble();
        int availSeats = node.get("availSeats").asInt();
        int totalSeats = node.get("totalSeats").asInt();
        Instant instant = Instant.parse(node.get("departureTime").asText());
        LocalDateTime departureTime = LocalDateTime.ofInstant(instant, ZoneOffset.UTC);
        instant = Instant.parse(node.get("arrivalTime").asText());
        LocalDateTime arrivalTime = LocalDateTime.ofInstant(instant, ZoneOffset.UTC);
        Airport arrivalAirport = new Airport(node.get("arrivalAirport").asText());
        Airport departureAirport = new Airport(node.get("departureAirport").asText());
        return new Flight(flightNum, departureTime, arrivalTime, departureAirport, arrivalAirport, seatCost, totalSeats, availSeats);
    }
}

