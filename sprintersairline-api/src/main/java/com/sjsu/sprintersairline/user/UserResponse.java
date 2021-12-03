package com.sjsu.sprintersairline.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString

public class UserResponse implements Serializable {
    private String id;
    private String name;
    private Date dob;
    private String email;
    private String password;
    private String role;
    private double mileagePts;
    private List<String> reservations;

}
