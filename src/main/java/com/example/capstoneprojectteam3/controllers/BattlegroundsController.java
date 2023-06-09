package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.repositories.TaskRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class BattlegroundsController{
//    private final TaskRepository tasksDao;



    @GetMapping("/battlegrounds")
    public String showBattlegrounds() {
        return "/battlegrounds";
    }

}
