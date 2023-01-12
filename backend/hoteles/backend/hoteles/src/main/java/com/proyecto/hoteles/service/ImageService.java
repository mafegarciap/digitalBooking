package com.proyecto.hoteles.service;
import com.proyecto.hoteles.model.Booking;
import com.proyecto.hoteles.model.Image;

import java.util.List;

public interface ImageService {


    public List<Image> listAllImages();

    public Image saveImage(Image image);

    public Image getImageById(Long id);

    public Image updateImage(Image image);

    public void deleteImage(Long id);

    public List<Image> findAllImagesByProduct(Long id);

}