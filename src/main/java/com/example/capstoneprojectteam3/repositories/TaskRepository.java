package com.example.capstoneprojectteam3.repositories;

import com.example.capstoneprojectteam3.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("from Task t where t.battle.id = :battleId")
    List<Task> findAllByBattleId(@Param("battleId") Long battleId);
}
