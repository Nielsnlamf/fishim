"use strict"
const canvas = document.getElementById("game")
const barWidth = 55
const netHeight = barWidth * 1.75
let holdingMouse = false
let playing = false
let gameLoop = null
let targetedY = 0
let highestHeight = 0
let timeTaken = 0
let fishCaught = false


canvas.height *= 2.335
canvas.width *= 0.7
let net = {"x": canvas.width / 2 - barWidth / 2, "y": canvas.height - netHeight, "w": barWidth, "h": netHeight}
let gameFish = {"x": canvas.width / 2, "y": canvas.height - barWidth / 2, "r": barWidth / 2}
let scoreBar = {"x": canvas.width / 4 * 3, "y": canvas.height, "w": 10, "h": canvas.height + 10}
const ctx = canvas.getContext("2d")
ctx.fillStyle = "#AAAAAA"
ctx.beginPath()
ctx.fillRect(canvas.width / 2 - barWidth / 2, 0, barWidth, canvas.height)
ctx.fillStyle = "#0000FF"
ctx.fillRect(net.x, net.y, net.w, net.h)
ctx.arc(gameFish.x, gameFish.y, gameFish.r, 0, 2 * Math.PI)
ctx.fillStyle = "#00FF00"
ctx.fillRect(scoreBar.x, scoreBar.y, scoreBar.w, scoreBar.h)
ctx.fill()
ctx.stroke()

function gameFinished() {
    toggleGame()
    togglePopup()
    moveSpot(currentSpot)
    timeTaken = 0
    net = {"x": canvas.width / 2 - barWidth / 2, "y": canvas.height - netHeight, "w": barWidth, "h": netHeight}
    gameFish = {"x": canvas.width / 2, "y": canvas.height - barWidth / 2, "r": barWidth / 2}
    scoreBar = {"x": canvas.width / 4 * 3, "y": canvas.height, "w": 10, "h": canvas.height + 10}
    highestHeight = canvas.height
    holdingMouse = false
    drawElements()
    clearCanvas()
    drawElements()
}

function toggleGame() {
    const gamePopup = document.getElementById("gamePopup")
    gamePopup.classList.toggle("visible")
    gamePopup.style.left = `${parseInt(currentSpot.style.left) + 100}px`
    gamePopup.style.top = `${parseInt(currentSpot.style.top) - 80}px`
    if (parseInt(gamePopup.style.top) < 0) {
        gamePopup.style.top = "10px"
    }
    if (parseInt(gamePopup.style.left) > 1710) {
        gamePopup.style.left = "1700px"
    }
    if (document.body.scrollWidth < 700) {
        gamePopup.style.left = "50%"
        gamePopup.style.top = "25%"
        gamePopup.style.transform = "translate(-50%)"
    }
    playing = !playing
    if (playing) { setTimeout(game(), 3000) } else {
        window.clearInterval(gameLoop)
        window.removeEventListener("mousedown", switchMouseState)
        window.removeEventListener("mouseup", switchMouseState)
        window.removeEventListener("touchstart", switchMouseState)
        window.removeEventListener("touchend", switchMouseState)
    }
}

function game() {
    fishCaught = false
    console.log("gaming gamers")
    window.addEventListener("mousedown", switchMouseState)
    window.addEventListener("mouseup", switchMouseState)
    window.addEventListener("touchstart", switchMouseState)
    window.addEventListener("touchend", switchMouseState)
    targetedY = Math.floor(Math.random() * (canvas.height - gameFish.r * 3) + gameFish.r)
    gameLoop = window.setInterval(() => {
        timeTaken++
        drawElements()
        clearCanvas()
        drawElements()
        if (holdingMouse) {
            if (net.y >= 0) {
                net.y -= 2
            }
        } else if (net.y <= canvas.height - netHeight) {
            net.y += 2
        }
        if (targetedY < gameFish.y - gameFish.r) {
            gameFish.y--
        } else if (targetedY > gameFish.y - gameFish.r) {
            gameFish.y++
        } else {
            targetedY = Math.floor(Math.random() * (canvas.height - gameFish.r * 3) + gameFish.r)
        }
        if (checkNet()) {
            growScore()
        } else { shrinkScore() }
        if (highestHeight <= canvas.height - 20) {
            if (scoreBar.y >= canvas.height) {
                gameFinished()
                showFish()
            }
        }
        if (scoreBar.y <= 0) {
            fishCaught = true
            net = {"x": canvas.width / 2 - barWidth / 2, "y": canvas.height - netHeight, "w": barWidth, "h": netHeight}
            gameFish = {"x": canvas.width / 2, "y": canvas.height - barWidth / 2, "r": barWidth / 2}
            scoreBar = {"x": canvas.width / 4 * 3, "y": canvas.height, "w": 10, "h": canvas.height + 10}
            drawElements()
            showFish(createFish())
            gameFinished()
        }
    }, 10)
}

function growScore() {
    scoreBar.y -= 0.5
    highestHeight = scoreBar.y
}
function shrinkScore() {
    if (scoreBar.y <= canvas.height) {
        scoreBar.y++
    }
}

function checkNet() {
    if (gameFish.y + gameFish.r > net.y && gameFish.y + gameFish.r < net.y + net.h) {
        return true
    }
    if (gameFish.y - gameFish.r < net.y + net.h && gameFish.y - gameFish.r > net.y) {
        return true
    }

    return false
}

function switchMouseState() {
    holdingMouse = !holdingMouse
    console.log(holdingMouse)
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawElements() {
    ctx.fillStyle = "#AAAAAA"
    ctx.beginPath()
    ctx.fillRect(canvas.width / 2 - barWidth / 2, 0, barWidth, canvas.height)
    ctx.fillStyle = "#0000FF"
    ctx.fillRect(net.x, net.y, net.w, net.h)
    ctx.arc(gameFish.x, gameFish.y, gameFish.r, 0, 2 * Math.PI)
    ctx.fillStyle = "#00FF00"
    ctx.fillRect(scoreBar.x, scoreBar.y, scoreBar.w, scoreBar.h)
    ctx.fill()
    ctx.stroke()
}
