package com.example.capstoneprojectteam3.models;

import jakarta.persistence.*;

@Entity
@Table(name="monsters")
public class Monster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

//    FOREIGN KEY TO monster_imgs

    public Monster(){
    }

    public Monster(Long id, String name) {
        this.id = id;
        this.name = name;
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
}
