package com.example.capstoneprojectteam3.repositories;

import com.example.capstoneprojectteam3.models.Monster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonsterRepository extends JpaRepository<Monster, Long> {
    Monster findMonsterById(Long id);
}
