package com.sjsu.sprintersairline.flight;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;

public class SeatAvailabilityDeserializer extends JsonDeserializer<SeatAvailability> {

    public SeatAvailability deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonNode node = jp.getCodec().readTree(jp);
        String flight = node.get("flight").asText();
        int count = node.get("seatCount").asInt();
        String user = node.get("user").asText();
        return new SeatAvailability(flight,count,user);
    }
}
