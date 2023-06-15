package com.example.capstoneprojectteam3.services;

import com.example.capstoneprojectteam3.models.Battle;
import com.example.capstoneprojectteam3.models.Task;
import com.example.capstoneprojectteam3.repositories.BattleRepository;
import com.example.capstoneprojectteam3.repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BattleService{

	private final BattleRepository battlesDao;
	private final TaskRepository tasksDao;

	public BattleService(BattleRepository battlesDao, TaskRepository tasksDao){
		this.battlesDao = battlesDao;
		this.tasksDao = tasksDao;
	}

	public List<Battle> getBattlesByUserId(Long userId){
		return battlesDao.findAllByUserId(userId);
	}

	public List<Battle> getAllBattles(){
		return battlesDao.findAll();
	}

	public Battle getBattlesById(Long battleId){
		return battlesDao.findByIdWithTasks(battleId);
	}

	public void updateBattleStatus(Battle battle, Battle.BattleStatus newStatus){
		battle.setStatus(newStatus);
		battlesDao.save(battle);
	}

	public Battle createBattle(String title){
		Battle battle = new Battle();
		battle.setTitle(title);
		battle.setStatus(Battle.BattleStatus.inactive);
		return battlesDao.save(battle);
	}

	public Task createTask(Long battleId, String taskBody){
		Battle battle = battlesDao.findById(battleId).orElse(null);
		if(battle != null){
			Task task = new Task();
			task.setBattle(battle);
			task.setTaskBody(taskBody);
			return tasksDao.save(task);
		}
		return null;
	}
}
