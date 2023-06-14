package com.example.capstoneprojectteam3.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

//    @Column(name = "hp")
//    private int hp;  // New property for representing HP

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "monster_img_id")
    private Monster monster;

    // Constructors

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

    // Getters and Setters

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
//        updateImageBasedOnHP();  // Call the method to update the image based on the new monster stage
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

//    private void updateImageBasedOnHP() {
//        MonsterImage monsterImage = getMonsterImages();
//        int currentHP = getHp();
//        int currentStage = monsterImage.getMonster_stage();
//
//        if (currentHP > 76) {
//            if (currentStage != 1) {
//                monsterImage.setMonster_stage(1);
//                monsterImagesDao.save(monsterImage);
//            }
//        } else if (currentHP > 51) {
//            if (currentStage != 2) {
//                monsterImage.setMonster_stage(2);
//                monsterImagesDao.save(monsterImage);
//            }
//        } else if (currentHP > 26) {
//            if (currentStage != 3) {
//                monsterImage.setMonster_stage(3);
//                monsterImagesDao.save(monsterImage);
//            }
//        } else if (currentHP > 1) {
//            if (currentStage != 4) {
//                monsterImage.setMonster_stage(4);
//                monsterImagesDao.save(monsterImage);
//            }
//        } else {
//            if (currentStage != 5) {
//                monsterImage.setMonster_stage(5);
//                monsterImagesDao.save(monsterImage);
//            }
//        }
//    }

}
