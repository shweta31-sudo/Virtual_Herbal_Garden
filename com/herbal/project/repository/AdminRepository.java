package com.herbal.project.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.herbal.project.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);  // Check if admin exists
    Optional<Admin> findByUsernameAndPassword(String username, String password);
}


