package com.example.capstoneprojectteam3.controllers;

import org.springframework.boot.web.servlet.error.ErrorController;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyErrorController implements ErrorController {

    @GetMapping("/error")
    public String handleError(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        System.out.println("An error Occurred!!");
        if (status != null) {
            System.out.println(status);
        }
        return "error";
    }
}