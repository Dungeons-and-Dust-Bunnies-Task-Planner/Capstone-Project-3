package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.models.User;
import com.example.capstoneprojectteam3.repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {

    private UserRepository usersDao;

    public UserController(UserRepository usersDao){
        this.usersDao = usersDao;
    }

    @GetMapping("/home")
    public String showHome(){
        return "/index";
    }

    @GetMapping("/login")
    public String showLoginForm(){
        return "/login";
    }

    @GetMapping("/register")
    public String showRegistrationForm(){
        return "/registration";
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam(name="username") String username,
                               @RequestParam(name="email") String email,
                               @RequestParam(name = "password") String password){
        usersDao.save(new User(email, username, password));
        return "redirect:/home";
    }

}
