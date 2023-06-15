package com.example.capstoneprojectteam3.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name="tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String taskBody;

    @Column(nullable = false)
    private int taskComplete;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "battle_id")
    private Battle battle;


    //    ----- Constructors START -----

    public Task() {}

    public Task(String task_body) {
        this.taskBody = taskBody;
    }

    public Task(long id, String taskBody, Battle battle) {
        this.id = id;
        this.taskBody = taskBody;
        this.battle = battle;
    }

    //    ----- Constructors END -----

    // =========================

    //    ----- Getters and Setters START -----

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTaskBody() {
        return taskBody;
    }

    public void setTaskBody(String taskBody) {
        this.taskBody = taskBody;
    }

    public Battle getBattle() {
        return battle;
    }

    public void setBattle(Battle battle) {
        this.battle = battle;
    }

    public Battle getBattles() {
        return battle;
    }

    public void setBattles(Battle battle) {
        this.battle = battle;
    }


//    ----- Getters and Setters END -----

}
