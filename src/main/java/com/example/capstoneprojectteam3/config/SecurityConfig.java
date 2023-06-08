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
                .requestMatchers("/tasks/create", "/tasks/*/edit", "/profile").authenticated()
                .requestMatchers("/tasks", "/templates/**", "/register", "/login", "/home").permitAll()
                .requestMatchers("/css/**", "/js/**").permitAll()
        );

        http.formLogin((form) -> form.loginPage("/login").defaultSuccessUrl("/home"));
        http.logout((form) -> form.logoutSuccessUrl("/login"));
        http.httpBasic(withDefaults());
        return http.build();

        //        http.authorizeHttpRequests((requests) -> requests
//                .anyRequest().permitAll()
//        );
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


}
