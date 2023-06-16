package com.example.capstoneprojectteam3.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

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

    @JsonIgnore
    @ManyToMany(mappedBy = "tasks")
    private List<Badge> badges;


    //    ----- Constructors START -----

    public Task() {}

    public Task(String taskBody) {
        this.taskBody = taskBody;
    }

    public Task(String taskBody, Battle battle, int taskComplete) {
        this.taskBody = taskBody;
        this.battle = battle;
        this.taskComplete = taskComplete;
    }

    public Task(long id, String taskBody, Battle battle) {
        this.id = id;
        this.taskBody = taskBody;
        this.battle = battle;
    }

    public Task(String taskBody, Battle battle, List<Badge> badges, int taskComplete){
        this.taskBody = taskBody;
        this.battle = battle;
        this.badges = badges;
        this.taskComplete = taskComplete;
    }

    //    ----- Constructors END -----

    // =========================

    //    ----- Getters and Setters START -----

    public int getTaskComplete() {
        return taskComplete;
    }

    public void setTaskComplete(int taskComplete) {
        this.taskComplete = taskComplete;
    }

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

    public List<Badge> getBadges(){
        return badges;
    }

    public void setBadges(List<Badge> badges){
        this.badges = badges;
    }


    //    ----- Getters and Setters END -----

}
