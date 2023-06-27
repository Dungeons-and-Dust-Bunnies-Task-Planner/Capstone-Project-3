//package com.example.capstoneprojectteam3.controllers;
//
//import com.example.capstoneprojectteam3.models.Battle;
//import com.example.capstoneprojectteam3.repositories.BattleRepository;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/battle")
//public class BattleRestController {
//    private final BattleRepository battlesDao;
//
//    public BattleRestController(BattleRepository battlesDao) {
//        this.battlesDao = battlesDao;
//    }
//
//    @GetMapping("/battleList")
//    public List<Battle> getBattleList (@RequestParam(name = "userId")Long userId, Model model){
//       List<Battle> battles = battlesDao.findAllByUserId(userId);
//       model.addAttribute("battles", battles);
//       return battles;
//    }
//}
