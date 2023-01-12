package com.proyecto.hoteles.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_category")
    private Long idCategory;

    @Column(name = "category_title", nullable = false, unique = true)
    private String categoryTitle;

    @Column(name = "category_description", nullable = false, unique = true)
    private String categoryDescription;

    @Column(name = "category_image", nullable = false, unique = true)
    private String categoryImage;

    @JsonIgnore
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Product> products =new HashSet<>();

    public Category() {
    }

    public Category(Long idCategory, String categoryTitle, String categoryDescription, String categoryImage, Set<Product> products) {
        this.idCategory = idCategory;
        this.categoryTitle = categoryTitle;
        this.categoryDescription = categoryDescription;
        this.categoryImage = categoryImage;
        this.products = products;
    }

    public Category(String categoryTitle, String categoryDescription, String categoryImage, Set<Product> products) {
        this.categoryTitle = categoryTitle;
        this.categoryDescription = categoryDescription;
        this.categoryImage = categoryImage;
        this.products = products;
    }

    public Long getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(Long idCategory) {
        this.idCategory = idCategory;
    }

    public String getCategoryTitle() {
        return categoryTitle;
    }

    public void setCategoryTitle(String categoryTitle) {
        this.categoryTitle = categoryTitle;
    }

    public String getCategoryDescription() {
        return categoryDescription;
    }

    public void setCategoryDescription(String categoryDescription) {
        this.categoryDescription = categoryDescription;
    }

    public String getCategoryImage() {
        return categoryImage;
    }

    public void setCategoryImage(String categoryImage) {
        this.categoryImage = categoryImage;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}
