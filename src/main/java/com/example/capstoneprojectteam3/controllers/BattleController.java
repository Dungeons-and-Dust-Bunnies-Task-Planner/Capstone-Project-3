package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.models.Battle;
import com.example.capstoneprojectteam3.models.MonsterImage;
import com.example.capstoneprojectteam3.models.User;
import com.example.capstoneprojectteam3.services.BattleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/battlegrounds")
public class BattleController{

	@Autowired
	private BattleService battleService;

	@GetMapping
	public String showBattlegrounds(Model model){
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		List<Battle> battles = battleService.getBattlesByUserId(user.getId());
		model.addAttribute("battles", battles);
		return "battlegrounds";
	}

	@PostMapping("/battle/{id}/activate")
	@ResponseBody
	public ResponseEntity<String> activateBattle(@PathVariable("id") Long battleId){
		try{
			battleService.updateBattleStatus(battleId, "active");
			return ResponseEntity.ok("Battle activated successfully");
		}catch(Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to activate battle");
		}
	}

	@PostMapping("/battle/{id}/deactivate")
	@ResponseBody
	public ResponseEntity<String> deactivateBattle(@PathVariable("id") Long battleId){
		try{
			battleService.updateBattleStatus(battleId, "inactive");
			return ResponseEntity.ok("Battle deactivated successfully");
		}catch(Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to deactivate battle");
		}
	}

	@PostMapping("/create-battle")
	public String createBattle(@RequestParam("title") String title) {
		battleService.createBattle(title);
		return "redirect:/battlegrounds";
	}

	@PostMapping("/battle/{id}/create-task")
	@ResponseBody
	public ResponseEntity<String> createTask(
			@PathVariable("id") Long battleId,
			@RequestParam("task-body") String taskBody,
			@RequestParam("battleId") long id
	){
		try{
			battleService.createTask(battleId, taskBody);
			return ResponseEntity.ok("Task created successfully");
		}catch(Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create task");
		}
	}

	// Update the monster image based on the current HP
	private void updateMonsterImageBasedOnHP(MonsterImage monsterImage, int currentHP){
		// Logic to determine and set the image based on the HP
		// You can use if-else statements, switch-case, or any other logic here
		// Example logic: if HP < 50, set a new image; otherwise, keep the existing image
	}

    @GetMapping("/battlegrounds")
    public String showBattlegrounds(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Battle> battles = battlesDao.findAllByUserId(user.getId());
        model.addAttribute("battles", battles);
        return "/battlegrounds";
    }

}
