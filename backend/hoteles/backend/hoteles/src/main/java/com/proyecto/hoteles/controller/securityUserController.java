package com.proyecto.hoteles.controller;


import com.proyecto.hoteles.jwt.model.AuthenticationRequest;
import com.proyecto.hoteles.jwt.model.AuthenticationResponse;
import com.proyecto.hoteles.jwt.security.JwtUtil;
import com.proyecto.hoteles.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
public class securityUserController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;


    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect credentials", e);
        }
        //final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(authentication);

        return ResponseEntity.ok(new AuthenticationResponse((jwt)));
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String hello() {
        return "Felicitaciones pudiste ingresar dentro de nuestra app";
    }
}
