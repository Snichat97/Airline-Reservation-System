package com.sjsu.sprintersairline.reservation;

import com.sjsu.sprintersairline.flight.Flight;
import com.sjsu.sprintersairline.flight.FlightService;
import com.sjsu.sprintersairline.flight.SeatAvailability;
import com.sjsu.sprintersairline.flight.SeatAvailabilityResponse;
import com.sjsu.sprintersairline.user.User;
import com.sjsu.sprintersairline.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    UserService userService;

    @Autowired
    FlightService flightService;

    @Autowired
    ReservationRepository reservationRepository;

    public ReservationCreateResponse createReservation(ReservationCreateRequest reservationRequest){

        Optional<User> userOptional = userService.getUser(reservationRequest.getUser());
        Optional<Flight> flightOptional= flightService.getFlight(reservationRequest.getFlight());
        SeatAvailabilityResponse seatAvailabilityResponse = flightService.checkSeatAvailability(new SeatAvailability(reservationRequest.getFlight(), reservationRequest.getSeats(), reservationRequest.getUser()));
        if(userOptional.isPresent() && flightOptional.isPresent()){
            if(seatAvailabilityResponse.getTotalCost()==-1){
                return new ReservationCreateResponse(false);
            }
            Flight flight = flightOptional.get();
            User user = userOptional.get();
            double finalCost = seatAvailabilityResponse.getTotalCost();
            double discountedCost = finalCost;
            double mileagePtsToAdd = finalCost*0.1;
            double mileagePts = user.getMileagePts();
            if(finalCost>=mileagePts){
                discountedCost -= user.getMileagePts();
                mileagePts = 0;
            }else{
                mileagePts-=finalCost;
                discountedCost = 0;
            }
            mileagePts+=mileagePtsToAdd;
            Reservation reservation = new Reservation(user, flight, reservationRequest.getSeats(), discountedCost);
            reservationRequest.setCost(finalCost);
            Reservation reservationDB = reservationRepository.insert(reservation); // change res to resreq
            user.setMileagePts(mileagePts);
            user.addReservation(reservationDB.getId());
            userService.updateUser(user);
            flight.setAvailSeats(flight.getAvailSeats()-reservationRequest.getSeats());
            flightService.updateFlight(flight);
            return new ReservationCreateResponse(reservationDB.getId(),true, user.getId(), flight.getId(), reservationRequest.getSeats(), finalCost, discountedCost);
        }else{
            return new ReservationCreateResponse(false);
        }
    }

    public List<Reservation> getPastReservations(String user){
        List<Reservation> reservations = reservationRepository.getReservations(user);
        List<Reservation> pastReservations = new ArrayList<>();
        LocalDateTime currTime = LocalDateTime.now();
        for(Reservation reservation: reservations){
            if(currTime.isAfter(reservation.getFlight().getDepartureTime())){
//                // TODO reset
//                reservation.setFlight(null);
//                reservation.setUser(null);
                pastReservations.add(reservation);
            }
        }
        return pastReservations;
    }

    public List<Reservation> getUpcomingReservations(String user){
        List<Reservation> reservations = reservationRepository.getReservations(user);
        List<Reservation> pastReservations = new ArrayList<>();
        LocalDateTime currTime = LocalDateTime.now();
        for(Reservation reservation: reservations){
            if(currTime.isBefore(reservation.getFlight().getDepartureTime())){
//                // TODO reset
//                reservation.setFlight(null);
//                reservation.setUser(null);
                pastReservations.add(reservation);
            }
        }
        return pastReservations;
    }

    public boolean deleteReservation(Reservation reservation){
        reservationRepository.delete(reservation);
        return true;
    }

    public ReservationCreateResponse updatedReservation(ReservationCreateRequest reservationRequest) {
        Optional<User> userOptional = userService.getUser(reservationRequest.getUser());
        Optional<Flight> flightOptional= flightService.getFlight(reservationRequest.getFlight());
        SeatAvailabilityResponse seatAvailabilityResponse = flightService.checkSeatAvailability(new SeatAvailability(reservationRequest.getFlight(), reservationRequest.getSeats(), reservationRequest.getUser()));
        if(userOptional.isPresent() && flightOptional.isPresent()){
            if(seatAvailabilityResponse.getTotalCost()==-1){
                return new ReservationCreateResponse(false);
            }
            Flight flight = flightOptional.get();
            User user = userOptional.get();
            double finalCost = seatAvailabilityResponse.getTotalCost();
            double discountedCost = finalCost;
            double mileagePtsToAdd = finalCost*0.1;
            double mileagePts = user.getMileagePts();
            if(finalCost>=mileagePts){
                discountedCost -= user.getMileagePts();
                mileagePts = 0;
            }else{
                mileagePts-=finalCost;
                discountedCost = 0;
            }
            mileagePts+=mileagePtsToAdd;
            Reservation reservation = new Reservation(reservationRequest.getId(), user, flight, reservationRequest.getSeats(), discountedCost);
            reservationRequest.setCost(finalCost);
            Reservation reservationDB = reservationRepository.save(reservation); // change res to resreq
            user.setMileagePts(mileagePts);
            user.addReservation(reservationDB.getId());
            userService.updateUser(user);
            flight.setAvailSeats(flight.getAvailSeats()-reservationRequest.getSeats());
            flightService.updateFlight(flight);
            return new ReservationCreateResponse(reservationDB.getId(),true, user.getId(), flight.getId(), reservationRequest.getSeats(), finalCost, discountedCost);
        }else{
            return new ReservationCreateResponse(false);
        }
    }
}
