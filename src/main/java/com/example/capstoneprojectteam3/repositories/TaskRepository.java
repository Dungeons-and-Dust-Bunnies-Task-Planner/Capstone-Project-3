package com.example.capstoneprojectteam3.repositories;

import com.example.capstoneprojectteam3.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
