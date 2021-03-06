package com.sjsu.sprintersairline.user;


import com.sjsu.sprintersairline.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}
