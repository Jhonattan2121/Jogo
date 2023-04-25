/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Define o tamanho do canvas
canvas.width = 500;
canvas.height = 200;

/** @type {Player} */
let player;

/** @type {Obstacle} */
let obstacle;

let score = 0;

/**
 * @type {(min: number, max: number) => number}
 */
const random = (min, max) =>
  ((Math.random() * (max - min + 1)) & 0xffffffff) + min;

/**
 * @param {HTMLElement} node
 * @param {string} type
 * @param {(args: any) => any} event
 */
function listen(node, type, event) {
  node.addEventListener(type, event);
  return () => node.removeEventListener(type, event);
}

class Player {
  width = 4;
  height = 4;
  velY = 0;
  x = 50;
  y = 150;
  canJump = true;
  jump = false;

  update() {
    if (player.jump) {
      player.y -= 5;
      if (player.y < 50) {
        player.jump = false;
      }
    } else {
      player.y += 5;
      if (player.y > 150) {
        player.y = 150;
        player.canJump = true;
      }
    }
  }

  draw() {
    context.fillStyle = "#000";
    context.fillRect(this.x, this.y, 20, 20);
  }
}

class Obstacle {
  x = 410;
  y = 150;
  
  constructor() {
    this.height = random(20, -100);
  }

  update() {
    obstacle.x -= gameSpeed;
    if (obstacle.x < 0) {
      obstacle.x = 500;
      score++;
    }
  }

  draw() {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, 20, this.height);
  }
}

/**
 * @param {number} px
 * @param {number} py
 * @param {number} objx
 * @param {number} objy
 */
function collision(px, py, objx, objy) {
  if (px + 20 >= objx && px <= objx + 20 && py + 20 >= objy) return true;
  return false;
}

function renderGame() {
  requestAnimationFrame(renderGame);

  if (collision(player.x, player.y, obstacle.x, obstacle.y)) {
    obstacle.x = 510;

    player.x = 50;
    player.y = 150;
    score = 0;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  // Exibe a pontuação na tela
  context.font = "16px Arial";
  context.fillStyle = "#000";
  context.fillText(`Score: ${score}`, 400, 20);

  player.draw();
  obstacle.draw();
}

function setupGame() {
  player = new Player();
  obstacle = new Obstacle();

  listen(document, "keydown", (e) => {
    if (e.code === "Space" && player.canJump) {
      player.playerJump = true;
      player.canJump = false;
    }
  });

  renderGame();
}

function updateScore() {
  if (score % 10 == 0 && score != 0) {
    // verifica se a pontuação é um múltiplo de 10
    gameSpeed += 0.1; // aumenta a velocidade em 0,1
  }
  context.font = "16px Arial";
  context.fillStyle = "#000";
  context.fillText(`Score: ${score}`, 400, 20);
}

setupGame();


//pontuacoes feitas pelo jogador 
// Obtenha a maior pontuação armazenada localmente e exiba-a
var maiorPontuacao = localStorage.getItem('maiorPontuacao');
if (maiorPontuacao) {
    document.getElementById('maior-pontuacao').textContent = maiorPontuacao;
}

// Obtenha a menor pontuação armazenada localmente e exiba-a
var menorPontuacao = localStorage.getItem('menorPontuacao');
if (menorPontuacao) {
    document.getElementById('menor-pontuacao').textContent = menorPontuacao;
}

// Atualize a maior e menor pontuação quando o jogo terminar
function atualizarPontuacao(pontuacao) {
    var maior = localStorage.getItem('maiorPontuacao');
    var menor = localStorage.getItem('menorPontuacao');
    
    if (!maior || pontuacao > maior) {
        localStorage.setItem('maiorPontuacao', pontuacao);
        document.getElementById('maior-pontuacao').textContent = pontuacao;
    }
    
    if (!menor || pontuacao < menor) {
        localStorage.setItem('menorPontuacao', pontuacao);
        document.getElementById('menor-pontuacao').textContent = pontuacao;
    }
}