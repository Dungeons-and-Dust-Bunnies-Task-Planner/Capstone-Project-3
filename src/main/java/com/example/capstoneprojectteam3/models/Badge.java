package com.example.capstoneprojectteam3.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name="badges")
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String badge_title;

    @Column(nullable = false)
    private String badge_body;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;



//    ----- Constructors START -----

    public Badge() {
    }

    public Badge(String badge_title, String badge_body) {
        this.badge_title = badge_title;
        this.badge_body = badge_body;
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

    public String getBadge_title() {
        return badge_title;
    }

    public void setBadge_title(String badge_title) {
        this.badge_title = badge_title;
    }

    public String getBadge_body() {
        return badge_body;
    }

    public void setBadge_body(String badge_body) {
        this.badge_body = badge_body;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


//    ----- Getters and Setters END -----







}
