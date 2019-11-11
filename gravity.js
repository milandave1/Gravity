// Start
function balls() {
    var canvas = document.querySelector('canvas');
    var c = canvas.getContext('2d');
    var element = document.getElementById('myDiv');
    var positionInfo = element.getBoundingClientRect();
    var height = positionInfo.height;
    canvas.width = innerWidth;
    canvas.height = innerHeight - height;
    
    // Variables

    var mouse = {
        x: innerWidth/2,
        y: innerHeight/2
    }

    var gravity = parseFloat("0.0");
    var friction = parseFloat("0.7");
    var check1 = (document.querySelector("#gravity").value);
    var check2 = (document.querySelector("#friction").value);

    if (check1 != "") {
        gravity = parseFloat(document.querySelector("#gravity").value);
    }


    if (check2 != "") {
        friction = parseFloat(document.querySelector("#friction").value);
    }

    var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
    var rollingFriction = 0.99;

    // Event Listeners
    addEventListener('mousemove', event => {
        mouse.x = event.clientX
        mouse.y = event.clientY
    })

    addEventListener('resize', () => {
        canvas.width = innerWidth
        canvas.height = innerHeight

        init()
    })

    addEventListener('click',() => {
        init()
    })

    // Utility Functions
    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max-min+1) + min);
    }

    function randomColor(colors) {
        return colors[Math.floor(Math.random()*colors.length)];
    }

    function Ball(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;

        this.update = function() {
            if ((this.y + this.radius + this.dy) > canvas.height) {
                this.dy = -this.dy * friction;
            } else if (this.y - this.radius <= 0) {
                this.dy = -this.dy;
            } else {
                this.dy += gravity;
            }

            if ((this.x + this.radius + this.dx) > canvas.width || this.x - this.radius <= 0) {
                this.dx = -this.dx;
            }

            this.x += this.dx;
            this.y += this.dy;

            if (this.y > canvas.height-this.radius) {
                this.dx = this.dx * rollingFriction;
            }
            this.draw()
        }
        
        this.draw = function() {
            c.beginPath()
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            c.fillStyle = this.color
            c.fill()
            c.stroke()
            c.closePath()
        }
    }

    // Implementation
    //let objects;
    var ball;
    var ballArray;
    var numBalls;
    var minRad = 8;
    var maxRad = 30;
    if (document.querySelector("#numBalls").value == "") {
        numBalls = 300;
    } else {
        numBalls = parseInt(document.querySelector("#numBalls").value);
    }

    if (numBalls == 420) {
        colors = ['#00A344', '#00A344', '#00A344', '#00A344']
        minRad = 4;
        maxRad = 20;
    }
    function init() {
        ballArray=[];
        for (var i = 0; i < numBalls; i++) {
            var radius = randomIntFromRange(minRad, maxRad);
            var x = randomIntFromRange(radius, canvas.width - radius);
            var y = randomIntFromRange(canvas.height/3, canvas.height - radius);
            var dx = randomIntFromRange(-6, 6);
            var dy = randomIntFromRange(-6, 6);
            var color = randomColor(colors);
            ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
        ball = new Ball(canvas.width/2, canvas.height/2, 2, 30, 'red');
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate)
        c.clearRect(0, 0, canvas.width, canvas.height)
        for (var i = 0; i < ballArray.length; i++) {
            ballArray[i].update();
        }
    }

    init()
    animate()
}