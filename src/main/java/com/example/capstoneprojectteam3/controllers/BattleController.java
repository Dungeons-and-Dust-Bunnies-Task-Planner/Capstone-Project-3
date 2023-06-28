package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.models.*;
import com.example.capstoneprojectteam3.repositories.*;
import com.example.capstoneprojectteam3.models.OpenAI.OpenAIResponse;
import com.example.capstoneprojectteam3.repositories.BattleRepository;
import com.example.capstoneprojectteam3.repositories.MonsterRepository;
import com.example.capstoneprojectteam3.repositories.TaskRepository;
import com.example.capstoneprojectteam3.repositories.UserRepository;
import com.example.capstoneprojectteam3.utils.OpenAIRequest;
import com.example.capstoneprojectteam3.utils.RandomNumGen;
import org.apache.http.client.RedirectException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class BattleController {

//	@Autowired
//	private OpenAIRequest openAIRequest;

    private final UserRepository usersDao;
    private final BattleRepository battlesDao;
    private final TaskRepository tasksDao;
    private final MonsterRepository monstersDao;
    private final BadgeRepository badgesDao;

    public BattleController(UserRepository usersDao, BattleRepository battlesDao, TaskRepository tasksDao, MonsterRepository monstersDao, BadgeRepository badgesDao) {
        this.usersDao = usersDao;
        this.battlesDao = battlesDao;
        this.tasksDao = tasksDao;
        this.monstersDao = monstersDao;
        this.badgesDao = badgesDao;
    }

	@GetMapping("/battleList")
	public String showBattleList(Model model){
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		user = usersDao.findUserById(user.getId());
		List<Battle> battles = battlesDao.findAllByUserId(user.getId());
		model.addAttribute("battles", battles);
		return "battleList";
	}

	@GetMapping("/battlegrounds/{id}")
	public String showBattlegrounds(
			@PathVariable(name = "id") Long id, Model model) throws Exception {
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		user = usersDao.findUserById(user.getId());
		Battle battle = battlesDao.findBattleById(id);

		// CHAT-GPT API REQUEST AND RESPONSE CODE BELOW, COMMENTED OUT TO MINIMIZE API REQUESTS
//		OpenAIResponse aiResponse = openAIRequest.sendOpenAIRequest("You are a unclean monster who hates people cleaning! A cleaner attacks you! Respond with a quirky funny answer in only three sentences! you want them to not clean anything!");
//		String monsterResponse = aiResponse.getChoices().get(0).getText();
//		System.out.println(monsterResponse);

//		model.addAttribute("monsterTalk", monsterResponse);
		model.addAttribute("user", user);
		model.addAttribute("battle",battle);
		return "battlegrounds";
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
		return "redirect:/battleList";
	}

	@PostMapping("/battlegrounds/create-task")
	public String createTask(@RequestParam(name="battleId") Long battleId, @RequestParam(name="taskBody") String taskBody){
		Battle battle = battlesDao.findByIdWithTasks(battleId);
		Task task = new Task(taskBody, battle, 0);
		tasksDao.save(task);
		return "redirect:/battlegrounds/"+ battleId;
	}

//	@PostMapping("/battlegrounds/complete-task")
//	public void editTask(@RequestParam(name="taskId") Long taskId){
//		System.out.println("made it to the complete-task controller");
//		Task editTask = tasksDao.findTaskById(taskId);
//		if (editTask.getTaskComplete() == 0){
//			editTask.setTaskComplete(1);
//			tasksDao.save(editTask);
//		} else if (editTask.getTaskComplete() == 1){
//			editTask.setTaskComplete(1);
//			tasksDao.save(editTask);
//		}
//	}

	@PostMapping("/battlegrounds/edit-battle-title")
	public String editBattleTitle(
			@RequestParam(name="battleId") Long battleId
			,@RequestParam(name="battleTitle") String newBattleTitle){
		Battle editBattle = battlesDao.findBattleById(battleId);
		editBattle.setTitle(newBattleTitle);
		battlesDao.save(editBattle);
		return "redirect:/battleList";
	}

	@PostMapping("/battlegrounds/delete-battle")
	public String deleteBattle(
			@RequestParam(name="battleId") Long battleId){
		battlesDao.deleteById(battleId);
		return "redirect:/battleList";
	}

	@PostMapping("/battlegrounds/edit-task-body")
	public String editTaskBody(@RequestParam(name="editTaskBody") String taskBody,
							   @RequestParam(name="taskId") Long taskId){

		Task editTask = tasksDao.findTaskById(taskId);
		Long battleId = editTask.getBattle().getId();
		editTask.setTaskBody(taskBody);
		tasksDao.save(editTask);
		return "redirect:/battlegrounds/"+ battleId;
	}

	@PostMapping("/battlegrounds/delete-task")
	public String deleteTask(@RequestParam(name="taskId") Long taskId){
		Task editTask = tasksDao.findTaskById(taskId);
		Long battleId = editTask.getBattle().getId();
		tasksDao.deleteById(taskId);
		return "redirect:/battlegrounds/" + battleId;
	}

	// Update the monster image based on the current HP
	private void updateMonsterImageBasedOnHP(MonsterImage monsterImage, int currentHP){
		// You can use if-else statements, switch-case, or any other logic here
		// Example logic: if HP < 50, set a new image; otherwise, keep the existing image
	}

	public void updateBadge(User user){
		int battleCounter = user.getBattlesComplete();
		List<Badge> badges = user.getBadges();
		if (battleCounter == 1){
			Badge badge = badgesDao.findBadgeById(1L);
			badges.add(badge);
			usersDao.save(user);
		} else if (battleCounter == 3){
			Badge badge = badgesDao.findBadgeById(2L);
			badges.add(badge);
			usersDao.save(user);
		} else if (battleCounter == 5){
			Badge badge = badgesDao.findBadgeById(3L);
			badges.add(badge);
			usersDao.save(user);

		}
	}

	// updates the user's badge based on the monster they defeated
	public void updateMonsterBadge(User user, Battle battle){
		List<Badge> badges = user.getBadges();
		Monster monster = battle.getMonster();
		System.out.println("monster id");
		System.out.println(monster.getId());
		// if the user has defeated the first monster, add the badge to their profile
		if ( monster.getId() == 2 && !badges.contains(badgesDao.findBadgeById(5L))){
			Badge badge = badgesDao.findBadgeById(5L);
			badges.add(badge);
			usersDao.save(user);
		} else if (monster.getId() == 1 && !badges.contains(badgesDao.findBadgeById(8L))){
			Badge badge = badgesDao.findBadgeById(8L);
			badges.add(badge);
			usersDao.save(user);
		} else if (monster.getId() == 3 && !badges.contains(badgesDao.findBadgeById(4L))) {
			Badge badge = badgesDao.findBadgeById(4L);
			badges.add(badge);
			usersDao.save(user);
		} else if (monster.getId() == 4 && !badges.contains(badgesDao.findBadgeById(7L))){
			Badge badge = badgesDao.findBadgeById(7L);
			badges.add(badge);
			usersDao.save(user);
		} else if (monster.getId() == 5 && !badges.contains(badgesDao.findBadgeById(8L))) {
			Badge badge = badgesDao.findBadgeById(8L);
			badges.add(badge);
			usersDao.save(user);
		}


	}

	@PostMapping("/battlegrounds/complete")
	public String completedBattle(@RequestParam(name="battleId") Long battleId){
		System.out.println("Made it in to /complete");
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		long userId = user.getId();
		user = usersDao.findUserById(userId);
		int battleCounter = user.getBattlesComplete();
		System.out.println(battleCounter);
		user.setBattlesComplete(battleCounter + 1);

		// Update the user's badges
		updateBadge(user);
		updateMonsterBadge(user, battlesDao.findBattleById(battleId));

        usersDao.save(user);
        return "redirect:/profile";
    }

      @PostMapping("/battlegrounds/complete-task")
    @ResponseBody
    public void editTask(@RequestParam(name = "battleId") Long battleId, @RequestParam(name = "taskId") String taskIdString, RedirectAttributes redirectAttributes) throws RedirectException {
        Battle battle = battlesDao.findByIdWithTasks(battleId);
        Long taskId = Long.parseLong(taskIdString);
        System.out.println(taskId);
        System.out.println("made it to the complete-task controller");
        Task editTask = tasksDao.findTaskById(taskId);
        if (editTask.getTaskComplete() == 0) {
            editTask.setTaskComplete(1);
            tasksDao.save(editTask);
        } else if (editTask.getTaskComplete() == 1) {
            editTask.setTaskComplete(1);
            tasksDao.save(editTask);
        }

        redirectAttributes.addAttribute("battleId", battleId);

        throw new RedirectException("/battlegrounds/{battleId}");
    }


}
