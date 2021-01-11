import { S_CLICK, S_HOVER } from "./constants.js"
import { MenuScene } from "./scenes/menu_scene.js"
import { SceneManager } from "./scenes/scene_manager.js"
import { playSound } from "./utils/sound.js"

// Export Global Variables
export const canvas = document.querySelector('canvas')
export const ctx = canvas.getContext('2d')

// Set canvas dimensions
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

/**
 * Initilizes the mouse-events, and style, of a single menu button.
 * @param {*} buttonElement
 * @param {*} buttonClickAction
 */
export function initilizeMenuButton(buttonElement, buttonClickAction = () => {}){
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
 * Hides an HTML element by element ID.
 * @param {*} elementID 
 */
export function hideElement(elementID){
    document.getElementById(elementID).style.display = "none"
}

/**
 * Shows an HTML element by element ID.
 * @param {*} elementID the ID of the HTML element to show.
 * @param {*} display the display style (default == "flex").
 */
export function showElement(elementID, display="flex"){
    document.getElementById(elementID).style.display = display
}

/**
 * Returns an HTML element by ID.
 * @param {*} elementID the HTML element's ID.
 */
export function findElement(elementID){
    return document.getElementById(elementID)
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
    //TODO not finished writing this method...
}

/**
 * Hides the popup game message.
 */
export function hideGameMessage(){
    hideElement("gameMessageElement")
}

/**
 * Start game.
 */
export var manager = new SceneManager(new MenuScene())
function animate() {
    requestAnimationFrame(animate)
    manager.draw()
}
animate()