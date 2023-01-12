package com.proyecto.hoteles.service.impl;
import com.proyecto.hoteles.model.Product;
import com.proyecto.hoteles.repository.ProductRepository;
import com.proyecto.hoteles.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    public ProductRepository productRepository;

    @Override
    public List<Product> listAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> listRandomProducts() {

        Random rand = new Random();
        List<Product> givenList = productRepository.findAll();
        int numberOfElements = 8;

        List<Product> randomProducts = new ArrayList<>();

        for (int i=0; i< numberOfElements; i++){
            int randomIndex = rand.nextInt(givenList.size());
            Product randomElement = givenList.get(randomIndex);
            givenList.remove(randomIndex);

            randomProducts.add(randomElement);
        }

        return randomProducts;
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).get();
    }

    @Override
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> findAllProductsByCategory(Long id) {
        return productRepository.findAllProductsByCategory(id);
    }

    @Override
    public List<Product> findAllProductsByCity(Long id) {
        return productRepository.findAllProductsByCity(id);
    }

    @Override
    public List<Product> findProductsByDate(Date checkIn, Date checkOut){
        return productRepository.findProductsByDate(checkIn, checkOut);
    }

    @Override
    public List<Product> findAllProductsByCityAndDate(Date checkIn, Date checkOut, Long id) {
        return productRepository.findAllProductsByCityAndDate(checkIn, checkOut, id);
    }
}
