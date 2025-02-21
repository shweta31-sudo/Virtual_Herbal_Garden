package com.herbal.project.model;
import jakarta.persistence.*;
@Entity
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private String commonName;
    private String imageUrl;
    private String disease;
    private String scientificName;
    private String family;
    private String habitat;
    private String medicinalUses;
    private String cultivation;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCommonName() { return commonName; }
    public void setCommonName(String commonName) { this.commonName = commonName; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getDisease() { return disease; }
    public void setDisease(String disease) { this.disease = disease; }
    public String getScientificName() { return scientificName; }
    public void setScientificName(String scientificName) { this.scientificName = scientificName; }
	public String getFamily() {
		return family;
	}
	public void setFamily(String family) {
		this.family = family;
	}
	public String getHabitat() {
		return habitat;
	}
	public void setHabitat(String habitat) {
		this.habitat = habitat;
	}
	public String getMedicinalUses() {
		return medicinalUses;
	}
	public void setMedicinalUses(String medicinalUses) {
		this.medicinalUses = medicinalUses;
	}
	public String getCultivation() {
		return cultivation;
	}
	public void setCultivation(String cultivation) {
		this.cultivation = cultivation;
	}
}
