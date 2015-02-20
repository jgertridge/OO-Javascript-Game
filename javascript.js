/*
Purpose: Experimenting with object oriented javascript using prototypes. 
Creator: Jeremy Gertridge
Version: 2015.02.20
*/

/* CLASS SHIELD */
function Shield(ctx){
	this.context = ctx;
	
	this.x = 0;
	this.y = 0;
	this.radius = 0;
}

Shield.prototype.GetX = function(){return this.x;};
Shield.prototype.GetY = function(){return this.y;};
Shield.prototype.GetRadius = function(){return this.radius;};

Shield.prototype.SetRadius = function(value){this.radius = value;};

Shield.prototype.MoveTo = function(x, y){
	this.x = x;
	this.y = y;
};

Shield.prototype.Draw = function(){
	this.context.beginPath();
	this.context.arc(this.x,this.y,this.radius,0,2*Math.PI);
	this.context.strokeStyle = '#DBA901';
	this.context.stroke();
};


/* END SHIELD */

/* CLASS PLAYER */
function Player(ctx){
	this.context = ctx;
	
	this.score = 0;
	this.status = "alive";
	
	this.x = 400;
	this.y = 300;
	this.radius = 25;
	this.leftVelocity = 0;
	this.rightVelocity = 0;
	this.upVelocity = 0;
	this.downVelocity = 0; 
	this.radiusIncreaseRate = 0;
	this.radiusDecreaseRate = 0;
}

Player.prototype.GetScore = function(){return Math.floor(this.score);};
Player.prototype.GetStatus = function(){return this.status;};
Player.prototype.GetX = function(){return this.x;};
Player.prototype.GetY = function(){return this.y;};
Player.prototype.GetRadius = function(){return this.radius;};
Player.prototype.GetRadiusVelocity = function(){return this.radiusVelocity;};

Player.prototype.SetStatus = function(value){this.status = value;};
Player.prototype.SetX = function(value){this.x = value;};
Player.prototype.SetY = function(value){this.y = value;};
Player.prototype.SetRadius = function(value){this.radius = value;};
Player.prototype.SetLeftVelocity = function(value){this.leftVelocity = value;};
Player.prototype.SetUpVelocity = function(value){this.upVelocity = value;};
Player.prototype.SetRightVelocity = function(value){this.rightVelocity = value;};
Player.prototype.SetDownVelocity = function(value){this.downVelocity = value;};
Player.prototype.SetRadiusIncreaseRate = function(value){this.radiusIncreaseRate = value;};
Player.prototype.SetRadiusDecreaseRate = function(value){this.radiusDecreaseRate = value;};

Player.prototype.IncreaseScore = function(value){this.score += value;};

Player.prototype.Draw = function(){
	this.context.beginPath();
	this.context.arc(this.x,this.y,this.radius,0,2*Math.PI);
	this.context.strokeStyle = ' #0040FF';
	this.context.stroke();
	this.context.fillStyle = "#0040FF";
	this.context.fill();
	
};

Player.prototype.MoveTo = function(x, y){
	this.x = x;
	this.y = y;
};

Player.prototype.Move = function(){
	if(this.x + (this.rightVelocity - this.leftVelocity) - this.radius > 0 
	&& this.x + (this.rightVelocity - this.leftVelocity) + this.radius < 800){
		this.x += (this.rightVelocity - this.leftVelocity);
	}
	
	if(this.y + (this.downVelocity - this.upVelocity) - this.radius > 0 
	&& this.y + (this.downVelocity - this.upVelocity) + this.radius < 600){
		this.y += (this.downVelocity - this.upVelocity);	
	}
	
	if(this.radius + (this.radiusIncreaseRate - this.radiusDecreaseRate) <= 50 
	&& this.radius + (this.radiusIncreaseRate - this.radiusDecreaseRate) >= 10){
		this.radius += (this.radiusIncreaseRate - this.radiusDecreaseRate);
		
		//adjust position if next to the edge.
		if(this.x - this.radius < 0){
			this.x = this.radius;
		}
		if(this.x + this.radius > 800){
			this.x = 800 - this.radius;
		}
		if(this.y - this.radius < 0){
			this.y = this.radius;
		}
		if(this.y + this.radius > 600){
			this.y = 600 - this.radius;
		}
	}
	
	
}

/* END PLAYER */

/* CLASS ENEMY */
function Enemy(ctx){
	this.context = ctx;
	
	this.x = 95;
	this.y = 50;
	this.radius = 40;
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.type = "normal";
	
}

Enemy.prototype.GetX = function(){return this.x;};
Enemy.prototype.GetY = function(){return this.y;};
Enemy.prototype.GetRadius = function(){return this.radius;};
Enemy.prototype.GetType = function(){return this.type;};

Enemy.prototype.SetX = function(value){this.x = value;};
Enemy.prototype.SetY = function(value){this.y = value;};
Enemy.prototype.SetRadius = function(value){this.radius = value;};
Enemy.prototype.SetXVelocity = function(value){this.xVelocity = value;};
Enemy.prototype.SetYVelocity = function(value){this.yVelocity = value;};
Enemy.prototype.SetType = function(value){this.type = value;};

Enemy.prototype.Draw = function(){
	this.context.beginPath();
	this.context.arc(this.x,this.y,this.radius,0,2*Math.PI);
	
	if(this.type == "shield"){
		this.context.strokeStyle = "#DBA901";
		this.context.fillStyle = "#DBA901";
	} else
	if(this.type == "normal"){
		this.context.fillStyle = "#B40404";
		this.context.strokeStyle = "#B40404";
	} else
	if(this.type == "purple"){
		this.context.fillStyle = "#380B61";
		this.context.strokeStyle = "#380B61";
	}
	
	this.context.stroke();
	this.context.fill();
	
};

Enemy.prototype.MoveTo = function(x, y){
	this.x = x;
	this.y = y;
};

Enemy.prototype.Move = function(){
	this.x += this.xVelocity;
	this.y += this.yVelocity;	
}

/* END ENEMY */

/* CLASS GAME */
function Game(){
	this.canvas = document.getElementById("mainCanvas");
	this.context = this.canvas.getContext("2d");
	this.output = new Array(
		"Use the X key to decrease your size.", 
		"Use the Z key to increase your size.", 
		"Use the directional keys to move.",
		"Collide with smaller circles to increase score."
	);
	
	this.player = new Player(this.context);
	this.shield = new Shield(this.context);
	this.enemies = new Array();
	
	window.addEventListener("keydown", this.HandleInput, true);
}

Game.prototype.GetPlayer = function(){return this.player;};

Game.prototype.GetOutput = function(){
	var lastFiveLines = "";
	var messages = this.output.length;
	
	if(messages > 5){
		messages = 5;
	}
	
	for(var i = this.output.length - 1; i > ((this.output.length - 1) - messages); i--){
		lastFiveLines += this.output[i];
		lastFiveLines += "<br />";
	}
	
	document.getElementById("outputDisplay").innerHTML = lastFiveLines;
};

Game.prototype.Run = function(){
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	if(this.player.GetStatus() != "dead"){
		this.player.Move();
		this.player.Draw();
		
		if(this.player.GetStatus() == "shielded"){
			this.shield.SetRadius(this.player.GetRadius() + 6);
			this.shield.MoveTo(this.player.GetX(), this.player.GetY());
			this.shield.Draw();
		}
	}
	
	this.CleanEnemies();
	this.SpawnEnemies();
	
	for(var e = 0; e < this.enemies.length; e++){
		this.enemies[e].Move();
	}
	
	for(var i = 0; i < this.enemies.length; i++){
		this.enemies[i].Draw();
	}
	
	if(this.player.GetStatus() != "dead"){this.player.IncreaseScore(0.001);}	
};

Game.prototype.HandleKeyDown = function(e){
	if(e.keyCode == "37"){
		this.player.SetLeftVelocity(2);
	}
	if(e.keyCode == "38"){
		this.player.SetUpVelocity(2);
	}
	if(e.keyCode == "39"){
		this.player.SetRightVelocity(2);
	}
	if(e.keyCode == "40"){
		this.player.SetDownVelocity(2);
	}
	if(e.keyCode == "90"){
		this.player.SetRadiusIncreaseRate(0.15);
	}
	if(e.keyCode == "88"){
		this.player.SetRadiusDecreaseRate(0.15);
	}

};

Game.prototype.HandleKeyUp = function(e){	
	if(e.keyCode == "37"){
		this.player.SetLeftVelocity(0);
	} else
	if(e.keyCode == "38"){
		this.player.SetUpVelocity(0);
	} else
	if(e.keyCode == "39"){
		this.player.SetRightVelocity(0);
	} else
	if(e.keyCode == "40"){
		this.player.SetDownVelocity(0);
	} else
	if(e.keyCode == "90"){
		this.player.SetRadiusIncreaseRate(0);
	} else
	if(e.keyCode == "88"){
		this.player.SetRadiusDecreaseRate(0);
	}
};

Game.prototype.CleanEnemies = function(){
	for(var i = 0; i < this.enemies.length; i++){
		//delete the enemy if it is outside of the bounds.
		if(this.enemies[i].GetX() < -300 || this.enemies[i].GetX() > 1100 
		|| this.enemies[i].GetY() < -300 || this.enemies[i].GetY() > 900){
			var index = this.enemies.indexOf(this.enemies[i]);
			if(index > -1){
				this.enemies.splice(index, 1);
			}
		} else
		if(this.player.GetStatus() != "dead"){
			var xDifference = this.enemies[i].GetX() - this.player.GetX();
			if(xDifference < 0){xDifference *= -1;}
			
			var yDifference = this.enemies[i].GetY() - this.player.GetY();
			if(yDifference < 0){yDifference *= -1;}
			
			var distanceFromPlayer = Math.sqrt((Math.pow(xDifference, 2)) + (Math.pow(yDifference, 2))); 
			if(this.player.GetStatus() == "shielded"){distanceFromPlayer -= 6;}
			
			//delete the enemy if it is touching a player that is larger than it.
			if(distanceFromPlayer <= this.enemies[i].GetRadius() + this.player.GetRadius()){
				if(this.player.GetRadius() > this.enemies[i].GetRadius()){
					if(this.enemies[i].GetType() == "shield"){
						this.player.SetStatus("shielded");
					}
					
					this.player.IncreaseScore(this.GetScoreGain(i));
					
					var index = this.enemies.indexOf(this.enemies[i]);
					if(index > -1){
						this.enemies.splice(index, 1);
					}
				} else
				if(this.player.GetRadius() < this.enemies[i].GetRadius()){
					if(this.player.GetStatus() == "shielded"){
						this.player.IncreaseScore(this.GetScoreGain(i));
						
						var index = this.enemies.indexOf(this.enemies[i]);
						if(index > -1){
							this.enemies.splice(index, 1);
						}
					
						this.player.SetStatus("alive");
						this.output.push("Your shield saved you!");
					} else{
						this.player.SetStatus("dead");
						this.output.push("You have died! Press the F5 to try again.");
					}
				} else
				if(this.player.GetRadius() == this.enemies[i].GetRadius()){
					this.player.IncreaseScore(this.GetScoreGain(i));
					
					var index = this.enemies.indexOf(this.enemies[i]);
					if(index > -1){
						this.enemies.splice(index, 1);
					}
					
					if(this.player.GetStatus() == "shielded"){
						this.player.SetStatus("alive");
						this.output.push("Your shield saved you!");
					} else{
						this.player.SetStatus("dead");
						this.output.push("You have died! Press the F5 to try again.");
					}
				}
			}
		}
	}
	
};

Game.prototype.SpawnEnemies = function(){	
	if(this.enemies.length < Math.floor(this.player.GetScore() / 10) + 3){
		for(var i = this.enemies.length - 1; i < Math.floor(this.player.GetScore() / 10) + 3; i++){
			var enemy = new Enemy(this.context);
			
			var spawnPoint = Math.floor(Math.random() * 4);
			
			if(spawnPoint == 0){
				enemy.MoveTo(-100, Math.random() * 600);
				enemy.SetXVelocity((Math.random() * 2) + 0.5);
				enemy.SetYVelocity(Math.random() * 0.5);
			} else
			if(spawnPoint == 1){
				enemy.MoveTo(Math.random() * 800, -100);
				enemy.SetXVelocity(Math.random() * 0.5);
				enemy.SetYVelocity((Math.random() * 2) + 0.5);
			} else
			if(spawnPoint == 2){
				enemy.MoveTo(900, Math.random() * 600);
				enemy.SetXVelocity((Math.random() * -2) + 0.5);
				enemy.SetYVelocity(Math.random() * -0.5);
			} else
			if(spawnPoint == 3){
				enemy.MoveTo(Math.random() * 800, 700);
				enemy.SetXVelocity(Math.random() * -0.5);
				enemy.SetYVelocity((Math.random() * -2) + 0.5);
			}
			
			enemy.SetRadius((Math.random() * 65) + 5);
			
			if(enemy.GetRadius() <= 15){
				var type = Math.random();
				if(type > 0.50){
					enemy.SetType("shield");
				}
			}
			if(enemy.GetRadius() > 60){
				var type = Math.random();
				if(type > 0.90){
					enemy.SetType("purple");
				}
			}
			
			this.enemies.push(enemy);
		}
	}
	
};

Game.prototype.GetScoreGain = function(enemy){
	var result = 0;
	
	if(this.enemies[enemy].GetType() == "shield"){
		result = 2;
	} else
	if(this.enemies[enemy].GetType() == "purple"){
		result = 20;
	} else{
		result = 1;
	}
	
	return result;
};

/* END GAME */















