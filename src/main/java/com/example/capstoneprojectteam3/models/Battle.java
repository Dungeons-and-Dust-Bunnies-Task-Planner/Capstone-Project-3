package com.example.capstoneprojectteam3.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name="battles")
public class Battle{

	// SETS SPECIFIC VALUES FOR BATTLE STATUS
	// TAKES THE CLASS OF THE BATTLE, AND CONVERTS IT INTO EITHER A 0 OR 1 TO COMPLY WITH MYSQL'S BOOLEAN REQUIREMENTS OF 0 OR 1 INSTEAD OF TRUE OR FALSE
	public enum BattleStatus{
		inactive(0),
		active(1);

		private final int value;

		BattleStatus(int value){
			this.value = value;
		}

		public int getValue(){
			return value;
		}
	}


	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(nullable=false)
	private String title;

	@Column
	@Enumerated(EnumType.STRING)
	private BattleStatus status;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;

	@JsonIgnore
	@OneToOne
	@JoinColumn(name="monster_id")
	private Monster monster;

//	@JsonIgnore
	@OneToMany(cascade=CascadeType.ALL, mappedBy="battle")
	private List<Task> tasks;

//    @Column(nullable = false)
//    private String battleImage;
//
//    public String getBattleImage() {
//        return battleImage;
//    }
//
//    public void setBattleImage(String battleImage) {
//        this.battleImage = battleImage;
//    }


	//    ----- Constructors START -----

	public Battle(){}

	public Battle(User user, Monster monster, List<Task> tasks){
		this.user = user;
		this.monster = monster;
		this.tasks = tasks;
	}

	public Battle(User user, Monster monster){
		this.user = user;
		this.monster = monster;
	}

	public Battle(Long id, User user, Monster monster, List<Task> tasks, BattleStatus status){
		this.id = id;
		this.user = user;
		this.monster = monster;
		this.tasks = tasks;
		this.status = status;
	}

	//    ----- Constructors END -----

	//    ----- Getters and Setters START -----


	public String getTitle(){
		return title;
	}

	public void setTitle(String title){
		this.title = title;
	}

	public void setId(Long id){
		this.id = id;
	}

	public Long getId(){
		return id;
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

	public BattleStatus getStatus(){
		return status;
	}

	public void setStatus(BattleStatus status){
		this.status = status;
	}

//    ----- Getters and Setters END -----
}
