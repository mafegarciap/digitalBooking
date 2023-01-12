package com.proyecto.hoteles.service;
import com.proyecto.hoteles.model.ProductPolicy;

import java.util.List;

public interface ProductPolicyService {

    public List<ProductPolicy> listAllProductPolicies();

    public ProductPolicy saveProductPolicy(ProductPolicy productPolicy);

    public ProductPolicy getProductPolicyById(Long id);

    public ProductPolicy updateProductPolicy(ProductPolicy productPolicy);

    public void deleteProductPolicy(Long id);
}
