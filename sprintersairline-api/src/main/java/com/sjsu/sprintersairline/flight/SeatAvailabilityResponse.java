package com.sjsu.sprintersairline.flight;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString

public class SeatAvailabilityResponse{

    int seatsCount;
    double totalCost;
    double mileagePts;

    public SeatAvailabilityResponse(int seatsCount, double totalCost, double mileagePts) {
        this.seatsCount = seatsCount;
        this.totalCost = totalCost;
        this.mileagePts = mileagePts;
    }
}
