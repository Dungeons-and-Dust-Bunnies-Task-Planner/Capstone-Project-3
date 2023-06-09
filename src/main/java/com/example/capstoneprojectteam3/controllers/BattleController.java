package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.repositories.BattleRepository;
import com.example.capstoneprojectteam3.repositories.MonsterImageRepository;
import com.example.capstoneprojectteam3.repositories.MonsterRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BattleController {

    private BattleRepository battlesDao;
    private MonsterRepository monstersDao;
    private MonsterImageRepository monsterImagesDao;


    public BattleController(BattleRepository battlesDao){
        this.battlesDao = battlesDao;
    }

    @GetMapping("/battlegrounds")
    public String showBattlegrounds() {
        return "/battlegrounds";
    }


}
