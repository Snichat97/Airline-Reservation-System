package com.sjsu.sprintersairline.flight;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.IntNode;
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

public class FlightSearchDeserializer extends JsonDeserializer<FlightSearch> {


    public FlightSearch deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonNode node = jp.getCodec().readTree(jp);
        LocalDateTime departureDate = null;
        ObjectId arrivalAirport = null;
        ObjectId depatureAirport = null;
        try{
            arrivalAirport = ObjectIdUtil.convertToObjectId(node.get("arrivalAirport").asText());
        }catch(Exception e){
            System.out.println("Arrival airport missing");
        }
        try{
            depatureAirport = ObjectIdUtil.convertToObjectId(node.get("departureAirport").asText());
        }catch (Exception e){
            System.out.println("Departure airport missing");
        }
        try{
            Instant instant = Instant.parse(node.get("departureDate").asText());
            departureDate = LocalDateTime.ofInstant(instant, ZoneOffset.UTC);
        }catch (Exception e){
            System.out.println("Departure date missing!");
        }
        return new FlightSearch(arrivalAirport, depatureAirport, departureDate);
    }
}
