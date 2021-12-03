package com.sjsu.sprintersairline.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString

// import java.util.Date;
@Document(collection="user")
public class User implements Serializable {
    @Id
    private String id;
    private String name;
    private Date dob;
    private String email;
    private String password;
    private String role;
    private double mileagePts;
    private List<String> reservations;

    public User(String id){
        this.id = id;
    }
    public User(){

    }


    public List<String> getReservations() {
        return reservations;
    }

    public void setReservations(List<String> reservations) {
        this.reservations = reservations;
    }

    public void addReservation(String reservation){
        if(this.getReservations()==null){
            this.setReservations(new ArrayList<String>());
        }
        reservations.add(reservation);
    }
}
