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

function Fish(length, type, pattern, color, value) {
    this.length = length
    this.type = type
    this.pattern = pattern
    this.color = color
    this.value = value
}

function catchFish(e) {
    boat.style.transition = "1s"
    const eBox = e.getBoundingClientRect()
    boat.style.left = `${parseInt(eBox.left - 100)}px`
    boat.style.top = `${parseInt(eBox.top - 100)}px`
    setTimeout(toggleGame, 1000)
    fishing = true
    boatMovable = false
    fishButton.style.display = "none"
    setTimeout(() => { rotateLock = true }, 1100)
}
function createFish() {
    const newFish = new Fish(Math.floor(Math.random() * 20 + 3), types[Math.floor(Math.random() * types.length)], patterns[Math.floor(Math.random() * patterns.length)], colors[Math.floor(Math.random() * colors.length)])
    newFish.value = newFish.length + typeValues[newFish.type] + patternValues[newFish.pattern] + colorValues[newFish.color]
    return newFish
}
function showFish(fish = null) {
    const fishtail = document.getElementById("fishtail")
    const fishbody = document.getElementById("fishbody")
    const popup = document.getElementById("popup")
    console.log(fish)
    // Lengthrow = document.getElementById("lengthrow")
    // typerow = document.getElementById("typerow")
    // patternrow = document.getElementById("patternrow")
    // colorrow = document.getElementById("colorrow")
    if (fish) {
        document.getElementById("popupTitle").innerHTML = "You caught a Fish!"
        document.getElementById("again").classList.add("hidden")
        document.getElementById("scoremsg").classList.add("hidden")
        document.getElementById("fishdiv").classList.remove("hidden")
        document.getElementById("fishtail").classList.remove("hidden")
        document.getElementById("fishbody").classList.remove("hidden")
        document.getElementById("infotable").classList.remove("hidden")
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
        const time = document.createElement("td")
        time.innerHTML = `${timeTaken}`
        time.setAttribute("id", "timecell")
        const value = document.createElement("td")
        value.innerHTML = `${fish.value}`
        value.setAttribute("id", "valuecell")
        lengthrow.appendChild(length)
        typerow.appendChild(type)
        patternrow.appendChild(pattern)
        colorrow.appendChild(color)
        timerow.appendChild(time)
        valuerow.appendChild(value)

        if (getCookie("highscore")) {
            if (fish.value > getHighscoreValue()) {
                setCookie("highscore", generateCookieValue(prompt("New Highscore! Wat is je naam?"), fish), 99999)
                document.getElementById("scoremsg").classList.remove("hidden")
            }
        } else {
            setCookie("highscore", generateCookieValue(prompt("New Highscore! Wat is je naam?"), fish), 99999)
            document.getElementById("scoremsg").classList.remove("hidden")
        }
    }
    // TogglePopup()
    else {
        document.getElementById("popupTitle").innerHTML = "You didn't catch anything.."
        document.getElementById("again").classList.remove("hidden")
        document.getElementById("fishdiv").classList.add("hidden")
        document.getElementById("fishtail").classList.add("hidden")
        document.getElementById("fishbody").classList.add("hidden")
        document.getElementById("infotable").classList.add("hidden")
    }
}
function togglePopup() {
    const popup = document.getElementById("popup")
    console.log("toggling")
    popup.classList.toggle("visible")
}
function throwBack() {
    if (fishCaught) {
        lengthrow.removeChild(document.getElementById("lengthcell"))
        typerow.removeChild(document.getElementById("typecell"))
        patternrow.removeChild(document.getElementById("patterncell"))
        colorrow.removeChild(document.getElementById("colorcell"))
        timerow.removeChild(document.getElementById("timecell"))
        valuerow.removeChild(document.getElementById("valuecell"))
    }
    togglePopup()
    setTimeout(unlockBoat, 10)
}
