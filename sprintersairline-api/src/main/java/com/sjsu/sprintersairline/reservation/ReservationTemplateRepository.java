package com.sjsu.sprintersairline.reservation;

import java.util.List;

public interface ReservationTemplateRepository {
    public List<Reservation> getReservations(String userId);
}
