package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.models.Badge;
import com.example.capstoneprojectteam3.models.Battle;
import com.example.capstoneprojectteam3.models.MonsterImage;
import com.example.capstoneprojectteam3.models.User;
import com.example.capstoneprojectteam3.repositories.BattleRepository;
import com.example.capstoneprojectteam3.repositories.MonsterImageRepository;
import com.example.capstoneprojectteam3.repositories.UserRepository;
import com.example.capstoneprojectteam3.services.DustBunniesUserDetailsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class UserController {

    private final UserRepository usersDao;
    private final MonsterImageRepository monsterImagesDao;
    private final PasswordEncoder passwordEncoder;
    private final BattleRepository battlesDao;


    public UserController(UserRepository usersDao, MonsterImageRepository monsterImagesDao, PasswordEncoder passwordEncoder, BattleRepository battlesDao, DustBunniesUserDetailsService dustBunniesUserDetailsService) {
        this.monsterImagesDao = monsterImagesDao;
        this.passwordEncoder = passwordEncoder;
        this.usersDao = usersDao;
        this.battlesDao = battlesDao;
    }

    @GetMapping("/home")
    public String showHome(Model model) {
        List<MonsterImage> monsterImages = monsterImagesDao.findAllByMonster_stage(1L);
        model.addAttribute("monsterImages", monsterImages);
        return "index";
    }

    @GetMapping("/")
    public String showIndex(Model model) {
        List<MonsterImage> monsterImages = monsterImagesDao.findAllByMonster_stage(1L);
        model.addAttribute("monsterImages", monsterImages);
        return "index";
    }

    @GetMapping("/login")
    public String showLoginForm(@RequestParam(value = "error", required = false) String error, Model model) {
        List<MonsterImage> monsterImages = monsterImagesDao.findAllByMonster_stage(1L);
        model.addAttribute("monsterImages", monsterImages);
        if (error != null) {
            model.addAttribute("loginError", true);
        }
        return "login";
    }

    @PostMapping("/login")
    public String login() {
        return "redirect:/profile";
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        List<MonsterImage> monsterImages = monsterImagesDao.findAllByMonster_stage(1L);
        model.addAttribute("monsterImages", monsterImages);
        return "registration";
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam(name = "username") String username,
                               @RequestParam(name = "email") String email,
                               @RequestParam(name = "password") String password,
                               @RequestParam(name = "passwordConfirmation") String passwordConfirm,
                               RedirectAttributes redirectAttributes,
                               HttpServletRequest request) {

        String defaultAvatar = "https://cdn.filestackcontent.com/6Vs83AuzQoW2tCNsAB17";
        String defaultBackground = "https://cdn.filestackcontent.com/yhkFzlgzQtejKwLdOo51";
        User existingUser = usersDao.findUserByUsername(username);
        User existingEmail = usersDao.findUserByEmail(email);

        if (existingUser != null || existingEmail != null) {
            redirectAttributes.addAttribute("userExists", true);
            return "redirect:/register?error";
        }

        if (password.equals(passwordConfirm)) {
            password = passwordEncoder.encode(password);
            usersDao.save(new User(username, email, password, defaultAvatar, defaultBackground, 0));
            return "redirect:/login";
        } else {
            redirectAttributes.addAttribute("passwordMismatch", true);
            return "redirect:/register?error";
        }
    }


    @GetMapping("/profile")
    public String showProfile(Model model) throws Exception {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long userId = user.getId();
        user = usersDao.findUserById(userId);
        List<Badge> badges = user.getBadges();
        List<Battle> battles = battlesDao.findAllByUserId(userId);
        boolean hasActiveBattles = false;

        for (Battle battle : battles) {
            if (battle.getStatus() == 0) {
                hasActiveBattles = true;
            }
        }
        model.addAttribute("user", user);
        model.addAttribute("badges", badges);
        model.addAttribute("battles", battles);
        model.addAttribute("id", userId);
        model.addAttribute("hasActiveBattles", hasActiveBattles);
        return "profile";
    }

    @PostMapping("/claim/badge")
    public String claimBadge(@RequestParam(name = "badgeId") long badgeId) {
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
            @RequestParam(name = "email") String email,
            @RequestParam(name = "username") String username,
            @RequestParam(name = "password") String password,
            @RequestParam(name = "passwordConfirmation") String passwordConfirm,
            @RequestParam(name = "profile-image-url") String profileImageUrl,
            @RequestParam(name = "background-image-url") String backgroundImageUrl
    ) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (password.isEmpty() && passwordConfirm.isEmpty()) {
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
            if (password.equals(passwordConfirm)) {
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


    @PostMapping("/profile/{id}/delete")
    public String deleteAccount(@PathVariable("id") long userId, HttpServletRequest request) {
        User user = usersDao.findUserById(userId);
        List<Battle> battles = user.getBattles();
        for (Battle battle : battles) {
            battle.setUser(null);
            battlesDao.save(battle);
        }
        usersDao.deleteById(userId);
        SecurityContextHolder.clearContext();
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "redirect:/home";
    }
}
