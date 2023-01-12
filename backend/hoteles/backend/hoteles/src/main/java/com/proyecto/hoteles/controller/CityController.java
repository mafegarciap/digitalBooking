package com.proyecto.hoteles.controller;
import com.proyecto.hoteles.model.City;
import com.proyecto.hoteles.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/cities")
public class CityController {

    @Autowired
    private CityService cityService;

    @PostMapping("/save")
    public ResponseEntity<City> saveCity(@RequestBody City city){
        return ResponseEntity.ok(cityService.saveCity(city));
    }

    @GetMapping("/list")
    public ResponseEntity<List<City>> listAllCities(){
        return ResponseEntity.ok(cityService.listAllCities());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<City> getCityById(@PathVariable Integer id){
        ResponseEntity<City> response;

        if (cityService.getCityById(Long.valueOf(id))!=null){
            response = ResponseEntity.ok(cityService.getCityById(Long.valueOf(id))) ;
        }else
        {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }

}
