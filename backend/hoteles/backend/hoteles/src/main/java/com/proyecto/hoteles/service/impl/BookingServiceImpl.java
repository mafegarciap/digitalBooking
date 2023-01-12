package com.proyecto.hoteles.service.impl;
import com.proyecto.hoteles.model.Booking;
import com.proyecto.hoteles.repository.BookingRepository;
import com.proyecto.hoteles.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    public BookingRepository bookingRepository;

    @Override
    public List<Booking> listAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).get();
    }

    @Override
    public Booking updateBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    @Override
    public List<Booking> findAllBookingsByProduct(Long id) {
        return bookingRepository.findAllBookingsByProduct(id);
    }

    @Override
    public List<Booking> findAllBookingsByUser(Long id) {
        return bookingRepository.findAllBookingsByUser(id);
    }
}
