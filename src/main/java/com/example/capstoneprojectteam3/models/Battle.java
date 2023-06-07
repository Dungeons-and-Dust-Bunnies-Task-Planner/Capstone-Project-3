package com.example.capstoneprojectteam3.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.scheduling.config.Task;

import java.util.List;

@Entity
@Table(name = "battles")
public class Battle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "monster_id")
    private Monster monster;

    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "task_id")
    private List<Task> tasks;


    //    ----- Constructors START -----

    public Battle(){}

    public Battle(User user, Monster monster, List<Task> tasks) {
        this.user = user;
        this.monster = monster;
        this.tasks = tasks;
    }

    public Battle(User user, Monster monster) {
        this.user = user;
        this.monster = monster;
    }
    //    ----- Constructors END -----

    //    ----- Getters and Setters START -----

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Monster getMonster() {
        return monster;
    }

    public void setMonster(Monster monster) {
        this.monster = monster;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
    //    ----- Getters and Setters END -----
}
