package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.models.Battle;
import com.example.capstoneprojectteam3.repositories.BattleRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/battle")
public class BattleRestController {
    private final BattleRepository battlesDao;

    public BattleRestController(BattleRepository battlesDao) {
        this.battlesDao = battlesDao;
    }

    @GetMapping("/battle-list")
    public List<Battle> getBattleList (@RequestParam(name = "userId")Long userId){
       List<Battle> battles = battlesDao.findAllByUserId(userId);
       return battles;
    }
}
