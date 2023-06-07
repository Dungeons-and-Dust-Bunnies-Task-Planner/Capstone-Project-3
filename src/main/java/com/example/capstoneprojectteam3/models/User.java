package com.example.capstoneprojectteam3.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false, length = 50, unique = true)
    private String username;
    @JsonIgnore
    @Column(nullable = false)
    private String password;
    @Column()
    private String avatar_img;
    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "user")
    private List<Badge> badges;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "user")
    private List<Battle> battles;


//    ----- Constructors START -----
    public User() {
    }

    public User(String email, String username, String password, String avatar_img) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.avatar_img = avatar_img;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAvatar_img() {
        return avatar_img;
    }

    public void setAvatar_img(String avatar_img) {
        this.avatar_img = avatar_img;
    }

    public List<Badge> getBadges() {
        return badges;
    }

    public void setBadges(List<Badge> badges) {
        this.badges = badges;
    }

        public List<Battle> getBattles() {
        return battles;
    }

    public void setBattles(List<Battle> battles) {
        this.battles = battles;
    }
    //    ----- Getters and Setters END -----

}
