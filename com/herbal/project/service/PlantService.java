package com.herbal.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.herbal.project.model.Plant;
import com.herbal.project.repository.PlantRepository;

@Service
public class PlantService {
    
    @Autowired
    private PlantRepository plantRepository;

    public Plant addPlant(Plant plant) {
        return plantRepository.save(plant);
    }

    public void deletePlant(Long id) {
        plantRepository.deleteById(id);
    }

    public Optional<Plant> updatePlant(Long id, Plant updatedPlant) {
        return plantRepository.findById(id).map(plant -> {
            plant.setCommonName(updatedPlant.getCommonName());
            plant.setDescription(updatedPlant.getDescription());
            plant.setImageUrl(updatedPlant.getImageUrl());
            plant.setScientificName(updatedPlant.getScientificName());
            plant.setDisease(updatedPlant.getDisease());
            plant.setFamily(updatedPlant.getFamily());
            plant.setHabitat(updatedPlant.getHabitat());
            plant.setMedicinalUses(updatedPlant.getMedicinalUses());
            plant.setCultivation(updatedPlant.getCultivation());
            return plantRepository.save(plant);
        });
    }

    public List<Plant> getAllPlants() {
        return plantRepository.findAll();
    }

    // New method: Get plant by ID
    public Optional<Plant> getPlantById(Long id) {
        return plantRepository.findById(id);
    }
    
    public List<Plant> searchPlants(String commonName, String disease, String family) {
        if (commonName != null && !commonName.isEmpty()) {
            return plantRepository.findByCommonNameContainingIgnoreCase(commonName);
        } else if (disease != null && !disease.isEmpty()) {
            return plantRepository.findByDiseaseContainingIgnoreCase(disease);
        }
        else if (family != null && !family.isEmpty()) {
            return plantRepository.findByFamilyContainingIgnoreCase(family);
        }
        return plantRepository.findAll();
    }
}
