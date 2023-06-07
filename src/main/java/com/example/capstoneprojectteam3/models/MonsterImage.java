package com.example.capstoneprojectteam3.models;


import jakarta.persistence.*;

@Entity
@Table(name = "monster_images")
public class MonsterImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url")
    private String url;

    @Column(name = "stage")
    private int monster_stage;

    public MonsterImage(){

    }

    public MonsterImage(Long id, String url, int monster_stage) {
        this.id = id;
        this.url = url;
        this.monster_stage = monster_stage;
    }

    public String getUrl() {
        return url;
    }


    public void setUrl(String url) {
        this.url = url;
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
