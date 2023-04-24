const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Define o tamanho do canvas
canvas.width = 500;
canvas.height = 200;


let playerX = 50;
let playerY = 150;
let playerJump = false;
let canJump = true; 
let obstacleX = 500;
let obstacleY = 160;
let gameSpeed = 5;
let score = 0;    

function drawPlayer() {
  context.fillStyle = '#000';
  context.fillRect(playerX, playerY, 20, 20);
}

function drawObstacle() {
  context.fillStyle = 'red';
  context.fillRect(obstacleX, obstacleY, 20, 20);
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && canJump) {
      playerJump = true;
      canJump = false;
    }
  });

function update() {
    if (playerJump) {
      playerY -= 5;
      if (playerY < 50) {
        playerJump = false;
      }
    } else {
      playerY += 5;
      if (playerY > 150) {
        playerY = 150;
        canJump = true;
      }
    }
  
    obstacleX -= gameSpeed;
    if (obstacleX < 0) {
      obstacleX = 500;
      score++; // incrementa a pontuação toda vez que o obstáculo é ultrapassado
    }

  // Verifica se houve colisão entre o jogador e o obstáculo
  if (playerX + 20 >= obstacleX && playerX <= obstacleX + 20 && playerY + 20 >= obstacleY) {
    // Reseta a posição do obstáculo
    obstacleX = 500;

    // Reseta a posição do jogador
    playerX = 50;
    playerY = 150;
    score = 0; // reseta a pontuação caso haja colisão com o obstáculo
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawObstacle();

  // Exibe a pontuação na tela
  context.font = '16px Arial';
  context.fillStyle = '#000';
  context.fillText(`Score: ${score}`, 400, 20);
}

function loop() {
  update();
  requestAnimationFrame(loop);
}

loop();
