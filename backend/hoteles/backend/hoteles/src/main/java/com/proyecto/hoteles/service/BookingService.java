package com.proyecto.hoteles.service;
import com.proyecto.hoteles.model.Booking;
import java.util.List;

public interface BookingService {

    public List<Booking> listAllBookings();

    public Booking saveBooking(Booking booking);

    public Booking getBookingById(Long id);

    public Booking updateBooking(Booking booking);

    public void deleteBooking(Long id);

    public List<Booking> findAllBookingsByProduct(Long id);

    public List<Booking> findAllBookingsByUser(Long id);
}
