package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.models.*;
import com.example.capstoneprojectteam3.repositories.BattleRepository;
import com.example.capstoneprojectteam3.repositories.MonsterRepository;
import com.example.capstoneprojectteam3.repositories.TaskRepository;
import com.example.capstoneprojectteam3.repositories.UserRepository;
import com.example.capstoneprojectteam3.utils.RandomNumGen;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class BattleController{

	private final UserRepository usersDao;
	private final BattleRepository battlesDao;
	private final TaskRepository tasksDao;
	private final MonsterRepository monstersDao;

	public BattleController(UserRepository usersDao, BattleRepository battlesDao, TaskRepository tasksDao, MonsterRepository monstersDao){
		this.usersDao = usersDao;
		this.battlesDao = battlesDao;
		this.tasksDao = tasksDao;
		this.monstersDao = monstersDao;
	}

	@GetMapping("/battlegrounds")
	public String showBattlegrounds(Model model){
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		List<Battle> battles = battlesDao.findAllByUserId(user.getId());
		model.addAttribute("battles", battles);
		return "/battlegrounds";
	}

	@PostMapping("/battlegrounds/create-battle")
	public String createBattle(@RequestParam(name="battleTitle") String title){
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		user = usersDao.findUserById(user.getId());

		int monsterMax = monstersDao.findAll().size();
		long randomMonsterId = RandomNumGen.GenerateRandomMonsterId(monsterMax);
		Monster newMonster = monstersDao.findMonsterById(randomMonsterId);

		Battle newBattle = new Battle(title, 0L, user, newMonster);
		battlesDao.save(newBattle);
		return "redirect:/battlegrounds";
	}

	@PostMapping("/battlegrounds/create-task")
	public String createTask(@RequestParam(name="battleId") Long battleId, @RequestParam(name="taskBody") String taskBody){
		Battle battle = battlesDao.findByIdWithTasks(battleId);
		Task task = new Task(taskBody, battle, 0);
		tasksDao.save(task);
		return "redirect:/battlegrounds";
	}

	@PostMapping("/battlegrounds/complete-task")
	public String editTask(@RequestParam(name="taskId") Long taskId){
		Task editTask = tasksDao.findTaskById(taskId);
		editTask.setTaskComplete(1);
		tasksDao.save(editTask);
		return "redirect:/battlegrounds";
	}

	@PostMapping("/battlegrounds/edit-battle-title")
	public String editBattleTitle(
			@RequestParam(name="battleId") Long battleId
			,@RequestParam(name="battleTitle") String newBattleTitle){
		Battle editBattle = battlesDao.findBattleById(battleId);
		editBattle.setTitle(newBattleTitle);
		battlesDao.save(editBattle);
		return "redirect:/battlegrounds";
	}

	@PostMapping("/battlegrounds/delete-battle")
	public String deleteBattle(
			@RequestParam(name="battleId") Long battleId){
		battlesDao.deleteById(battleId);
		return "redirect:/battlegrounds";
	}

	@PostMapping("/battlegrounds/edit-task-body")
	public String editTaskBody(@RequestParam(name="editTaskBody") String taskBody,
							   @RequestParam(name="taskId") Long taskId){

		Task editTask = tasksDao.findTaskById(taskId);
		editTask.setTaskBody(taskBody);
		tasksDao.save(editTask);
		return "redirect:/battlegrounds";
	}

	@PostMapping("/battlegrounds/delete-task")
	public String deleteTask(@RequestParam(name="taskId") Long taskId){
		tasksDao.deleteById(taskId);
		return "redirect:/battlegrounds";
	}

	// Update the monster image based on the current HP
	private void updateMonsterImageBasedOnHP(MonsterImage monsterImage, int currentHP){
		// Logic to determine and set the image based on the HP
		// You can use if-else statements, switch-case, or any other logic here
		// Example logic: if HP < 50, set a new image; otherwise, keep the existing image
	}

	@PostMapping("/complete")
	public String completedBattle(){
		System.out.println("Made it in to /complete");
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		long userId = user.getId();
		user = usersDao.findUserById(userId);
		int battleCounter = user.getBattlesComplete();
		System.out.println(battleCounter);
		user.setBattlesComplete(battleCounter + 1);
		usersDao.save(user);
		return "redirect:/profile";
	}

}
