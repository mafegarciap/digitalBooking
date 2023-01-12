package com.proyecto.hoteles.service;
import com.proyecto.hoteles.model.City;
import java.util.List;
public interface CityService {


    public List<City> listAllCities();

    public City saveCity(City city);

    public City getCityById(Long id);

    public City updateCity(City city);

    public void deleteCity(Long id);



}