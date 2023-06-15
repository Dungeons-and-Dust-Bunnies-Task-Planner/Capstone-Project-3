package com.example.capstoneprojectteam3.repositories;

import com.example.capstoneprojectteam3.models.Battle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BattleRepository extends JpaRepository<Battle, Long>{

	@Query("select b from Battle b left join fetch b.tasks where b.id = :battleId")
	Battle findByIdWithTasks(@Param("battleId") Long battleId);

	@Query("from Battle b where b.user.id = :userId")
	List<Battle> findAllByUserId(@Param("userId") Long userId);

}


