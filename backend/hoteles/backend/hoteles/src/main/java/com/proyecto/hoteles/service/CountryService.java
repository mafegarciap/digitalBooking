package com.proyecto.hoteles.service;
import com.proyecto.hoteles.model.Country;
import java.util.List;

public interface CountryService {

    public List<Country> listAllCountries();

    public Country saveCountry(Country country);

    public Country getCountryById(Long id);

    public Country updateCountry(Country country);

    public void deleteCountry(Long id);

}
