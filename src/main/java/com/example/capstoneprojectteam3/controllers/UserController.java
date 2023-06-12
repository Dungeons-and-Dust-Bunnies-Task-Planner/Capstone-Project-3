package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.models.Badge;
import com.example.capstoneprojectteam3.models.User;
import com.example.capstoneprojectteam3.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
public class UserController {

    private final UserRepository usersDao;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository usersDao, PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
        this.usersDao = usersDao;
    }

    @GetMapping("/home")
    public String showHome(){
        return "index";
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
                               @RequestParam(name = "password") String password,
                               @RequestParam(name = "passwordConfirmation") String passwordConfirm){
        if(password.equals(passwordConfirm)){
            password = passwordEncoder.encode(password);
            usersDao.save(new User(username, email, password));
            return "redirect:/home";
        } else {
            return "redirect:/register";
        }
    }

    @GetMapping("/profile")
    public String showProfile(Model model){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long userId = user.getId();
        user = usersDao.findUserById(userId);
        List<Badge> badges = user.getBadges();

        model.addAttribute("user", user);
        model.addAttribute("badges", badges);

        return "profile";
    }

    @PostMapping("/edit/profile")
    public String changeProfile(
            @RequestParam(name="email") String email,
            @RequestParam(name = "username") String username,
            @RequestParam(name = "password") String password,
            @RequestParam(name = "passwordConfirmation") String passwordConfirm,
            @RequestParam(name = "image-url") String imageUrl  ) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (password.isEmpty() && passwordConfirm.isEmpty() || email.equals(user.getEmail())){
            long userId = user.getId();
            user = usersDao.findUserById(userId);
            user.setUsername(username);
            String oldEmail = user.getEmail();
            user.setEmail(oldEmail);
            String oldPassword = user.getPassword();
            user.setPassword(oldPassword);
            user.setAvatarImage(String.valueOf(imageUrl));
            usersDao.save(user);
        } else {
            if (password.equals(passwordConfirm)){
                password = passwordEncoder.encode(password);
                long userId = user.getId();
                user = usersDao.findUserById(userId);
                user.setUsername(username);
                user.setEmail(email);
                user.setPassword(password);
                user.setAvatarImage(String.valueOf(imageUrl));
                usersDao.save(user);
                return "redirect:/profile";
            } else {
                return "redirect:/profile";
            }
        }
        return "redirect:/profile";
    }





}
