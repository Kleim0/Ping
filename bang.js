const canvas = document.getElementById("canvas"); // gay shit
const c = canvas.getContext("2d");
const popup = document.getElementById("start");
const leftScore = document.getElementById("leftScore");
const rightScore = document.getElementById("rightScore");
const paddleH = 40;
const paddleW = 5;
let paddleC = "#191a1a"
let quarkC = "#f0f6f0"
let quarkR = 5;
let speed = 2;

canvas.width = window.innerWidth * 0.50; // canvas declarations
canvas.height = window.innerHeight * 0.50;
const cw = canvas.width;
const ch = canvas.height;
canvas.style.display = "none" // dissapere like ur dad
rightScore.style.display = "none"
leftScore.style.display = "none"

let paused = true;

function getMilk() { // basically just starting ong fam just like minecraft new world
    popup.style.display = "none";
    canvas.style.display = "block"
		rightScore.style.display = "block"
		leftScore.style.display = "block"
    paused = false;
		quark.reset()
    requestAnimationFrame(doShit);
}

function middleGuy() { // line in da middle
    c.lineWidth = 2;
    c.strokeStyle = "#1e1f1f";
    c.setLineDash([ch/21, ch/21]);
    c.beginPath();
    c.moveTo(cw/2, 0);
    c.lineTo(cw/2, ch);
    c.stroke();
} // dashed line in da middle

let leftPaddle = {
	x: paddleH/2,
	y: ch/2 - paddleH/2,
	speed: 0,
	width: paddleW,
	height: paddleH,
	up: false,
	down: false,
	score: 0,

	draw: function(){
			c.fillStyle = paddleC;
			c.beginPath();
			c.rect(this.x, this.y, this.width, this.height);
			c.fill();
			c.closePath();
	},

	update: function(){
		if (this.up && this.y > 1) {
			this.speed = -speed;
		} else if (this.down && this.y + this.height < ch -1) {
			this.speed = speed;
		} else {
			this.speed = 0;
		}
			this.y += this.speed;
			this.draw()
	},
};

let rightPaddle = {
	x: cw - paddleH/2 - paddleW,
	y: ch/2 - paddleH/2,
	speed: 0,
	width: paddleW,
	height: paddleH,
	up: false,
	down: false,
	score: 0,

	draw: function(){
			c.fillStyle = paddleC;
			c.beginPath();
			c.rect(this.x, this.y, this.width, this.height);
			c.fill();
			c.closePath();
	},

	update: function(){
		if (this.up && this.y > 1) {
			this.speed = -speed;
		} else if (this.down && this.y + this.height < ch -1) {
			this.speed = speed;
		} else {
			this.speed = 0;
		}
			this.y += this.speed;
			this.draw()
	},
};

let quark = {
    x: cw/2,
    y: ch/2,
    dx: 0,
    dy: 0,
    radius: quarkR,
    color: 0,

    update: function(){
        if (this.y + this.radius + this.dy >= ch || this.y - this.radius + this.dy <= 0) { // roof bounce
            this.dy = -this.dy;
        }

        if (this.x + this.radius + this.dx >= rightPaddle.x && this.y + this.dy > rightPaddle.y && this.y + this.dy < rightPaddle.y + paddleH && this.dx > 0) {
            this.dx = -this.dx;
						this.dx -= Math.abs(rightPaddle.speed/8);
						this.dy += rightPaddle.speed/4
            console.log("right bounce")
        } else if (this.x - this.radius + this.dx <= leftPaddle.x + paddleW && this.y + this.dy > leftPaddle.y && this.y + this.dy < leftPaddle.y + paddleH && this.dx < 0) {
            this.dx = -this.dx;
						this.dx += Math.abs(leftPaddle.speed/8);
						this.dy += leftPaddle.speed/4
						
            console.log("left bounce")
				} else if (this.x + this.radius + this.dx >= cw) {
            console.log("Left wins")
						leftPaddle.score += 1;
						leftScore.innerHTML = leftPaddle.score;
            this.reset()
        } else if (this.x - this.radius + this.dx <= 0) {
            console.log("right wins")
						rightPaddle.score += 1;
						rightScore.innerHTML = rightPaddle.score;
            this.reset()
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw()
    },

    draw: function(){
        c.fillStyle = quarkC;
        c.beginPath();
        c.arc(this.x, this.y, quarkR, Math.PI*2, 0);
        c.fill();
        c.closePath();
    },

    reset: function(){
        let k = Math.random() < 0.5 ? -1 : 1;
        this.x = cw/2;
        this.y = ch/2;
        this.dx = 1.5 * k;
        this.dy = 0;
    },
} // ball

window.addEventListener("keydown", function(event) {
	switch (event.key) {
		case "w":
			leftPaddle.up = true;
			break;
		case "s":
			leftPaddle.down = true;
			break;
		case "ArrowUp":
			rightPaddle.up = true;
			break;
		case "ArrowDown":
			rightPaddle.down = true;
			break;
		case " ":
			paused = !paused;
			console.log(paused)
	}
}) // Keydown handler
window.addEventListener("keyup", function(event) {
	console.log(event)
		switch (event.key) {
		case "w":
			leftPaddle.up = false;
			break;
		case "s":
			leftPaddle.down = false;
			break;
		case "ArrowUp":
			rightPaddle.up = false;
			break;
		case "ArrowDown":
			rightPaddle.down = false;
			break;
		}
}) // Keyup handler

function doShit() {
  if (!paused) {
        c.clearRect(0, 0, cw, ch)
	      quark.update()
        rightPaddle.update()
        leftPaddle.update()
        middleGuy()
       }
	requestAnimationFrame(doShit);
} //render function
requestAnimationFrame(doShit);