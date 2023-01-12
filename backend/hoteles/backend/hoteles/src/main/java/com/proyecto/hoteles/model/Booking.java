package com.proyecto.hoteles.model;
import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_booking")
    private Long idBooking;

    @Column(name = "check_in_day", nullable = false, unique = true)
    private Date checkInDay;

    @Column(name = "check_out_day", nullable = false, unique = true)
    private Date checkOutDay;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_product")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_user")
    private User user;


    public Booking(){

    }

    public Booking(Long idBooking, Date checkInDay, Date checkOutDay, Product product, User user) {
        this.idBooking = idBooking;
        this.checkInDay = checkInDay;
        this.checkOutDay = checkOutDay;
        this.product = product;
        this.user = user;
    }

    public Booking(Date checkInDay, Date checkOutDay, Product product, User user) {
        this.checkInDay = checkInDay;
        this.checkOutDay = checkOutDay;
        this.product = product;
        this.user = user;
    }

    public Long getIdBooking() {
        return idBooking;
    }

    public void setIdBooking(Long idBooking) {
        this.idBooking = idBooking;
    }

    public Date getCheckInDay() {
        return checkInDay;
    }

    public void setCheckInDay(Date checkInDay) {
        this.checkInDay = checkInDay;
    }

    public Date getCheckOutDay() {
        return checkOutDay;
    }

    public void setCheckOutDay(Date checkOutDay) {
        this.checkOutDay = checkOutDay;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
