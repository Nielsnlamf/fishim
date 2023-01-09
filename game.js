"use strict"
const canvas = document.getElementById("game")
const barWidth = 55
const netHeight = barWidth * 1.75

function gameFinished() {
    toggleGame()
    togglePopup()
    moveSpot(currentSpot)
}
canvas.height *= 2.335
canvas.width *= 0.7
const ctx = canvas.getContext("2d")
ctx.fillStyle = "#AAAAAA"
ctx.beginPath()
ctx.fillRect(canvas.width / 2 - barWidth / 2, 0, barWidth, canvas.height)
ctx.fillStyle = "#0000FF"
let net = ctx.fillRect(canvas.width / 2 - barWidth / 2, canvas.height - netHeight, barWidth, canvas.height)
let gameFish = ctx.arc(canvas.width / 2, canvas.height - barWidth / 2, barWidth / 2, 0, 2 * Math.PI)
ctx.fillStyle = "#00FF00"
let scoreBar = ctx.fillRect(canvas.width / 4 * 3, canvas.height, 10, canvas.height)
ctx.fill()
ctx.stroke()

function toggleGame() {
    const gamePopup = document.getElementById("gamePopup")
    gamePopup.classList.toggle("visible")
    gamePopup.style.left = `${parseInt(currentSpot.style.left) + 100}px`
    gamePopup.style.top = `${parseInt(currentSpot.style.top) - 80}px`
    if(parseInt(gamePopup.style.top) < 0) {
        gamePopup.style.top = "10px"
    }
    if(parseInt(gamePopup.style.left) > 1710) {
        gamePopup.style.left = "1700px"
    }
    setTimeout(game(), 3000)
}

function game() {
    console.log("gaming gamers")
    let playing = true
    while(playing) {
        if(checkNet()) {
            console.log("FISH")
        }
    }
}

function growScore() {
    scoreBar.y + 1
}

function checkNet() {
    if(gameFish.y < net.y && gameFish.y > net.y + net.height) {
        return true
    }
}
