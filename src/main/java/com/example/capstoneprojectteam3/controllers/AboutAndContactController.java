package com.example.capstoneprojectteam3.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class AboutAndContactController {

    @GetMapping("/contact")
        public String showContact(){
        return "contact";
    }

    @GetMapping("/about")
    public String showAbout(){
        return "about";
    }

    @GetMapping("/how-to")
    public String howTo(){
        return "how-to";
    }

}
