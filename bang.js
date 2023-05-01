var penis = 0;

const canvas = document.getElementById("canvas"); // gay shit
const c = canvas.getContext("2d");
const popup = document.getElementById("start");
const paddleH = 40;
const paddleW = 4;
let paddleC = "#191a1a"
let quarkC = "#f0f6f0"
let quarkR = 5;
let speed = 3;

canvas.width = window.innerWidth * 0.50; // canvas declarations
canvas.height = window.innerHeight * 0.50;
const cw = canvas.width;
const ch = canvas.height;
canvas.style.display = "none" // dissapere like ur dad

let paused = true;

function getMilk() { // basically just starting ong fam just like minecraft new world
    popup.style.display = "none";
    canvas.style.display = "block"
    paused = false;
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
}

let leftPaddle = {
    x: paddleH/2,
    y: ch/2 - paddleH/2,
    speed: 0,
    width: paddleW,
    height: paddleH,

    draw: function(){
        c.fillStyle = paddleC;
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height);
        c.fill();
        c.closePath();
    },

    update: function(){
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

    draw: function(){
        c.fillStyle = paddleC;
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height);
        c.fill();
        c.closePath();
    },

    update: function(){
        this.y += this.speed;
        this.draw()
    },
};

let quark = {
    x: cw/2,
    y: ch/2,
    dx: 5,
    dy: 2,
    radius: quarkR,
    color: 0,

    update: function(){
        if (this.y + this.radius + this.dy >= ch || this.y - this.radius + this.dy <= 0) { // roof bounce
            this.dy = -this.dy;
        }

        if ((this.x + this.radius + this.dx >= rightPaddle.x && this.x - this.radius <= rightPaddle.x + paddleW && this.y + this.dy > rightPaddle.y && this.y + this.dy < rightPaddle.y + paddleH || this.x - this.radius + this.dx <= leftPaddle.x + paddleW && this.x + this.radius >= leftPaddle.x && this.y + this.dy > leftPaddle.y && this.y + this.dy < leftPaddle.y + paddleH) && penis < 0) {
            penis = 60;
            this.dx = -this.dx;
            console.log("bounce")
        } else if (this.x + this.radius + this.dx >= cw) {
            console.log("Left wins")
            this.reset()
        } else if (this.x - this.radius + this.dx <= 0) {
            console.log("right wins")
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
        this.dx = (Math.random() * 2 + 1) * k;
        this.dy = (Math.random() * 2 + 1) * k;
    },
}

window.addEventListener("keydown", function(event){
    switch (event.key) {
        case "w":
            leftPaddle.speed = -speed;
            break;

        case "s":
            leftPaddle.speed = speed;
            break;

        case "ArrowUp":
            rightPaddle.speed = -speed;
            break;

        case "ArrowDown":
            rightPaddle.speed = speed;
            break;
    }

})
window.addEventListener("keyup", function(event){
    switch (event.key) {
        case "w":
            leftPaddle.speed = 0;
            break;

        case "s":
            leftPaddle.speed = 0;
            break;

        case "ArrowUp":
            rightPaddle.speed = 0;
            break;

        case "ArrowDown":
            rightPaddle.speed = 0;
            break;
    }
})


function doShit() {
    if (!paused) {
        c.clearRect(0, 0, cw, ch)
        rightPaddle.update()
        leftPaddle.update()
        quark.update()
        middleGuy()
        requestAnimationFrame(doShit);
        penis -= 1;
    }
}
requestAnimationFrame(doShit);