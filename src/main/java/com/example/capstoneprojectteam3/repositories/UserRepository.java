package com.example.capstoneprojectteam3.repositories;

import com.example.capstoneprojectteam3.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserById(long id);
    User findUserByUsername(String username);
}
