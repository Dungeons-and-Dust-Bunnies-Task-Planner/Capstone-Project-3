package com.example.capstoneprojectteam3.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name="badges")
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String badgeTitle;

    @Column(nullable = false)
    private String badgeBody;

//    @JsonIgnore
//    @ManyToOne
//    @JoinColumn(name="user_id")
//    private User user;
    @ManyToMany(mappedBy = "badges")
    private Set<User> users;


//    ----- Constructors START -----

    public Badge() {
    }

    public Badge(String badgeTitle, String badgeBody) {
        this.badgeTitle = badgeTitle;
        this.badgeBody = badgeBody;
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

//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
//    ----- Getters and Setters END -----


}
