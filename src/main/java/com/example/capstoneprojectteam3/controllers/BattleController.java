package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.repositories.BattleRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BattleController {

    private BattleRepository battlesDao;

    public BattleController(BattleRepository battlesDao){
        this.battlesDao = battlesDao;
    }

    @GetMapping("/battle/show")
    public String showBattle(Model model){
        battlesDao.findById(1L);
        return "battle/show";
    }
}
