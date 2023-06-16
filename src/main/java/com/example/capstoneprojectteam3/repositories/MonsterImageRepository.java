package com.example.capstoneprojectteam3.repositories;

import com.example.capstoneprojectteam3.models.MonsterImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MonsterImageRepository extends JpaRepository<MonsterImage, Long> {

    @Query("from MonsterImage m where m.monster_stage = :stage")
    List<MonsterImage> findAllByMonster_stage(@Param("stage") Long stage);
}
