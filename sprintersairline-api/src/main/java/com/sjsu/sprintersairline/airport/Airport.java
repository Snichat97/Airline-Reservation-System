package com.sjsu.sprintersairline.airport;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.GetMapping;

import java.math.BigInteger;
import java.util.List;

@Getter
@Setter
@ToString

@Document(collection="airport")
public class Airport {
    @Id
    private String id;
    private String name;
    private String city;
    private String code;

    public Airport(String id) {
        this.id = id;
    }

    public Airport() {
    }
}
