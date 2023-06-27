package com.example.capstoneprojectteam3.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((requests) -> requests

//    -------------------UNCOMMENT THIS CODE FOR SECURED ACCESS ---------------------------
//                        .requestMatchers("/tasks/create", "/tasks/*/edit", "/profile", "/battlegrounds").authenticated()
//                        .requestMatchers("/tasks", "/templates/**", "/register", "/login", "/home", "/", "/contact", "/send-email").permitAll()
//                        .requestMatchers("/css/**", "/js/**", "/images/**", "/keys.js").permitAll()
//                )
//                --------------------------------------------------------------
//
//    -------------------UNCOMMENT THIS CODE FOR ALL ACCESS -  NO SECURITY----------------
                                .anyRequest().permitAll()
                        )
//                --------------------------------------------------------------

                .formLogin((login) -> login.loginPage("/login").defaultSuccessUrl("/home"))
                .logout((logout) -> logout.logoutSuccessUrl("/home"))
                .httpBasic(withDefaults());
        return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


}
