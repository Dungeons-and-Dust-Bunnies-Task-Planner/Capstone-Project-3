package com.example.capstoneprojectteam3.controllers;


import com.example.capstoneprojectteam3.models.MonsterImage;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class MonsterPageController {
    @GetMapping("/monsterList")
    public String showMonsters(){
        return "meetTheMonsters";
    }
}

