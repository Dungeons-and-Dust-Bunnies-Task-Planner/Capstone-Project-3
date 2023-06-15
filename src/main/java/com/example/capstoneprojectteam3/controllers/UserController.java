package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.models.Badge;
import com.example.capstoneprojectteam3.models.Battle;
import com.example.capstoneprojectteam3.models.MonsterImage;
import com.example.capstoneprojectteam3.models.User;
import com.example.capstoneprojectteam3.repositories.BattleRepository;
import com.example.capstoneprojectteam3.repositories.MonsterImageRepository;
import com.example.capstoneprojectteam3.repositories.MonsterRepository;
import com.example.capstoneprojectteam3.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.List;

@Controller
public class UserController {

    private final UserRepository usersDao;
    private final MonsterRepository monstersDao;
    private final MonsterImageRepository monsterImagesDao;
    private final PasswordEncoder passwordEncoder;
    private final BattleRepository battlesDao;


    public UserController(UserRepository usersDao, MonsterRepository monstersDao, MonsterImageRepository monsterImagesDao, PasswordEncoder passwordEncoder, BattleRepository battlesDao){
        this.monstersDao = monstersDao;
        this.monsterImagesDao = monsterImagesDao;
        this.passwordEncoder = passwordEncoder;
        this.usersDao = usersDao;
        this.battlesDao = battlesDao;
    }
    @GetMapping("/home")
    public String showHome(Model model){
        List<MonsterImage> monsterImages = monsterImagesDao.findAllByMonster_stage(1L);
        model.addAttribute("monsterImages", monsterImages);
        return "index";
    }

    @GetMapping("/")
    public String showIndex(Model model){
        List<MonsterImage> monsterImages = monsterImagesDao.findAllByMonster_stage(1L);
        model.addAttribute("monsterImages", monsterImages);
        return "index";
    }

    @GetMapping("/login")
    public String showLoginForm(Model model){
        List<MonsterImage> monsterImages = monsterImagesDao.findAllByMonster_stage(1L);
        model.addAttribute("monsterImages", monsterImages);
        return "/login";
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model){
        List<MonsterImage> monsterImages = monsterImagesDao.findAllByMonster_stage(1L);
        model.addAttribute("monsterImages", monsterImages);
        return "/registration";
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam(name="username") String username,
                               @RequestParam(name="email") String email,
                               @RequestParam(name = "password") String password,
                               @RequestParam(name = "passwordConfirmation") String passwordConfirm){
        String defaultAvatar = "https://cdn.filestackcontent.com/6Vs83AuzQoW2tCNsAB17";
        String defaultBackground = "https://cdn.filestackcontent.com/6Vs83AuzQoW2tCNsAB17";
        if(password.equals(passwordConfirm)){
            password = passwordEncoder.encode(password);
            usersDao.save(new User(username, email, password, defaultAvatar, defaultBackground, 0));
            return "redirect:/home";
        } else {
            return "redirect:/register";
        }
    }

    @GetMapping("/profile")
    public String showProfile(Model model) throws IOException {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long userId = user.getId();
        user = usersDao.findUserById(userId);
        List<Badge> badges = user.getBadges();
        List<Battle> battles = battlesDao.findAllByUserId(userId);

        // CHAT-GPT API REQUEST AND RESPONSE CODE BELOW, COMMENTED OUT TO MINIMIZE API REQUESTS
//        OpenAIResponse aiResponse = OpenAIRequest.sendOpenAIRequest("You are a monster who hates people cleaning! A cleaner attacks you! Respond with only two sentences!");
//        String text = aiResponse.getChoices().get(0).getText();
//        System.out.println(text);

        model.addAttribute("user", user);
        model.addAttribute("badges", badges);
        model.addAttribute("battles", battles);

        return "profile";
    }

    @PostMapping("/claim/badge")
    public String claimBadge(@RequestParam(name="badgeId") long badgeId){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long userId = user.getId();
        user = usersDao.findUserById(userId);
        Badge badge = usersDao.findBadgeById(badgeId);
        user.addBadge(badge);
        usersDao.save(user);
        return "redirect:/profile";
    }

    @PostMapping("/edit/profile")
    public String changeProfile(
            @RequestParam(name="email") String email,
            @RequestParam(name = "username") String username,
            @RequestParam(name = "password") String password,
            @RequestParam(name = "passwordConfirmation") String passwordConfirm,
            @RequestParam(name = "profile-image-url") String profileImageUrl,
            @RequestParam(name = "background-image-url") String backgroundImageUrl
            ){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (password.isEmpty() && passwordConfirm.isEmpty()){
            long userId = user.getId();
            user = usersDao.findUserById(userId);
            user.setUsername(username);
            user.setEmail(email);
            String oldPassword = user.getPassword();
            user.setPassword(oldPassword);
            user.setAvatarImage(profileImageUrl);
            user.setBackgroundImage(backgroundImageUrl);
            System.out.println("This is conditional where password fields are empty");
            usersDao.save(user);
        } else {
            if (password.equals(passwordConfirm)){
                password = passwordEncoder.encode(password);
                long userId = user.getId();
                user = usersDao.findUserById(userId);
                user.setUsername(username);
                user.setEmail(email);
                user.setPassword(password);
                user.setAvatarImage(profileImageUrl);
                user.setBackgroundImage(backgroundImageUrl);
                System.out.println("This is conditional where passwords are changed");
                usersDao.save(user);
            }
            return "redirect:/profile";
        }
        return "redirect:/profile";
    }

}
