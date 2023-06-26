package com.example.capstoneprojectteam3.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name="badges")
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String badgeImage;

    @Column(nullable = false, unique = true)
    private String badgeTitle;

    @Column(nullable = false)
    private String badgeBody;

    @ManyToMany(mappedBy = "badges")
    private Set<User> users;

    @ManyToMany
    @JoinTable(name = "badge_tasks", joinColumns = @JoinColumn(name = "badge_id"), inverseJoinColumns = @JoinColumn(name = "task_id"))
    private List<Task> tasks;


//    ----- Constructors START -----

    public Badge() {
    }

    public Badge(String badgeImage, String badgeTitle, String badgeBody) {
        this.badgeImage = badgeImage;
        this.badgeTitle = badgeTitle;
        this.badgeBody = badgeBody;
    }

    public Badge(String badgeTitle, String badgeBody, Set<User> users, List<Task> tasks){
        this.badgeTitle = badgeTitle;
        this.badgeBody = badgeBody;
        this.users = users;
        this.tasks = tasks;
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

    public String getBadgeTitle() {
        return badgeTitle;
    }

    public void setBadgeTitle(String badgeTitle) {
        this.badgeTitle = badgeTitle;
    }

    public String getBadgeBody() {
        return badgeBody;
    }

    public void setBadgeBody(String badgeBody) {
        this.badgeBody = badgeBody;
    }


    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public List<Task> getTasks(){
        return tasks;
    }

    public void setTasks(List<Task> tasks){
        this.tasks = tasks;
    }

    public String getBadgeImage() {
        return badgeImage;
    }

    public void setBadgeImage(String badgeImage) {
        this.badgeImage = badgeImage;
    }

    //    ----- Getters and Setters END -----


}
