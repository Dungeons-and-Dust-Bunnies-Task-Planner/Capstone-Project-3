package com.example.capstoneprojectteam3.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="battles")
public class Battle{


	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(nullable=false)
	private String title;

	@Column(nullable = false)
	private Long status;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="monster_id")
	private Monster monster;

//	@JsonIgnore
	@OneToMany(cascade=CascadeType.ALL, orphanRemoval = true, mappedBy="battle")
	private List<Task> tasks;

	//    ----- Constructors START -----

	public Battle(){}

	public Battle(String title, Long status, User user, Monster monster, List<Task> tasks){
		this.title = title;
		this.status = status;
		this.user = user;
		this.monster = monster;
		this.tasks = tasks;
	}

	public Battle(String title, Long status, User user, Monster monster){
		this.title = title;
		this.status = status;
		this.user = user;
		this.monster = monster;
	}

	public Battle(String title, Long status, User user){
		this.title = title;
		this.status = status;
		this.user = user;
	}


	public Long getId(){
		return id;
	}

	public void setId(Long id){
		this.id = id;
	}

	public String getTitle(){
		return title;
	}

	public void setTitle(String title){
		this.title = title;
	}

	public Long getStatus(){
		return status;
	}

	public void setStatus(Long status){
		this.status = status;
	}

	public User getUser(){
		return user;
	}

	public void setUser(User user){
		this.user = user;
	}

	public Monster getMonster(){
		return monster;
	}

	public void setMonster(Monster monster){
		this.monster = monster;
	}

	public List<Task> getTasks(){
		return tasks;
	}

	public void setTasks(List<Task> tasks){
		this.tasks = tasks;
	}

	//    ----- Getters and Setters END -----
}
