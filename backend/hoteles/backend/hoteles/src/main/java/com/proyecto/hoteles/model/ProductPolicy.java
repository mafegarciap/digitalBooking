package com.proyecto.hoteles.model;
import javax.persistence.*;

@Entity
@Table(name = "product_has_policy")
public class ProductPolicy {

    @Id
//    @SequenceGenerator(name = "id_product_has_policy",sequenceName = "id_product_has_policy",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "id_product_has_policy")
    private Long idProductPolicy;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_product")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_policy")
    private Policy policy;

    @Column(name = "has_it", nullable = false, unique = true)
    private String hasIt;

    public ProductPolicy(){

    }

    public ProductPolicy(Long idProductPolicy, Product product, Policy policy, String hasIt) {
        this.idProductPolicy = idProductPolicy;
        this.product = product;
        this.policy = policy;
        this.hasIt = hasIt;
    }

    public ProductPolicy(Product product, Policy policy, String hasIt) {
        this.product = product;
        this.policy = policy;
        this.hasIt = hasIt;
    }

    public Long getIdProductPolicy() {
        return idProductPolicy;
    }

    public void setIdProductPolicy(Long idProductPolicy) {
        this.idProductPolicy = idProductPolicy;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Policy getPolicy() {
        return policy;
    }

    public void setPolicy(Policy policy) {
        this.policy = policy;
    }

    public String getHasIt() {
        return hasIt;
    }

    public void setHasIt(String hasIt) {
        this.hasIt = hasIt;
    }
}
