package com.example.capstoneprojectteam3.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    public JavaMailSender emailSender;

    @Value("${spring.mail.from}")
    private String from;

    public EmailService(JavaMailSender emailSender){
        this.emailSender = emailSender;
    }
    public void sendMessage(String to, String subject, String htmlContent) {
        MimeMessage message = emailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            emailSender.send(message);
        } catch (MessagingException | MailException ex) {
            ex.printStackTrace();
        }
    }
//
//    public void sendMessage(String to, String subject, String text){
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom(from);
//        message.setTo(to);
//        message.setSubject(subject);
//        message.setText(text);
//        this.emailSender.send(message);
//    }

}



