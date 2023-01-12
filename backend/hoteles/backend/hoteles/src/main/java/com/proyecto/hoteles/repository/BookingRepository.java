package com.proyecto.hoteles.repository;
import com.proyecto.hoteles.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT b FROM Booking b WHERE b.product.id = ?1")
    List<Booking> findAllBookingsByProduct(Long id_product);

    @Query("SELECT b FROM Booking b WHERE b.user.id = ?1")
    List<Booking> findAllBookingsByUser(Long id_user);

}