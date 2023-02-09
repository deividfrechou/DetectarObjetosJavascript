//cria o canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width= document.documentElement.clientWidth;
canvas.height= document.documentElement.clientHeight;
document.body.appendChild(canvas);

//Imagem de fundo
let bgReady = false;
const bgImage = new Image();
bgImage.onload = function(){   
   bgReady = true;   
	};
bgImage.src = 'bg.png'; 	

//Imagem do Heroi
let heroReady = false;
const heroImage = new Image();
heroImage.onload = function(){
	heroReady = true;
	};
heroImage.src = 'hero.png'; 

//Imagem do monstro
let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function(){
	monsterReady = true;
	};
monsterImage.src = 'monster.png';

//Objetos do jogo
const hero ={
	speed:256 // movimento em pixels por segundo
	};
	
const monster ={};
let monsterscont = 0;

//controle do teclado
const keysDown = {};

window.addEventListener('keydown', function(e){
keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function(e){
delete keysDown[e.keyCode];
}, false);
	
//reseta o jogo quando pega o monstro
const reset = function(){
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
//Posiciona o monstro randomicamente na tela
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// controle do heroi através do teclado
const update = function (modifer){
  if (38 in keysDown){  //tecla para cima
     hero.y -= hero.speed * modifer;
  }
  if (40 in keysDown){  //tecla para baixo
     hero.y += hero.speed * modifer;
  }
  if (37 in keysDown){  //tecla para esquerda
     hero.x -= hero.speed * modifer;
  }
  if (39 in keysDown){  //tecla para direita
     hero.x += hero.speed * modifer;
  } 

  // os personagens se encostaram
  if (
  	hero.x <= (monster.x + 32) &&
  	monster.x <= (hero.x + 32)  &&
  	hero.y <= (monster.y + 32) &&
  	monster.y <= (hero.y + 32) 
  	){
     ++monsterscont;
     reset();
  }
};

//renderizando tudo
const render = function(){
  if (bgReady){
  	ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady){
  	ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if (monsterReady){
  	ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  ctx.fillStyle = 'rgb(250, 250, 250)';
  ctx.font = '24px , helvetica';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('monstros pegos: ' + monsterscont, 32, 32);
};

// controla o loop do jogo
   const main = function (){
	const now = Date.now();
	const delta = now - then;

	update(delta / 1000);
	render();

	then = now;
	// executa o mais rápido possível
	requestAnimationFrame(main);
};

// suporte a mais navegadores
const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// começando o jogo
let then = Date.now();
reset();
main();