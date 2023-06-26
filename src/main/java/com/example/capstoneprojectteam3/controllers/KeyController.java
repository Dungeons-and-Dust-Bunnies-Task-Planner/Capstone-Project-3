//package com.example.capstoneprojectteam3.controllers;
//import com.example.capstoneprojectteam3.services.Keys;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//
//@RestController
//public class KeyController {
//
//    @Autowired
//    private Keys keys;
//
//    @GetMapping(value = "/keys.js", produces = "application/javascript")
//    public String getKeys(){
//        return String.format(
//                """
//                        const openAiKey = "%s";
//
//                """
//                , keys.getOpenAiKey());
//    }
//}
