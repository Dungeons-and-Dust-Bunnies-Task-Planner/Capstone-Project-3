package com.example.capstoneprojectteam3.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="monsters")
public class Monster{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(unique=true)
	private String name;

	@OneToMany(mappedBy = "monster")
	private List<Battle> battles;

	@OneToMany(cascade=CascadeType.ALL, orphanRemoval = true, mappedBy="monster")
	private List<MonsterImage> monsterImages;

	//    ----- Constructors START -----

	public Monster(){
	}

	public Monster(String name, List<Battle> battles, List<MonsterImage> monsterImages){
		this.name = name;
		this.battles = battles;
		this.monsterImages = monsterImages;
	}

	public Monster(String name){
		this.name = name;
	}

	public Long getId(){
		return id;
	}

	public void setId(Long id){
		this.id = id;
	}

	public String getName(){
		return name;
	}

	public void setName(String name){
		this.name = name;
	}

	public List<Battle> getBattles(){
		return battles;
	}

	public void setBattles(List<Battle> battles){
		this.battles = battles;
	}

	public List<MonsterImage> getMonsterImages(){
		return monsterImages;
	}

	public void setMonsterImages(List<MonsterImage> monsterImages){
		this.monsterImages = monsterImages;
	}



	//    ----- Getters and Setters END -----
}
