package com.herbal.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.herbal.project.model.Plant;

import java.util.List;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {

    // Search by Common Name
    List<Plant> findByCommonNameContainingIgnoreCase(String commonName);

    // Search by Disease
    List<Plant> findByDiseaseContainingIgnoreCase(String disease);
    List<Plant> findByFamilyContainingIgnoreCase(String family);
    
//    List<Plant> findByNameContainingIgnoreCase(String name);
//    List<Plant> findByDiseaseContainingIgnoreCase(String disease);

}
