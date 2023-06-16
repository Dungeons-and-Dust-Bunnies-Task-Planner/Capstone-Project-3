package com.example.capstoneprojectteam3.repositories;

import com.example.capstoneprojectteam3.models.Monster;
import com.example.capstoneprojectteam3.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MonsterRepository extends JpaRepository<Monster, Long>{
	Monster findMonsterById(Long id);

	@Query("from Monster m where m.id = :monsterId")
	List<Monster> findAllByMonsterId(@Param("monsterId") Long monsterId);

	@Query("SELECT MAX(m.id) FROM Monster m")
	Long getMaxMonsterId();
}
