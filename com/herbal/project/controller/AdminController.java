package com.herbal.project.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.herbal.project.model.Admin;
import com.herbal.project.model.Plant;
import com.herbal.project.repository.AdminRepository;
import com.herbal.project.service.PlantService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PlantService plantService;

    @PostMapping("/register_admin")
    public ResponseEntity<String> registerAdmin(@RequestBody Admin admin) {
        Optional<Admin> existingAdmin = adminRepository.findByUsername(admin.getUsername());
        
        if (existingAdmin.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Admin already registered");
        }

        adminRepository.save(admin);
        return ResponseEntity.ok("Admin registered successfully");
    }


    @PostMapping("/login_user")
    public ResponseEntity<String> loginUser(@RequestBody Admin admin) {
        Optional<Admin> foundAdmin = adminRepository.findByUsernameAndPassword(admin.getUsername(), admin.getPassword());
        if (foundAdmin.isPresent()) {
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/add_plant")
    public ResponseEntity<Plant> addPlant(@RequestBody Plant plant) {
        return ResponseEntity.ok(plantService.addPlant(plant));
    }

    @DeleteMapping("/delete_plant/{id}")
    public ResponseEntity<String> deletePlant(@PathVariable Long id) {
        if (plantService.getAllPlants().stream().anyMatch(p -> p.getId().equals(id))) {
            plantService.deletePlant(id);
            return ResponseEntity.ok("Plant deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Plant not found");
    }

    @PutMapping("/update_plant/{id}")
    public ResponseEntity<Plant> updatePlant(@PathVariable Long id, @RequestBody Plant updatedPlant) {
        return plantService.updatePlant(id, updatedPlant)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping("/get_allplants")
    public ResponseEntity<List<Plant>> getAllPlants() {
        return ResponseEntity.ok(plantService.getAllPlants());
    }

    
    @GetMapping("/get_plant/{id}")
    public ResponseEntity<Plant> getPlantById(@PathVariable Long id) {
        Optional<Plant> plant = plantService.getPlantById(id);
        return plant.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
    
    @GetMapping("/search")
    public List<Plant> searchPlants(@RequestParam(required = false) String name,
    								@RequestParam(required = false) String family, 
                                    @RequestParam(required = false) String disease) {
        return plantService.searchPlants(name,family , disease);
    }
}
