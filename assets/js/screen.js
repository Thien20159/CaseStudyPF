class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}
class Snake {
    constructor() {
        this.data = [
            new Position(17 * UNIT, 0 * UNIT),
            new Position(18 * UNIT, 0 * UNIT),
            new Position(19 * UNIT, 0 * UNIT)
        ]
        this.init()
        this.move = new Position(-1, 0)
    }

    //INIT

    init() {
        this.frameWidthMin = 0
        this.frameWidthMax = SCREEN_SIZE
        this.frameHeightMin = 0
        this.frameHeightMax = SCREEN_SIZE

        this.w = UNIT;
        this.h = UNIT;
        this.turnAround = new Position(-1, 0);

        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = this.canvas.height = SCREEN_SIZE
        this.canvas.style = "border: 2px solid red; margin: 20px 400px"
        document.getElementById('container').appendChild(this.canvas)

        // this.clearScreen();
        this.draw();
    }

    //DRAW

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = color_head
        this.ctx.roundRect(this.data[0].x + 1, this.data[0].y + 1, this.w - 2, this.h - 2, 4)
        this.ctx.fill()

        this.ctx.beginPath()
        for (let i = this.data.length - 1; i >= 1; i--) {
            this.ctx.fillStyle = color_body
            this.ctx.roundRect(this.data[i].x + 1, this.data[i].y + 1, this.w - 2, this.h - 2, 4)
        }
        this.ctx.fill()
    }
    clearScreen() {
        this.ctx.beginPath()
        this.ctx.fillStyle = background_color
        this.ctx.roundRect(this.data[0].x, this.data[0].y, this.w, this.h, 4)
        this.ctx.fill()

        this.ctx.beginPath()
        for (let i = this.data.length - 1; i >= 1; i--) {
            this.ctx.fillStyle = background_color
            this.ctx.roundRect(this.data[i].x, this.data[i].y, this.w, this.h, 4)
        }
        this.ctx.fill()
    }

    // MOVE

    moveSnake() {
        this.clearScreen()
        for (let i = this.data.length - 1; i >= 1; i--) {
            this.data[i].x = this.data[i - 1].x
            this.data[i].y = this.data[i - 1].y
        }
        this.data[0].x += this.move.x * UNIT
        this.data[0].y += this.move.y * UNIT
        this.draw()
        this.collisionWithFrame()
        this.collisionWithBody()
    }

    // COLLISION

    collisionWithFrame() {
        if (this.data[0].x > this.frameWidthMax + 1 || this.data[0].x < this.frameWidthMin - 1) {
            return true
        } else if (this.data[0].y > this.frameHeightMax + 1 || this.data[0].y < this.frameHeightMin - 1) {
            return true
        }
    }
    collisionWithBody() {
        for (let i = 1; i < this.data.length; i++) {
            if (this.data[0].x == this.data[i].x && this.data[0].y == this.data[i].y)
                return true
        }
    }

    //EAT FOOD

    isEatFood(food) {
        return food.x === this.data[0].x && food.y === this.data[0].y;
    }
    isEatBigFood(food) {
        return food.x === this.data[0].x && food.y === this.data[0].y || food.x * UNIT === this.data[0].x && food.y * UNIT === this.data[0].y;
    }

    growBodySnake() {
        this.clearScreen()

        this.pieceX = this.data[this.data.length - 1].x - this.data[this.data.length - 2].x
        this.pieceY = this.data[this.data.length - 1].y - this.data[this.data.length - 2].y

        let plusSnake = new Position(
            this.data[this.data.length - 1] + this.pieceX,
            this.data[this.data.length - 1] + this.pieceY
        )

        this.data.push(plusSnake)
        this.draw()
    }
}
class Food {
    constructor(x, y) {
        this.x = x * UNIT;
        this.y = y * UNIT;
        this.randomFood()
    }

    // DRAW

    draw() {
        game.ctx.beginPath()
        game.ctx.fillStyle = "red"
        game.ctx.roundRect(this.x + 1, this.y + 1, game.w - 2, game.h - 2, 15)
        game.ctx.fill()
    }

    clearScreen() {
        game.ctx.beginPath()
        game.ctx.fillStyle = color_head
        game.ctx.roundRect(this.x + 1, this.y + 1, game.w - 2, game.h - 2, 15)
        game.ctx.fill()
    }

    getRandomNumber() {
        let randomNumber = Math.floor(Math.random() * SCREEN_SIZE)
        randomNumber = randomNumber - (randomNumber % UNIT)
        return randomNumber;
    }
    randomFood() {
        this.clearScreen()
        this.x = this.getRandomNumber()

        this.y = this.getRandomNumber()
        for (let i = 1; i < game.data.length; i++) {
            if (this.x == game.data[i].x && this.y == game.data[i].y) {
                this.x = this.getRandomNumber()
                this.y = this.getRandomNumber()
            }
        }
        this.draw()
    }
}