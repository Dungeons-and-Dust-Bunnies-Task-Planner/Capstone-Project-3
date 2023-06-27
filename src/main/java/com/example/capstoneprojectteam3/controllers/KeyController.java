package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.services.KeyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KeyController {

    private final KeyService keyService;

    @Autowired
    public KeyController(KeyService keyService) {
        this.keyService = keyService;
    }

    @GetMapping(value = "/keys.js", produces = "application/javascript")
    public String getKey(){
        return String.format(
                """
                        const openAiKey = "%s";
                """
                , keyService.getOpenAiKey());
    }
}
