package com.example.capstoneprojectteam3.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MonsterPageController {
    @GetMapping("/monsterList")
    public String showMonsters() {
        return "meetTheMonsters";
    }
}