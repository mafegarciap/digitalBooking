package com.proyecto.hoteles.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;

@Entity
@Table(name = "image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_image")
    private Long idImage;

    @Column(name = "image_title", nullable = false, unique = true)
    private String imageTitle;

    @Column(name = "image_url", nullable = false, unique = true)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_product")
    private Product product;

    public Image(){

    }

    public Image(Long idImage, String imageTitle, String imageUrl, Product product) {
        this.idImage = idImage;
        this.imageTitle = imageTitle;
        this.imageUrl = imageUrl;
        this.product = product;
    }

    public Image(String imageTitle, String imageUrl, Product product) {
        this.imageTitle = imageTitle;
        this.imageUrl = imageUrl;
        this.product = product;
    }

    public Long getIdImage() {
        return idImage;
    }

    public void setIdImage(Long idImage) {
        this.idImage = idImage;
    }

    public String getImageTitle() {
        return imageTitle;
    }

    public void setImageTitle(String imageTitle) {
        this.imageTitle = imageTitle;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
