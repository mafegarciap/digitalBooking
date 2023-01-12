package com.proyecto.hoteles.model;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product")
    private Long idProduct;

    @Column(name = "product_title", nullable = false, unique = true)
    private String productTitle;

    @Column(name = "product_description", nullable = false, unique = true)
    private String productDescription;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_category")
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_city")
    private City city;

    //Cambios agregados para resolver el tema de la tabla intermedia
//    @OneToMany(mappedBy = "product")
//    Set<ProductCharacteristic> productCharacteristics;

    @ManyToMany(cascade={CascadeType.MERGE})
    @JoinTable(name = "product_has_characteristic", joinColumns = @JoinColumn(name="id_product"), inverseJoinColumns = @JoinColumn(name = "id_characteristic"))
    private List<Characteristic> characteristics;


    public Product() {
    }

    //Recordar modificar constructores, getters y setters si se necesita si modificamos los atributos


    public Product(Long idProduct, String productTitle, String productDescription, Category category, City city, List<Characteristic> characteristics) {
        this.idProduct = idProduct;
        this.productTitle = productTitle;
        this.productDescription = productDescription;
        this.category = category;
        this.city = city;
        this.characteristics = characteristics;
    }

    public Product(String productTitle, String productDescription, Category category, City city, List<Characteristic> characteristics) {
        this.productTitle = productTitle;
        this.productDescription = productDescription;
        this.category = category;
        this.city = city;
        this.characteristics = characteristics;
    }

    public Long getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Long idProduct) {
        this.idProduct = idProduct;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public List<Characteristic> getCharacteristics() {
        return characteristics;
    }

    public void setCharacteristics(List<Characteristic> characteristics) {
        this.characteristics = characteristics;
    }
}
