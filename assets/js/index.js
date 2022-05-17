var game = new Snake();
var food = new Food();

function Load() {
    let x = setInterval(() => {
        game.moveSnake()

        if (game.isEatFood(food)) {
            document.getElementById('eatAudio').play()
            document.getElementById("mainAudio").loop = true;
            game.growBodySnake()
            food.randomFood()
            score += 1;
            bestscore += 1;
        }

        if (game.collisionWithFrame() || game.collisionWithBody()) {
            clearInterval(x)
            if (score > bestscore) {
                bestscore = score
                document.getElementById('score-best').innerText = "Best Score : " + bestscore
            } else {
                document.getElementById('score-best').innerText = "Best Score : " + bestscore
            }
            document.getElementById('loseAudio').play()
            document.getElementById('p-result-score').innerText = score

            document.getElementById('time').innerText = time + "s"

            if (score < 7) {
                document.getElementById('text').innerText = "Cần Luyện Tập Thêm Ahihi!"
            } else
            if (score >= 7 && score < 20) {
                document.getElementById('text').innerText = "Pro Hơn Rồi Đấy!"
            } else if (score >= 20 && score < 350) {
                document.getElementById('text').innerText = "Wow!"
            } else {
                document.getElementById('text').innerText = "Unbelievable!"
            }
            document.getElementById('retry').style = "visibility: visible;"
            document.getElementById('mainAudio').pause()
        }
    }, speed);
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        // LRUD
        case (37):
            if (game.turnAround.x === 1) break
            game.move = new Position(-1, 0)
            game.turnAround = new Position(-1, 0)
            break;
        case (39):
            if (game.turnAround.x === -1) break
            game.move = new Position(1, 0)
            game.turnAround = new Position(1, 0)
            break;
        case (38):
            if (game.turnAround.y === 1) break
            game.move = new Position(0, -1)
            game.turnAround = new Position(0, -1)
            break;
        case (40):
            if (game.turnAround.y === -1) break
            game.move = new Position(0, 1)
            game.turnAround = new Position(0, 1)
            break;

            // AWSD
        case (65):
            if (game.turnAround.x === 1) break
            game.move = new Position(-1, 0)
            game.turnAround = new Position(-1, 0)
            break;
        case (68):
            if (game.turnAround.x === -1) break
            game.move = new Position(1, 0)
            game.turnAround = new Position(1, 0)
            break;
        case (87):
            if (game.turnAround.y === 1) break
            game.move = new Position(0, -1)
            game.turnAround = new Position(0, -1)
            break;
        case (83):
            if (game.turnAround.y === -1) break
            game.move = new Position(0, 1)
            game.turnAround = new Position(0, 1)
            break;
        default:
            break;
    }
}

function btnPlayHidden() {
    document.getElementById('guide-play').style = "visibility: hidden;"
    Load()
    document.getElementById('mainAudio').play()
    setInterval(() => {
        time += 1
    }, 1000);
}

function btnRetryHidden() {
    document.getElementById('retry').style = "visibility: hidden;"
    location.reload()
}