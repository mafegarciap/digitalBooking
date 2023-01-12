package com.proyecto.hoteles.repository;
import com.proyecto.hoteles.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.category.id = ?1")
    List<Product> findAllProductsByCategory(Long id_category);

    @Query("SELECT p FROM Product p WHERE p.city.id = ?1")
    List<Product> findAllProductsByCity(Long id_city);

    @Query(value = "SELECT p.* FROM product p WHERE p.id_product NOT IN (SELECT distinct b.id_product FROM booking b WHERE (:check_in is null OR b.check_in_day BETWEEN :check_in AND :check_out) AND (:check_out is null OR b.check_out_day  BETWEEN :check_in AND :check_out) AND (b.check_in_day >= CURDATE()));",nativeQuery = true)
    List<Product> findProductsByDate(@Param("check_in")Date checkIn, @Param("check_out")Date CheckOut);

    @Query(value = "SELECT p.* FROM product p WHERE p.id_product NOT IN (SELECT distinct b.id_product FROM booking b WHERE (:check_in is null OR b.check_in_day BETWEEN :check_in AND :check_out) AND (:check_out is null OR b.check_out_day  BETWEEN :check_in AND :check_out) AND (b.check_in_day >= CURDATE())) AND (:id_city IS NULL OR p.id_city = :id_city);", nativeQuery = true)
    List<Product> findAllProductsByCityAndDate(@Param("check_in")Date checkIn, @Param("check_out")Date CheckOut, @Param("id_city")Long id);


}