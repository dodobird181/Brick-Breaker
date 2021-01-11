// Canvas Settings
export const CANVAS_WIDTH = 408
export const CANVAS_HEIGHT = 460

// Menu Settings
export const MENU_BACK_ALPHA = 0.4
export const MENU_BRICK_RELOAD_RATIO = 1/5

// Ball(s) Settings
export const BALL_SPEED = 5
export const BALL_RADIUS = 5
export const BALL_ANGLE_LIMITER = Math.PI / 5 // should be between 0 and pi
export const BALL_DIFF_THRESHOLD = 25 // measured in pixels
export const BALL_ANGLE_THRESHOLD_DIV = 2.6

// Brick Settings
export const BRICK_WIDTH = 32
export const BRICK_HEIGHT = 18
export const BRICK_BORDER_WIDTH = 2

// Player Settings
export const PLAYER_START_HEIGHT = 50
export const PLAYER_WIDTH = 100
export const PLAYER_HEIGHT = 15
export const PLAYER_COLOR = "white"
export const PLAYER_SPEED = 4

// Health Display Settings
export const HEART_IMAGE_SRC = "./images/heart.png"
export const HEART_SIZE = 20
export const HEART_WALL_PADDING = 10
export const HEART_SELF_PADDING = 6

// Timer Display Settings
export const SECONDS_PER_LEVEL = 180
export const TIMER_DISPLAY_PADDING = 8
export const TIMER_FONT = "Courier New"
export const TIMER_FONT_SIZE = 15

// Particle Settings
export const FRICTION = 0.95
export const PARTICLE_RADIUS = 2
export const PARTICLE_SPEED = 3
export const PARTICLES_PER_BRICK = 20

// Keys
export const KEY_LEFT = 37
export const KEY_RIGHT = 39
export const KEY_A = 65
export const KEY_D = 68

// Sounds
export const S_BRICK = "./sounds/brick.wav"
export const S_CLICK = "./sounds/click.wav"
export const S_GAME_OVER = "./sounds/game_over.wav"
export const S_HOVER = "./sounds/hover.wav"
export const S_LEVEL_WIN = "./sounds/level_win.wav"
export const S_LOSE_LIFE = "./sounds/lose_life.wav"
export const S_PLAYER = "./sounds/player.wav"
export const S_SIDE = "./sounds/side.wav"
export const S_MENU = "./sounds/menu.ogg"