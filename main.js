import { S_CLICK, S_HOVER, S_MENU } from "./constants.js"
import { GameScene } from "./game_scene.js"
import { MenuScene } from "./menu_scene.js"
import { playSound, Track } from "./sound.js"

// Export Global Variables
export const canvas = document.querySelector('canvas')
export const ctx = canvas.getContext('2d')

// Set canvas dimensions
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

var currentScene = null
export var gameScene = new GameScene("./levels/1.png")
export var menuScene = new MenuScene()
var currentScene = menuScene

export function loadScene(scene){
    currentScene = scene
}

export function loadGameScene(levelNum){
    gameScene = new GameScene("./levels/" + levelNum + ".png")
    currentScene = gameScene
}

// Animation game-loop function
function animate() {
    requestAnimationFrame(animate)
    currentScene.draw()
}

// Called whenever a key is pressed down
function handleKeyDownEvent(event){
    gameScene.player.handleKeyDownEvent(event)
}

// Called whenever a key is released
function handleKeyUpEvent(event){
    gameScene.player.handleKeyUpEvent(event)
}

// Add event listeners
window.addEventListener("keydown", handleKeyDownEvent, false)
window.addEventListener("keyup", handleKeyUpEvent, false)

animate()

/**
 * Initilizes the mouse-events, and style, of a single menu button.
 * @param {*} buttonElement 
 * @param {*} buttonClickAction
 */
export function initilizeMenuButton(buttonElement, buttonClickAction=() => {}){
    buttonElement.onmouseover = (event) => {
        playSound(S_HOVER)
        buttonElement.style.backgroundColor = "rgb(37, 99, 235)"
    }
    buttonElement.onmouseleave = (event) => {
        buttonElement.style.backgroundColor = "rgb(59, 130, 246)"
    }
    buttonElement.onclick = (event) => {
        playSound(S_CLICK)
        buttonElement.style.backgroundColor = "rgb(29, 78, 216)"
        buttonClickAction()
    }
    buttonElement.style.backgroundColor = "rgb(59, 130, 246)"
    buttonElement.style.border = "none"
    buttonElement.style.outline = "none"
}

/**
 * Hide an HTML element by element ID.
 * @param {*} elementID 
 */
export function hideElement(elementID){
    document.getElementById(elementID).style.display = "none"
}

/**
 * Displays a popup message for the game.
 * @param {*} message 
 * @param {*} font_color 
 * @param {*} font_size 
 * @param {*} bg_color 
 */
export function displayGameMessage(message, font_color, font_size, bg_color){
    var gm = document.getElementById("gameMessageElement")
    gm.innerHTML = message
    gm.style.fontSize = font_size
    gm.style.backgroundColor = bg_color
}

/**
 * Hides the popup game message.
 */
export function hideGameMessage(){
    hideElement("gameMessageElement")
}