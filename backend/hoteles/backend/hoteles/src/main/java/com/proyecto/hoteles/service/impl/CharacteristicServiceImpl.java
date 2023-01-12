package com.proyecto.hoteles.service.impl;
import com.proyecto.hoteles.model.Characteristic;
import com.proyecto.hoteles.repository.CharacteristicRepository;
import com.proyecto.hoteles.service.CharacteristicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharacteristicServiceImpl implements CharacteristicService {

    @Autowired
    public CharacteristicRepository characteristicRepository;

    @Override
    public List<Characteristic> listAllCharacteristic() {
        return characteristicRepository.findAll();
    }

    @Override
    public Characteristic saveCharacteristic(Characteristic characteristic) {
        return characteristicRepository.save(characteristic);
    }

    @Override
    public Characteristic getCharacteristicById(Long id) {
        return characteristicRepository.findById(id).get();
    }

    @Override
    public Characteristic updateCharacteristic(Characteristic characteristic) {
        return characteristicRepository.save(characteristic);
    }

    @Override
    public void deleteCharacteristic(Long id) {
        characteristicRepository.deleteById(id);
    }

}
