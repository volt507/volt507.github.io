// Global variables
var game_state = 'char_select'; // sets the state of the game. Char_select is the menu screen where the user selects a character
var allEnemies; // array of enemies
var allKeys; // array of keys for player to cllect
var heart;  // amount of lives the user has
var player; // player 
var star; // goal after collecting keys
var stage; // keeps track of the stage

// Creates the Key function to generate the keys for the user to pick up
var Key = function() {
    this.x = this.x_position();
    this.y = this.y_position();
    this.sprite = 'images/Key.png';
    return this;
}

// function to randomly select the x position of the key
Key.prototype.x_position = function() {
    var del_x = Math.floor(Math.random()*10);
    var init_x = 0;
    if (del_x <=1) {
        init_x;
    }
    else if (del_x >= 2 && del_x <=3) {
        init_x += 100;   
    }
    else if (del_x >= 4 && del_x <=5) {
        init_x += 200;   
    }
    else if (del_x >= 6 && del_x <=7) {
        init_x += 300;   
    }
    else if (del_x >= 8 && del_x <=9) {
        init_x += 400;   
    }
    return init_x; 
       
}

// function to randomly generate the y cooridnates of the keys
Key.prototype.y_position = function() {
    var del_y = Math.floor(Math.random()*10);
    
    var init_y = 60;  

    if (del_y <= 3) {
        init_y; 
    }
    else if (del_y > 3 && del_y <7){
        init_y += init_y+25;
    }

    else if (del_y >= 7) {
         init_y += (init_y + 110); 
    }

    return  init_y;   
}

//updates the keys: checks to make sure that no keys end up on the same tile
Key.prototype.update = function() {
    if (allKeys.length > 1) { // only check if there is more than one key on canvas
        if (allKeys[0].x === allKeys[1].x && allKeys[0].y === allKeys[1].y) {
            if(allKeys[0].y <225) {
                allKeys[1].y += 85; // change the y coordinate of the second key if they spawn in same location 
            } 
            else {
                allKeys[1].y -=85; 
            }
        }   
    }
}

Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -50; //set variable to be outside of canvas
    this.y = this.y_position(); 
    this.sprite = 'images/enemy-bug.png';
    this.speed = this.velocity();
    return this; 
}

// ranodomly generate the y position of the bugs 
Enemy.prototype.y_position = function() {
    var del_y = Math.floor(Math.random()*10);
    
    var init_y = 60;  
    //var y_loc = 0; 

    if (del_y <= 3) {
        init_y; 
    }
    else if (del_y > 3 && del_y <7){
        init_y += init_y+25;
    }

    else if (del_y >= 7) {
         init_y += (init_y + 105); 
    }

    return  init_y;   
}
// function to randomly generate the velocity of the enemy
Enemy.prototype.velocity = function() {
    var speed = Math.floor(Math.random()*100 + 200);
    return speed; 
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt; 

    if (this.x > 505) {
        this.x = -50;
        this.speed = this.velocity();
        // this will cause the position of the bug to change on the y axis once it's x coordinate is outside the canvas
        this.y = this.y_position(); 
    }   
}    


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(char_img,x,y) {
    this.x = x; 
    this.y = y; 
    this.sprite = char_img;
    this.x_mov = 0;
    this.y_mov = 0; 
    this.col_num = 0;

    return this; 
}

Player.prototype.update = function() {
    this.x += this.x_mov;
    this.y += this.y_mov; 

    if(this.x > 401){
        this.x = 401;
    }
    else if(this.x < 1){
        this.x = 1;
    }
    else if(this.y > 400){
        this.y = 400;
    }
    else if(this.y < -20){
        player.y = -15;
    }
    // need to reset it to zero so next input is not combined as one value
    this.x_mov = 0;
    this.y_mov = 0;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// controls the player's movements
Player.prototype.handleInput = function(loc) {
    if(loc === "up"){
        this.y_mov = -83;
    }
    else if(loc === "down"){
        this.y_mov = 83;
    }
    else if(loc === "right"){
        this.x_mov = 100;
    }
    else if(loc === "left"){
        this.x_mov = -100;
    }
}

// creates the heart object to track the number of lives the user has 
var Heart = function(lives) {
    this.x = 505;
    this.y = 10;
    this.lives = lives; 
    this.sprite = 'images/heart1.png';
}


Heart.prototype.render = function() {
    ctx.fillStyle = "black";
    ctx.font = "bold 25px sans-serif";
    ctx.fillText('Lives:', 300, this.y+30);
    for (i=0; i<this.lives; i++)
    ctx.drawImage(Resources.get(this.sprite), (this.x-(i+1)*25), this.y);
}

// creates object that user has to try reach after collecting all the keys

var Star = function() {
    this.x = this.x_position();
    this.y = -10;
    this.sprite = 'images/Star.png';
}

// function to randomly generate the x position of the star once it is rendered
Star.prototype.x_position = function() {
    var del_x = Math.floor(Math.random()*10);
    var init_x = 0;
    if (del_x <=1) {
        init_x;
    }
    else if (del_x >= 2 && del_x <=3) {
        init_x += 100;   
    }
    else if (del_x >= 4 && del_x <=5) {
        init_x += 200;   
    }
    else if (del_x >= 6 && del_x <=7) {
        init_x += 300;   
    }
    else if (del_x >= 8 && del_x <=9) {
        init_x += 400;   
    }
    return init_x; 
}

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//object to track what level the user is on
var Stage = function(level) {
    this.x = 5;
    this.y = 40;
    this.level = level;   
}

Stage.prototype.render = function() {
    ctx.fillStyle = "black";
    ctx.font = "bold 25px sans-serif";
    ctx.textAlign = "left"; 
    ctx.fillText('Level: ' + this.level, this.x, this.y);
}

/* -- THIS IS WHERE ALL THE GAME STATE FUNCTIONS ARE */

/* this function is to render the game mode where the user gets to select which character to use. 
at this point the game_state = 'char_select' */
var selectChar = function() {
    y_char = 225;

    this.char_arr = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];

    this.char_arr_x =[];
    this.char_arr_y = [];
    for (i = 0; i<this.char_arr.length; i++) {
        this.char_arr_x[i] = i*100; 
    }

    for (i = 0; i<this.char_arr.length; i++) {
        this.char_arr_y[i] = y_char; 
    }
    // selector appears under the character the user is over to indicate which one is being selected
    this.sprite = 'images/Selector.png';
    this.x = 0;
    this.y = 210;
    this.x_mov = 0;
    this.y_mov = 0; 
    return this; 
 }


selectChar.prototype.render = function() {
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = "bold 48px sans-serif";
    ctx.fillText('Select a Character', ctx.canvas.width/2, ctx.canvas.height/6);
    ctx.font = "15px sans-serif";
    ctx.fillText('Press the up arrow once you have selected a character', ctx.canvas.width/2, ctx.canvas.height/4.9);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    for (i = 0; i < this.char_arr.length; i++ ) {
        ctx.drawImage(Resources.get(this.char_arr[i]), this.char_arr_x[i], this.char_arr_y[i]);
    }
 }
// this funtion will move the selector object around
 selectChar.prototype.update = function() {
    this.x += this.x_mov;

    if(this.x > 400){
        this.x = 400;
    }
    else if(this.x < 0){
        this.x = 0;
    }

    this.x_mov = 0;
 }
/* Once the user selects the character after pressing up the index from the array is returned
and the image file is saved. This will be passed to the player object. The game is now ready to be played
so now game_state = game_start where the function gamePlay will now instaniate the enemy, player, and heart objects.
*/
 selectChar.prototype.handleInput = function(loc) {
    if(loc === "up"){
        for (i=0; i<this.char_arr.length; i++) {
            if(this.x === this.char_arr_x[i]) {
                this.index_val = this.char_arr_x.indexOf(this.char_arr_x[i]);
                this.char_sprite = this.char_arr[this.index_val];
            }
        }
        game_state = "game_start";
    }

    else if(loc === "right"){
        this.x_mov = 100;
    }
    else if(loc === "left"){
        this.x_mov = -100;
    }
}

/* object for once the user runs out of lives and is on the game over screen.
At this point game_state = 'end'
*/
var GameOver = function() {
}

GameOver.prototype.render = function() {
    if (game_state == 'end') {
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.font = "bold 48px sans-serif";
        ctx.fillText('GAME OVER', ctx.canvas.width/2, ctx.canvas.height/6);
        ctx.fillStyle = "black";
        ctx.font = "bold 36px sans-serif";
        ctx.fillText('You got to level: ' + stage.level, ctx.canvas.width/2, 250);
        ctx.font = "15px sans-serif";
        ctx.fillText('Press the up arrow to try again', ctx.canvas.width/2, 275);
    }
}

/* to restart the game the user will press the up button. 
At this point the game state will return to 'char_select' which is state of the game at the start
*/
GameOver.prototype.handleInput = function(loc) {
    if(loc === "up"){
        game_state = 'char_select';
    }
}


//Check for collision function

var Collision_Check = function() {
    // this portion checks to see if the player collides with the enemy. If there is a collision the player loses a life
    for (enemy in allEnemies) {
        if (Math.abs(allEnemies[enemy].x-player.x) < 50 && Math.abs(allEnemies[enemy].y-player.y) < 15) {
            player.x = 200;
            player.y = 400;
            heart.lives--; 
        }
    }
    // this portion checks to see if the player collides with the key. If there is a collision the key disappears from the allKeys array
    for (key in allKeys) {
        if (Math.abs(allKeys[key].x-player.x) < 50 && Math.abs(allKeys[key].y-player.y) < 15) {
           var key_index =  allKeys.indexOf(allKeys[key]);
           if (key_index > -1) {
                allKeys.splice(key_index,1);
           }
        }
    }
    /* game_state=keys_collect is an intermediatery game state for when the player has collected all the keys and needs to reach the goal
        if there is a collision the star array is now empty and the game goes to the next level the game_state reverts to "playing" again.
    */
    if (game_state === 'keys_collect') {
        if (Math.abs(star.x-player.x) < 50 && Math.abs(star.y-player.y) < 15) {
            star = [];
            player.x = 200;
            player.y = 400;
            game_state = 'playing';
            stage.level++; 
            for (var i = 0; i < 2; i++) { // this creates two more keys for the next level
                allKeys.push(new Key());
            }
        }  
    }
    
}

// This function is to check whether there are any lives left. If there are no it's game over and the game_state = 'end'
var lives_check = function() {
    if (heart.lives < 1) {
        game_state = 'end';
        return game_state;
    }
}

/* This function checks to see all the keys have been collected. If they are the collision function should empty out the arrays.
the game-state is now set to keys_collect (game_state = 'keys_collect') and a new star object is make that the player must reach
*/
var key_check = function() {
    if (allKeys.length == 0) {
        game_state = 'keys_collect';
        star = new Star();
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var gamePlay = function(bug_count, lives, player_x, player_y) {
    allEnemies = [];
    allKeys = [];

    for (var i = 0; i < 2; i++) { // this sets the total keys to be 2
        allKeys.push(new Key());
    }

    for (var bug = 0; bug < bug_count; bug++) {
        allEnemies.push(new Enemy());
    }
    stage = new Stage(1); 
    player = new Player(selectChar.char_sprite, player_x, player_y); 
    heart = new Heart(lives); 
    game_state = 'playing'; // once game function is made we need to set game_state to be 'playing' so appropriate rendering and updating can occur
}

var selectChar = new selectChar();
var gameOver = new GameOver();
     
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (game_state === 'playing' || game_state === 'keys_collect') {
        player.handleInput(allowedKeys[e.keyCode]);  
    }
    else if (game_state === 'char_select') {
        selectChar.handleInput(allowedKeys[e.keyCode]);  
    }

    else if (game_state === 'end') {
        gameOver.handleInput(allowedKeys[e.keyCode]);
    }
});
