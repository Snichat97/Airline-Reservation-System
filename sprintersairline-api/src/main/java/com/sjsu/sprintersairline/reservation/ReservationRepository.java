package com.sjsu.sprintersairline.reservation;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReservationRepository extends MongoRepository<Reservation, String>, ReservationTemplateRepository {


}
