// Enemies our player must avoid
class Enemy {
    // The image/sprite for our enemies
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.x = -101;
        this.y = this.randomRow();
        this.speed = this.randomSpeed();
    }


    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {

        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        const newX = this.x + this.speed * dt;

        if (newX > 505) {
            this.x = -101;
            this.y = this.randomRow();
            this.speed = this.randomSpeed();
        } else {
            this.x = newX;
        }

        // Handle collisions, trigger if the player is within
        // enemy's dimensions. Numerical values below are used to
        // fine tune collision rectangles.
        if (this.row === player.row && this.x + 75 >= player.x && this.x <= player.x + 70) {
            player.reset();
            player.score = 0;
            player.renderScore();
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Get random row (y) position.
    randomRow() {
        this.row = Math.floor(Math.random() * 100) % 3 + 1;
        return 83 *  this.row - 21;
    }

    // Get random speed value
    randomSpeed() {
        return 130 + Math.floor(Math.random() * 1000) % 331;
    }
};


// Player class
class Player {

    constructor() {
        // Player image
        this.sprite = 'images/char-boy.png';
        // Initial location
        this.row = 5;
        this.startX = 101 * 2; // 3rd column
        this.startY = 83 * this.row - 10; // Last row
        this.score = 0;
        // Set x and y to start values
        this.reset();
    }

    // Update the player's position, validate and check victory condition.
    update() {
        // Prevent the player from going off map
        this.x = this.x > 101 * 4 ? 101 * 4 : this.x;
        this.x = this.x < 0 ? 0 : this.x;

        if (this.y > this.startY) {
            this.y = this.startY;
            this.row -= 1;
        }

        // Victory condition
        if (0 === this.row) {
            this.reset();
            this.score += 1;
            this.renderScore();
        }
    }

    // Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Move the player according to pressed keys.
    handleInput(key) {
        switch (key) {
            case 'left':
                this.x -= 101;
                break;
            case 'right':
                this.x += 101;
                break;
            case 'up':
                this.y -= 83;
                this.row -= 1;
                break;
            case 'down':
                this.y += 83;
                this.row += 1;
        }
    }

    // Set x and y coordinates back to start values.
    reset() {
        this.row = 5;
        this.x = this.startX;
        this.y = this.startY;
    }

    renderScore() {
        document.querySelector('.score').textContent = this.score;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [new Enemy(), new Enemy(), new Enemy()];
const player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
