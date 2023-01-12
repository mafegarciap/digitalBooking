package com.proyecto.hoteles.repository;
import com.proyecto.hoteles.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    @Query("SELECT i FROM Image i WHERE i.product.id = ?1")
    List<Image> findAllImagesByProduct(Long id_product);

}
