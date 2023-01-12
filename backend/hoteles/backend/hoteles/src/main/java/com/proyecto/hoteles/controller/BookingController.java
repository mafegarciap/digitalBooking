package com.proyecto.hoteles.controller;

import com.proyecto.hoteles.model.Booking;
import com.proyecto.hoteles.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/save")
    public ResponseEntity<Booking> saveBooking(@RequestBody Booking booking){
        return ResponseEntity.ok(bookingService.saveBooking(booking));
    }

    @GetMapping("/list")
    @PermitAll
    public ResponseEntity<List<Booking>> listAllBookings(){
        return ResponseEntity.ok(bookingService.listAllBookings());
    }

    @GetMapping("/get/{id}")
    @PermitAll
    public ResponseEntity<Booking> getBookingById(@PathVariable Integer id){
        ResponseEntity<Booking> response;

        if (bookingService.getBookingById(Long.valueOf(id))!=null){
            response = ResponseEntity.ok(bookingService.getBookingById(Long.valueOf(id))) ;
        }else
        {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }

    @GetMapping("/product/{id}")
    @PermitAll
    public ResponseEntity<List<Booking>> listAllBookingsByProduct(@PathVariable Long id){
        return ResponseEntity.ok(bookingService.findAllBookingsByProduct(id));
    }

    @GetMapping("/user/{id}")
    @PermitAll
    public ResponseEntity<List<Booking>> listAllBookingsByUser(@PathVariable Long id){
        return ResponseEntity.ok(bookingService.findAllBookingsByUser(id));
    }

}
