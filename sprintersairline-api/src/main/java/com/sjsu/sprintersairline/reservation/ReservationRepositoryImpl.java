package com.sjsu.sprintersairline.reservation;

import com.sjsu.sprintersairline.flight.Flight;
import com.sjsu.sprintersairline.util.ObjectIdUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.time.LocalDateTime;
import java.util.List;

public class ReservationRepositoryImpl implements ReservationTemplateRepository{
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Reservation> getReservations(String userId){
        LocalDateTime currTime = LocalDateTime.now();
        //Criteria criteria = Criteria.where("flight.departureTime").lt(currTime);
        Criteria criteria1 = Criteria.where("user.$id").is(ObjectIdUtil.convertToObjectId(userId));
        AggregationOperation match1 = Aggregation.match(criteria1);
        AggregationOperation lookup1 = Aggregation.lookup("flight", "flight", "_id", "flightExp");
        //Criteria criteria2 = Criteria.where("flightExp.departureTime").lt(currTime);
        //AggregationOperation match2 = Aggregation.match(criteria2);
        Aggregation agr = Aggregation.newAggregation(match1, lookup1);
        AggregationResults<Reservation> result = mongoTemplate.aggregate(agr,"reservation", Reservation.class);
        return result.getMappedResults();
    }
}
