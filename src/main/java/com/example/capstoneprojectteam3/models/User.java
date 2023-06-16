package com.example.capstoneprojectteam3.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="users")
public class User{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	@Column(nullable=false, unique=true)
	private String email;

	@Column(nullable=false, length=50, unique=true)
	private String username;

	@JsonIgnore
	@Column(nullable=false)
	private String password;

	@Column
	private String avatarImage;

	@Column
	private String backgroundImage;

	@Column(name="battles_complete")
	private int battlesComplete;

	@ManyToMany(cascade=CascadeType.PERSIST)
	@JoinTable(name="user_badge",
			joinColumns=@JoinColumn(name="user_id"),
			inverseJoinColumns=@JoinColumn(name="badge_id"))
	private List<Badge> badges;


	@OneToMany(cascade=CascadeType.PERSIST, mappedBy="user")
	private List<Battle> battles;


//    ----- Constructors START -----

	public User(){
	}

	public User(String username, String email, String password, String avatarImage){
		this.email = email;
		this.username = username;
		this.password = password;
		this.avatarImage = avatarImage;
	}

	public User(String username, String email, String password, String avatarImage, String backgroundImage){
		this.email = email;
		this.username = username;
		this.password = password;
		this.avatarImage = avatarImage;
		this.backgroundImage = backgroundImage;
	}

	public User(String username, String email, String password, String avatarImage, String backgroundImage, int battlesComplete){
		this.email = email;
		this.username = username;
		this.password = password;
		this.avatarImage = avatarImage;
		this.backgroundImage = backgroundImage;
		this.battlesComplete = battlesComplete;
	}

	public User(String username, String email, String password){
		this.email = email;
		this.username = username;
		this.password = password;
	}

	public User(long id, String username, String email, String password){
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public User(String email, String username, String password, String avatarImage, String backgroundImage, int battlesComplete, List<Badge> badges, List<Battle> battles){
		this.email = email;
		this.username = username;
		this.password = password;
		this.avatarImage = avatarImage;
		this.backgroundImage = backgroundImage;
		this.battlesComplete = battlesComplete;
		this.badges = badges;
		this.battles = battles;
	}

	public User(long id, int battlesComplete){
		this.id = id;
		this.battlesComplete = battlesComplete;
	}

	//    ----- Getters and Setters START -----

	public long getId(){
		return id;
	}

	public void setId(long id){
		this.id = id;
	}

	public String getEmail(){
		return email;
	}

	public void setEmail(String email){
		this.email = email;
	}

	public String getUsername(){
		return username;
	}

	public void setUsername(String username){
		this.username = username;
	}

	public String getPassword(){
		return password;
	}

	public void setPassword(String password){
		this.password = password;
	}

	public String getAvatarImage(){
		return avatarImage;
	}

	public void setAvatarImage(String avatarImage){
		this.avatarImage = avatarImage;
	}

	public String getBackgroundImage(){
		return backgroundImage;
	}

	public void setBackgroundImage(String backgroundImage){
		this.backgroundImage = backgroundImage;
	}

	public List<Badge> getBadges(){
		return badges;
	}

	public void setBadges(List<Badge> badges){
		this.badges = badges;
	}

	public List<Battle> getBattles(){
		return battles;
	}

	public void setBattles(List<Battle> battles){
		this.battles = battles;
	}

	public void addBadge(Badge badge){
		this.badges.add(badge);
	}

	public int getBattlesComplete(){
		return battlesComplete;
	}

	public void setBattlesComplete(int battlesComplete){
		this.battlesComplete = battlesComplete;
	}


	//    ----- Getters and Setters END -----
}
