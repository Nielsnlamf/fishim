"use strict"
let mouseX = 0
let mouseY = 0
let fishing = false
const fishButton = document.getElementById("fishButton")
let boatMovable = true
let rotateLock = false
let hasClickListener
let currentSpot = null

document.addEventListener("mousemove", e => {
    mouseX = e.clientX
    mouseY = e.clientY
})
function unlockBoat() {
    boatMovable = true
    rotateLock = false
    fishing = false
}
function moveButton(e) {
    fishButton.style.left = `${parseInt(boat.style.left) - 80}px`
    fishButton.style.top = `${parseInt(boat.style.top) - 80}px`
    fishButton.style.display = "inline-block"
    if (parseInt(fishButton.style.left) < 10) {
        fishButton.style.left = "15px"
    }
    if (parseInt(fishButton.style.top) < 5) {
        fishButton.style.top = "5px"
    }
    if (!hasClickListener) {
        fishButton.addEventListener("click", () => {
            // CatchFish(e)
            addClickListener()
        })
    }
    hasClickListener = true
}
function addClickListener() {
    for (let i = 0; i < document.querySelectorAll("#spot").length; i++) {
        const e = document.querySelectorAll("#spot")[i]
        if (checkOverlap(boat, e)) {
            catchFish(e)
            return
        }
    }
}
function checkOverlap(e1, e2) {
    const e1Box = e1.getBoundingClientRect()
    const e2Box = e2.getBoundingClientRect()
    return !(
        e1Box.top > e2Box.bottom
    || e1Box.right < e2Box.left
    || e1Box.bottom < e2Box.top
    || e1Box.left > e2Box.right)
}

setInterval(() => {
    let overlap = false
    for (let i = 0; i < document.querySelectorAll("#spot").length; i++) {
        const e = document.querySelectorAll("#spot")[i]
        if (!fishing) {
            if (checkOverlap(boat, e)) {
                overlap = true
                currentSpot = e
                moveButton(e)
            }
            if (!overlap) {
                fishButton.style.display = "none"
            }
        }
    }
}, 500)

setInterval(() => {
    if (!rotateLock) {
        const boat = document.getElementById("boat")
        const boatBox = boat.getBoundingClientRect()
        const centerX = boatBox.left + boatBox.width / 2 - window.pageXOffset
        const centerY = boatBox.top + boatBox.height / 2 - window.pageYOffset
        const radians = Math.atan2(mouseX - centerX, mouseY - centerY)
        const degree = radians * (180 / Math.PI) * -1 + 180
        boat.style.transform = `rotate(${degree}deg)`
    }
}, 1)

window.addEventListener("click", e => {
    if (boatMovable) {
        boat.style.left = `${mouseX}px`
        boat.style.top = `${mouseY}px`
    }
})

function moveSpot(e) {
    const widthBase = document.body.scrollWidth * 0.1
    const widthRandomPart = document.body.scrollWidth * 0.8
    const heightBase = document.body.scrollHeight * 0.1
    const heightRandomPart = document.body.scrollHeight * 0.8
    e.style.left = `${Math.floor(widthBase + Math.random() * widthRandomPart)}px`
    e.style.top = `${Math.floor(heightBase + Math.random() * heightRandomPart)}px`
    while (!checkOverlap(e, document.body)) {
        e.style.left = `${Math.floor(widthBase + Math.random() * widthRandomPart)}px`
        e.style.top = `${Math.floor(heightBase + Math.random() * heightRandomPart)}px`
    }
}

const generateSpots = () => {
    for (let i = 0; i < document.querySelectorAll("#spot").length; i++) {
        const e = document.querySelectorAll("#spot")[i]
        moveSpot(e)
        for (let i = 0; i < document.querySelectorAll("#spot").length; i++) {
            checkOverlap(e, document.querySelectorAll("#spot")[i]) ? moveSpot(e) : {}
        }
    }
    boat.style.left = "50%"
    boat.style.top = "50%"
}
window.addEventListener("DOMContentLoaded", generateSpots)
window.addEventListener("resize", generateSpots)
