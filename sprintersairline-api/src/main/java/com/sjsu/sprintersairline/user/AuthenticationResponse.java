package com.sjsu.sprintersairline.user;


import java.io.Serializable;

public class AuthenticationResponse implements Serializable {
    private final String jwt;
    private String user;

    public AuthenticationResponse(String jwt, String user) {
        this.jwt = jwt;
        this.user = user;
    }

    public String getJwt() {
        return jwt;
    }

    public String getUser() {
        return user;
    }
}
