"use strict"
const patterns = ["none", "dotted", "striped", "scarred"]
const patternValues = {"none": 1, "dotted": 2, "striped": 3, "scarred": 5}

const types = ["normal", "ray", "shark"]
const typeValues = {"normal": 1, "ray": 3, "shark": 5}

const colors = ["black", "blue", "white"]
const colorValues = {"black": 1, "blue": 1, "white": 1.3}

const lengthrow = document.getElementById("lengthrow")
const typerow = document.getElementById("typerow")
const patternrow = document.getElementById("patternrow")
const colorrow = document.getElementById("colorrow")
const hasThrowBackListener = false

function Fish(length, type, pattern, color) {
    this.length = length
    this.type = type
    this.pattern = pattern
    this.color = color
}

function catchFish(e) {
    boat.style.transition = "1s"
    const eBox = e.getBoundingClientRect()
    boat.style.left = `${parseInt(eBox.left - 100)}px`
    boat.style.top = `${parseInt(eBox.top - 100)}px`
    fishing = true
    boatMovable = false
    fishButton.style.display = "none"
    setTimeout(() => { rotateLock = true }, 1100)
    showFish(createFish())
}
function createFish() {
    const newFish = new Fish(Math.floor(Math.random() * 20), types[Math.floor(Math.random() * types.length)], patterns[Math.floor(Math.random() * patterns.length)], colors[Math.floor(Math.random() * colors.length)])
    return newFish
}
function showFish(fish) {
    const fishtail = document.getElementById("fishtail")
    const fishbody = document.getElementById("fishbody")
    const popup = document.getElementById("popup")
    console.log(fish)
    switch (fish.color) {
    case "black":
        console.log("black")
        fishtail.style.borderColor = "transparent transparent transparent black"
        fishbody.style.backgroundColor = "black"
        break
    case "blue":
        console.log("blue")
        fishtail.style.borderColor = "transparent transparent transparent blue"
        fishbody.style.backgroundColor = "blue"
        break
    case "white":
        console.log("white")
        fishtail.style.borderColor = "transparent transparent transparent grey"
        fishbody.style.backgroundColor = "grey"
        break
    }
    // Lengthrow = document.getElementById("lengthrow")
    // typerow = document.getElementById("typerow")
    // patternrow = document.getElementById("patternrow")
    // colorrow = document.getElementById("colorrow")
    length = document.createElement("td")
    length.innerHTML = `${fish.length}`
    length.setAttribute("id", "lengthcell")
    const type = document.createElement("td")
    type.innerHTML = `${fish.type}`
    type.setAttribute("id", "typecell")
    const pattern = document.createElement("td")
    pattern.innerHTML = `${fish.pattern}`
    pattern.setAttribute("id", "patterncell")
    const color = document.createElement("td")
    color.innerHTML = `${fish.color}`
    color.setAttribute("id", "colorcell")
    lengthrow.appendChild(length)
    typerow.appendChild(type)
    patternrow.appendChild(pattern)
    colorrow.appendChild(color)
    togglePopup()
}
function togglePopup() {
    const popup = document.getElementById("popup")
    console.log("toggling")
    popup.classList.toggle("visible")
}
function throwBack() {
    lengthrow.removeChild(document.getElementById("lengthcell"))
    typerow.removeChild(document.getElementById("typecell"))
    patternrow.removeChild(document.getElementById("patterncell"))
    colorrow.removeChild(document.getElementById("colorcell"))
    togglePopup()
    setTimeout(unlockBoat, 1000)
}
