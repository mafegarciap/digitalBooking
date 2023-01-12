package com.proyecto.hoteles.service;
import com.proyecto.hoteles.model.Product;

import java.util.Date;
import java.util.List;

public interface ProductService {


    public List<Product> listAllProducts();

    public List<Product> listRandomProducts();

    public Product saveProduct(Product product);

    public Product getProductById(Long id);

    public Product updateProduct(Product product);

    public void deleteProduct(Long id);

    public List<Product> findAllProductsByCategory(Long id);

    public List<Product> findAllProductsByCity(Long id);

    public List<Product> findProductsByDate(Date checkIn, Date checkOut);

    public List<Product> findAllProductsByCityAndDate(Date checkIn, Date CheckOut, Long id);

}