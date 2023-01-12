package com.proyecto.hoteles.service.impl;

import com.proyecto.hoteles.model.ProductPolicy;
import com.proyecto.hoteles.repository.ProductPolicyRepository;
import com.proyecto.hoteles.service.ProductPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductPolicyServiceImpl implements ProductPolicyService {

    @Autowired
    public ProductPolicyRepository productPolicyRepository;

    @Override
    public List<ProductPolicy> listAllProductPolicies() {
        return productPolicyRepository.findAll();
    }

    @Override
    public ProductPolicy saveProductPolicy(ProductPolicy productPolicy) {
        return productPolicyRepository.save(productPolicy);
    }

    @Override
    public ProductPolicy getProductPolicyById(Long id) {
        return productPolicyRepository.findById(id).get();
    }

    @Override
    public ProductPolicy updateProductPolicy(ProductPolicy productPolicy) {
        return productPolicyRepository.save(productPolicy);
    }

    @Override
    public void deleteProductPolicy(Long id) {
        productPolicyRepository.deleteById(id);
    }
}
