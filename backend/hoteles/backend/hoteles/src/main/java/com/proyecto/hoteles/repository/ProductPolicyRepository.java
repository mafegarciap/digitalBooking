package com.proyecto.hoteles.repository;
import com.proyecto.hoteles.model.ProductPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductPolicyRepository extends JpaRepository<ProductPolicy, Long> {
}
