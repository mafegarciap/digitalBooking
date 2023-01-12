package com.proyecto.hoteles.controller;
import com.proyecto.hoteles.model.Country;
import com.proyecto.hoteles.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/countries")
public class CountryController {

    @Autowired
    private CountryService countryService;

    @PostMapping("/save")
    public ResponseEntity<Country> saveCountry(@RequestBody Country country){
        return ResponseEntity.ok(countryService.saveCountry(country));
    }

    @GetMapping("/list")
    public ResponseEntity<List<Country>> listAllCountries(){
        return ResponseEntity.ok(countryService.listAllCountries());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Country> getCountryById(@PathVariable Integer id){
        ResponseEntity<Country> response;

        if (countryService.getCountryById(Long.valueOf(id))!=null){
            response = ResponseEntity.ok(countryService.getCountryById(Long.valueOf(id))) ;
        }else
        {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }
}
