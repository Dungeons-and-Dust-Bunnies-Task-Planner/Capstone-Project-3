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
    private String task_body;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="battle_id")
    private Battle battles;




//    ----- Constructors START -----

    public Task() {
    }

    public Task(String task_body) {
        this.task_body = task_body;
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

    public String getTask_body() {
        return task_body;
    }

    public void setTask_body(String task_body) {
        this.task_body = task_body;
    }

    public Battle getBattles() {
        return battles;
    }

    public void setBattles(Battle battles) {
        this.battles = battles;
    }


//    ----- Getters and Setters END -----

}
