package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.models.Task;
import com.example.capstoneprojectteam3.repositories.BattleRepository;
import com.example.capstoneprojectteam3.repositories.MonsterImageRepository;
import com.example.capstoneprojectteam3.repositories.MonsterRepository;
import com.example.capstoneprojectteam3.repositories.TaskRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Collections;
import java.util.List;

@Controller
public class BattleController {
    private BattleRepository battlesDao;
    private final TaskRepository tasksDao;
    private MonsterRepository monstersDao;
    private MonsterImageRepository monsterImagesDao;


    public BattleController(BattleRepository battlesDao, TaskRepository tasksDao){
        this.battlesDao = battlesDao;
        this.tasksDao = tasksDao;
    }

    @GetMapping("/battlegrounds")
    public String showBattlegrounds(Model model) {
        List<Task> tasks = tasksDao.findAll();
        Collections.reverse(tasks);
        model.addAttribute("tasks", tasks);
        return "/battlegrounds";
    }

}
