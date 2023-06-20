//package com.example.capstoneprojectteam3.controllers;
//
//import com.example.capstoneprojectteam3.services.EmailService;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class EmailController {
//    private final EmailService emailService;
//
//    public EmailController(EmailService emailService) {
//        this.emailService = emailService;
//    }
//
//    @PostMapping("/send-email")
//    String sendEmailMessage(@RequestParam(name="email") String email){
//        this.emailService.sendMessage(
//                email,
//                "Welcome Letter",
//                "Welcome to Dungeons and Dust Bunnies! We hope you enjoy our interactive task lister! Visit our contact us page to tell us how many monsters you have slain!"
//        );
//        return "/home";
//    }
//}
