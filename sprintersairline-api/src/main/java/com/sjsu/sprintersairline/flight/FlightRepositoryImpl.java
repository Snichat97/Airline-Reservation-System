package com.sjsu.sprintersairline.flight;

import org.apache.tomcat.jni.Local;
import org.bson.codecs.jsr310.LocalDateCodec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Queue;

import com.sjsu.sprintersairline.util.ObjectIdUtil;

public class FlightRepositoryImpl implements FlightTemplateRepository{
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Flight> searchFlights(FlightSearch flightSearch) {
        // TODO lookup list to object
        Criteria criteria1 = Criteria.where("departureAirport.$id").is(flightSearch.getDepartureAirport());
        Criteria criteria2 = Criteria.where("arrivalAirport.$id").is(flightSearch.getArrivalAirport());
        LocalDateTime departureDate = flightSearch.getDepartureDate();
        LocalDateTime startTime = departureDate.toLocalDate().atTime(LocalTime.MIDNIGHT);
        LocalDateTime endTime = departureDate.toLocalDate().atTime(LocalTime.MAX);
        Criteria criteria3 = Criteria.where("departureTime").gte(startTime).lte(endTime);
        AggregationOperation match1 = Aggregation.match(criteria1.andOperator(criteria2));
        AggregationOperation match2 = Aggregation.match(criteria3);
        AggregationOperation lookup1 = Aggregation.lookup("airport", "arrivalAirport", "_id", "arrivalAirportVal");
        AggregationOperation lookup2 = Aggregation.lookup("airport", "departureAirport", "_id", "departureAirportVal");
        Aggregation agr = Aggregation.newAggregation(match1, match2, lookup1, lookup2);
        AggregationResults<Flight> result = mongoTemplate.aggregate(agr,"flight", Flight.class);
        return result.getMappedResults();
    }

//    @Override
//    public List<Flight> searchFlights(FlightSearch flightSearch) {
//        Query query = new Query();
//        query.addCriteria(Criteria.where("departureAirport").is(flightSearch.getDepartureAirport()));
//        query.addCriteria(Criteria.where("arrivalAirport").is(flightSearch.getArrivalAirport()));
//        // TODO compare times and get flight results
//        System.out.println(query.getQueryObject().toJson());
//        return mongoTemplate.find(query, Flight.class);
//    }


}
