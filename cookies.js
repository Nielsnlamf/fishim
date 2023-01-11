"use strict"
function generateCookieValue(name, fish) {
    return `${name}+${fish.length}+${fish.type}+${fish.pattern}+${fish.color}+${timeTaken}+${fish.value}`
}
function getHighscoreValue() {
    let highestFish = getCookie("highscore").split("+")
    return parseInt(highestFish[highestFish.length - 1])
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${cname}=${cvalue};${expires};path=/`
}
function getCookie(cname) {
    const name = `${cname}=`
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(";")
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == " ") {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return false
}
function deleteCookie(cname) {
  createCookie(cookie_name,"",-1);
}