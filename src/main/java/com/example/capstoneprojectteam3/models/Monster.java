package com.example.capstoneprojectteam3.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name="monsters")
public class Monster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "monster")
    private List<MonsterImage> monsterImages;

    @OneToMany(mappedBy = "monster")
    private List<Battle> battles;

    //    ----- Constructors START -----

    public Monster(){
    }

    public Monster(String name) {
        this.name = name;
    }

    //    ----- Constructors END -----

    //    ----- Getters and Setters START -----

    public List<MonsterImage> getMonsterImages() {
        return monsterImages;
    }

    public void setMonsterImages(List<MonsterImage> monsterImages) {
        this.monsterImages = monsterImages;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    //    ----- Getters and Setters END -----
}
