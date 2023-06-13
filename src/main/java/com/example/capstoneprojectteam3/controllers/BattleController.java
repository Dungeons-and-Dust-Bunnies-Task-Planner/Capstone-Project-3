package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.models.Battle;
import com.example.capstoneprojectteam3.models.User;
import com.example.capstoneprojectteam3.repositories.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class BattleController {
    private final BattleRepository battlesDao;
    private final TaskRepository tasksDao;
    private final MonsterRepository monstersDao;
    private final MonsterImageRepository monsterImagesDao;
    private final UserRepository usersDao;


    public BattleController(BattleRepository battlesDao, TaskRepository tasksDao, MonsterRepository monstersDao, MonsterImageRepository monsterImagesDao, UserRepository usersDao){
        this.battlesDao = battlesDao;
        this.tasksDao = tasksDao;
        this.monstersDao = monstersDao;
        this.monsterImagesDao = monsterImagesDao;
        this.usersDao = usersDao;
    }

    @GetMapping("/battlegrounds")
    public String showBattlegrounds(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Battle> battles = battlesDao.findAllByUserId(user.getId());
        model.addAttribute("battles", battles);
        return "/battlegrounds";
    }

}
