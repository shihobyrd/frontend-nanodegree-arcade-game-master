// Enemies our player must avoid
var Enemy = function(x, y, s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = s;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // dt = time in seconds since the last time this function was called
    // It will probably be a fraction
    this.x += this.speed * dt;

    // Reset to outside board so that it comes in
    if(this.x >= 505) {
        this.x = -101;
        this.speed = randomSpeed();
    }

    // Check player and bug's position
    if (player.playerCurrentYTile === 1) {
        // Check top bug
        checkColllision(topRowEnemy);
    } else if ( player.playerCurrentYTile === 2) {
        // Check middle bug
        checkColllision(middleRowEnemy);
    } else if ( player.playerCurrentYTile === 3) {
        // Check bottom bug
        checkColllision(bottomRowEnemy);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.playerCurrentYTile = 5;
    this.playerFaceStart = this.x + 30;
    this.playerFaceEnd = this.x + 80;
};

// It is required but not used
Player.prototype.update = function(dt) {

};

// Render player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player moves in correct direction
Player.prototype.handleInput = function(direction) {
    
    if (direction === 'left' && this.x !== 0) {
        this.x -= 101;
    } else if (direction === 'right' && this.x !== 404) {
        this.x += 101;
    } else if (direction === 'up' && this.y !== playerMaxY) {
        this.playerCurrentYTile -= 1;
        this.y -= 83;
    } else if (direction === 'down' && this.y !== playerMinY) {
        this.playerCurrentYTile += 1;
        this.y += 83;
    }

    this.playerFaceStart = this.x + 30;
    this.playerFaceEnd = this.x + 80;

    if (this.y === playerMaxY) {
        winGame();
    }
};

// Global variables
const playerInitialX = 202;
const playerInitialY = 375;
const playerMaxY = playerInitialY - 83 * 5;
const playerMinY = playerInitialY;

const yOffSet = 0;
const topRowY = 60 + yOffSet;
const middleRowY = 143 + yOffSet;
const bottomRowY = 226 + yOffSet;

const speedMultiplier = 3;
const enemyMinSpeed = 30 * speedMultiplier;
const enemyMaxSpeed = 120 *speedMultiplier;



// Create ramdom speed
function randomSpeed() {
    return Math.floor(Math.random() * (enemyMaxSpeed - enemyMinSpeed + 1)) + enemyMinSpeed;
}

// Check player and enemy collision
function checkColllision(enemy) {
    if 
        (player.playerFaceStart < enemy.x &&
        player.playerFaceEnd < enemy.x + 101 &&
        player.playerFaceEnd > enemy.x) {
            resetPlayer();
        }
    else if 
        (player.playerFaceStart > enemy.x &&
        player.playerFaceEnd > enemy.x + 101 &&
        player.playerFaceStart < enemy.x + 101) {
            resetPlayer();
        }  
    else if 
        (player.playerFaceStart > enemy.x &&
        player.playerFaceEnd < enemy.x + 101) {
            resetPlayer();
        }   
}

// Win Game
function winGame() {
    resetPlayer();
    window.alert('You won!');

}

// Reset player's position to the start point
function resetPlayer() {
    player.x = playerInitialX;
    player.y = playerInitialY;
    player.playerCurrentYTile = 5;
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const topRowEnemy = new Enemy(-101, topRowY, randomSpeed());
const middleRowEnemy = new Enemy(-101, middleRowY, randomSpeed());
const bottomRowEnemy = new Enemy(-101, bottomRowY, randomSpeed());

let allEnemies = [];
allEnemies.push(topRowEnemy);
allEnemies.push(middleRowEnemy);
allEnemies.push(bottomRowEnemy);

const player = new Player(playerInitialX, playerInitialY);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if(typeof allowedKeys[e.keyCode] === 'string') {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});