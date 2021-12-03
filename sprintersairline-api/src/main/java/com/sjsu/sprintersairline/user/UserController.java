package com.sjsu.sprintersairline.user;

import com.sjsu.sprintersairline.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.text.html.Option;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @GetMapping("/health-check")
    public String healthCheck(){
        return "Server status: OK!";
    }

    @PostMapping("/user/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody User user) throws Exception {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
        }catch (BadCredentialsException e){
            throw new Exception("Incorrect username or password",e);
        }
        final UserDetails userDetails = userService.loadUserByUsername(user.getEmail());
        User user1 = userService.findByEmail(user.getEmail());
        final String jwt = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthenticationResponse(jwt,user1.getId()));
    }

    @PostMapping("/user/profile")
    public ResponseEntity<?> getUserProfile(@RequestBody User user){
        Optional<User> userOptional = userService.findById(user.getId());
        User userFound = userOptional.get();
        return ResponseEntity.ok(userFound);
    }

    @PostMapping("/user/create")
    public ResponseEntity<?> createUserProfile(@RequestBody User user){
        User userCreated = userService.createUser(user);
        return ResponseEntity.ok(userCreated);

    }


}
