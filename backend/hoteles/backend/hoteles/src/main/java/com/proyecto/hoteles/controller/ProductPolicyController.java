package com.proyecto.hoteles.controller;
import com.proyecto.hoteles.model.ProductPolicy;
import com.proyecto.hoteles.service.ProductPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/product-policies")
public class ProductPolicyController {

    @Autowired
    private ProductPolicyService productPolicyService;

    @PostMapping("/save")
    public ResponseEntity<ProductPolicy> saveProductPolicy(@RequestBody ProductPolicy productPolicy){
        return ResponseEntity.ok(productPolicyService.saveProductPolicy(productPolicy));
    }

    @GetMapping("/list")
    public ResponseEntity<List<ProductPolicy>> listAllProductPolicies(){
        return ResponseEntity.ok(productPolicyService.listAllProductPolicies());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ProductPolicy> getProductPolicyById(@PathVariable Integer id){
        ResponseEntity<ProductPolicy> response;

        if (productPolicyService.getProductPolicyById(Long.valueOf(id))!=null){
            response = ResponseEntity.ok(productPolicyService.getProductPolicyById(Long.valueOf(id))) ;
        }else
        {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }

}
