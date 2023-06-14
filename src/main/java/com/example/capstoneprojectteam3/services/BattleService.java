package com.example.capstoneprojectteam3.services;

import com.example.capstoneprojectteam3.models.Battle;
import com.example.capstoneprojectteam3.models.Task;
import com.example.capstoneprojectteam3.repositories.BattleRepository;
import com.example.capstoneprojectteam3.repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BattleService {

    private final BattleRepository battleRepository;
    private final TaskRepository taskRepository;

    public BattleService(BattleRepository battleRepository, TaskRepository taskRepository) {
        this.battleRepository = battleRepository;
        this.taskRepository = taskRepository;
    }

    public List<Battle> getBattlesByUserId(Long userId) {
        return battleRepository.findAllByUserId(userId);
    }

    public void updateBattleStatus(Long battleId, String status) {
        Battle battle = battleRepository.findById(battleId).orElse(null);
        if (battle != null) {
            int statusValue = battle.getStatus().getValue();
            battleRepository.save(battle);
        }
    }

     public void createBattle(String title) {
    Battle battle = new Battle();
    battle.setTitle(title);
    battle.setStatus(Battle.BattleStatus.inactive); // SET THE INITIAL VALUE TO 0 ('INACTIVE')
    battleRepository.save(battle);
  }

    public void createTask(Long battleId, String taskBody) {
        // Implement the logic to create a new task
        // You can use the taskRepository to save the new task
        Battle battle = battleRepository.findById(battleId).orElse(null);
        if (battle != null) {
            Task task = new Task();
            task.setBattle(battle);
            task.setTaskBody(taskBody);
            taskRepository.save(task);
        }
    }
}
