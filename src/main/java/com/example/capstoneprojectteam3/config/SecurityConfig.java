package com.example.capstoneprojectteam3.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@Import(CorsConfig.class)
public class SecurityConfig {

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests((authorize) -> authorize

//    -------------------UNCOMMENT THIS CODE FOR SECURED ACCESS ---------------------------
                        .requestMatchers("/profile","/profile/**", "/battlegrounds","/battlegrounds/edit-battle-title", "/battlegrounds/**","/battlegrounds/complete-task", "/battleList","/claim/badge","/edit/profile").authenticated()

                        .requestMatchers( "/register", "/registration", "/login", "/home", "/", "/about","/contact", "/send-email", "/welcome", "/monsterList", "/how-to").permitAll()
                        .requestMatchers("/css/**", "/js/**", "/images/**", "/keys.js").permitAll()
                )
//                --------------------------------------------------------------
//
//    -------------------UNCOMMENT THIS CODE FOR ALL ACCESS -  NO SECURITY----------------
//                                .anyRequest().permitAll()
//                        )
//                --------------------------------------------------------------

                .formLogin((login) -> login.loginPage("/login").defaultSuccessUrl("/home"))
                .logout((logout) -> logout.logoutSuccessUrl("/home"))
                .csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
                .httpBasic(Customizer.withDefaults())
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CookieCsrfTokenRepository csrfTokenRepository() {
        return CookieCsrfTokenRepository.withHttpOnlyFalse();
    }
}

