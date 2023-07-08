package com.example.capstoneprojectteam3.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "monster_images")
public class MonsterImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "monster_img")
    private String monster_img;

    @Column(name = "stage")
    private int monster_stage;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "monster_img_id")
    private Monster monster;

    public MonsterImage() {
    }

    public MonsterImage(String monster_img, int monster_stage, Monster monster) {
        this.monster_img = monster_img;
        this.monster_stage = monster_stage;
        this.monster = monster;
    }

    public MonsterImage(Long id, String monster_img, int monster_stage) {
        this.id = id;
        this.monster_img = monster_img;
        this.monster_stage = monster_stage;
    }

    public Monster getMonster() {
        return monster;
    }

    public void setMonster(Monster monster) {
        this.monster = monster;
    }

    public String getMonster_img() {
        return monster_img;
    }

    public void setMonster_img(String monster_img) {
        this.monster_img = monster_img;
    }

    public int getMonster_stage() {
        return monster_stage;
    }

    public void setMonster_stage(int monster_stage) {
        this.monster_stage = monster_stage;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
