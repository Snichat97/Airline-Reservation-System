package com.sjsu.sprintersairline.reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @PostMapping("/reservation/create")
    private ResponseEntity<?> createReservation(@RequestBody ReservationCreateRequest reservationRequest){
        ReservationCreateResponse response = reservationService.createReservation(reservationRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reservation/delete")
    private ResponseEntity<?> deleteReservation(@RequestBody Reservation reservation){
        boolean success = reservationService.deleteReservation(reservation);
        return ResponseEntity.ok(new ReservationDelResponse(true));
    }


    @PostMapping("/reservation/edit")
    private ResponseEntity<?> updateReservations(@RequestBody ReservationCreateRequest reservationRequest){
        ReservationCreateResponse response = reservationService.updatedReservation(reservationRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reservation/past")
    private ResponseEntity<?> getPastReservations(@RequestBody ReservationGetReq reservationGetRequest){
        List<Reservation> pastReservations = reservationService.getPastReservations(reservationGetRequest.getUser());
        ReservationResponse response = new ReservationResponse(pastReservations);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reservation/upcoming")
    private ResponseEntity<?> getUpcomingReservations(@RequestBody ReservationGetReq reservationGetRequest){
        List<Reservation> pastReservations = reservationService.getUpcomingReservations(reservationGetRequest.getUser());
        ReservationResponse response = new ReservationResponse(pastReservations);
        return ResponseEntity.ok(response);
    }
}
