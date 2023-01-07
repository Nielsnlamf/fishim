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
ctx.fillRect(canvas.width / 2 - barWidth / 2, canvas.height - netHeight, barWidth, canvas.height)
ctx.arc(canvas.width / 2, canvas.height - barWidth / 2, barWidth / 2, 0, 2 * Math.PI)
ctx.fillStyle = "#00FF00"
ctx.fill()
ctx.stroke()
