package com.example.capstoneprojectteam3.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BattlegroundsController{
    @GetMapping("/battlegrounds")
    public String showBattlegrounds() {

        return "/battlegrounds";
    }

}
