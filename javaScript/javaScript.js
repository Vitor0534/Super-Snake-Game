/* Observações
	Autor: Vitor de Almeida Silva 09/04/2021


	1- 01/04/2021:  existe um comportamento extranho ligado a função pop e unshift
	                elas não funcionam e a snake desaparece da tela;
	                	Resolvido: por algum razão quando se utiliza o width e height da snake
	                	           como parametro para fillRect() a fução não funciona, era esse
	                	           o problema. ainda não sei o motivo disso já que o width e heigth
	                	           foram setadas corretamente.


*/


/* 
	O funcionamento dos desenhos na window é semelhante ao do processing
	preencher o background, desenha as figuras e fica fazendo esse loop
*/


let canvas = document.getElementById("screen");

/*context controla o plano onde será desenhado os elementos,
  nesse caso foi atribuido o controle no plano R2*/
let context = canvas.getContext("2d"); 

//atributos de dimensões do jogo
let box = 32;
let snakeSize = 32;
let foodSize = 32;

//Score
var Score = 0;

/*Snake atributes*/
let snake = [];

/*coordenada da snake no plano*/
snake[0] = { 
	x: 8 * box,
	y: 8 * box,
	width: snakeSize,
	heigth: snakeSize
}
/*end snake atributes*/


/*coordenadas da comida*/
let food = {
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box

}


/*
	a lógica de deslocamento da snake na tela é retirar um 
	quadrado final e adiciona-lo na frente, na direção que
	a snake está se deslocando
*/
let direction = "up";

//função que cria a window
function criarBG(){
	context.fillStyle = "lightgreen"; /*preenche de verde a tela*/
	context.fillRect(0, 0, 16 * box, 16 * box); /*define dimenções de um quadrado para o canvas*/
}

/*função que desenha a snake,
  cria o retangulo da snake com os atributos 
  definidos para ela
*/

function CreatSnake(){
	for (i = 0; i < snake.length; i++){
		context.fillStyle = "black";
		context.fillRect(snake[i].x, snake[i].y, snakeSize, snakeSize);
	}
}


//verifica a colisão com o corpo da Snake
function colisionSelfBody()
{
	for(i=1; i< snake.length;i++)
	{
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y
		   )
		{
			alert("Game over: Score --> " + Score);
			clearInterval(game);
		}
	}
}


function drawFood(){
	context.fillStyle ="red";
	context.fillRect(food.x, food.y, foodSize, foodSize);
}

//atribui coordenadas aleatória para a comida
function foodRandomPosition()
{

	var very=0;
	for(;very==0;) //impede que a comida surga em cima da cobra
	{

			food.x = Math.floor(Math.random() * 15 + 1) * box;
	        food.y = Math.floor(Math.random() * 15 + 1) * box;
	        for(i=0;i<snake.length;i++)
	        {
	        	if(food.x == snake[i].x && food.y == snake[i].y)
	        	{
	        		very=0;
	        		break;
	        	}else{
	        		very=1;
	        	}

	        }

	}


	//soma 1 ponto a cada eat
	Score++;
	document.getElementById("points").innerHTML = "Pontos:&nbsp;&nbsp; " + Score +" -- "+ "Speed:&nbsp;&nbsp;" + speed_name;
}



//função que captura um evento de clique do teclado e
//chama a função indicada passando o event como parametro
document.addEventListener('keydown', update);



function update(event)
{

	if(!veryEdgeLoop()) //verifica se snake está dentro da window
		switch(event.keyCode)
		{
			case 37:
				if(direction != "right") direction = "left";
				break;
			case 38:
				if(direction != "down") direction = "up";
				break;
			case 39:
				if(direction != "left") direction = "right";
				break;
			case 40:
				if(direction != "up") direction = "down";
				break;
			default:
				console.log("update() --> Comand unknow");

		}

}


//função que verifica se a snake utrapassou os cantos
//se sim ela retorna no canto contrário
function veryEdgeLoop()
{

	switch(direction)
	{
		case "right":
			if(snake[0].x > 15 * box) {snake[0].x = 0; return true;}
			break;
		case "left":
			if(snake[0].x < 0)  {snake[0].x = 16 * box; return true;}
			break;
		case "down":
			if(snake[0].y > 15 * box) {snake[0].y = 0; return true;}
			break;
		case "up":
			if(snake[0].y < 0) {snake[0].y = 16 * box; return true;}
		default:
	}
}


//função para substituir a verificação de direção
//ainda não utilizada
function directionVerify(dir, snakeX, snakeY)
{

	switch(dir)
	{

		case "right":
			snakeX += box;
			console.log("right");
			break;
		case "left":
			snakeX -= box;
			console.log("left");
			break;
		case "up":
			snakeY -= box;
			console.log("up");
			break;
		case "down":
			snakeY += box;
			console.log("down");
			break;
		default:
			console.log(" directionVerify() --> Comand unknow...");
	}

}



/*é algo parecido com a função draw() do processing*/
function StartGame()
{


	//verifica posição da snake
	veryEdgeLoop();

	//verifica colisão com o corpo da snake
	colisionSelfBody();


	/*criando background*/
	criarBG();
	//desenha snake no canvas
	CreatSnake();
	//desenha comida em coordenada aleatória
    drawFood();

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	//direção de movimento da snake
	//directionVerify(direction ,snakeX, snakeY);
	
	if(direction == "right") snakeX += snakeSize;
	if(direction == "left") snakeX -= snakeSize;
	if(direction == "up") snakeY -= snakeSize;
	if(direction == "down") snakeY += snakeSize;
	


    //verifica se a snake devorou a comida
	if( ( snakeX >= food.x && snakeX <= food.x  + foodSize -2 ) 
	     && (snakeY >= food.y  && snakeY <= food.y + foodSize - 2) ){
		foodRandomPosition();
	}else{
		var rest = snake.pop();
	}

	//snake.length = 0;

	let newHead = {
		x: snakeX,
		y: snakeY
	}

	snake.unshift(newHead);
	//snake[0] = newHead;

	console.log("\n SnakeP(" +  snakeX + ", " + snakeY + ")");
	console.log("\n foodP(" +  food.x + ", " + food.y + ")");
    
}



/*Area para chamada de funções */



var Conf_Speed=100;
var speed_name="Low";

function start(){

	var menu = document.getElementById("menu");
	menu.style.display = "none";


	//cria um objeto que chama um intervalo para desenho
	//dos frames do jogo. para parar o jogo é só zerar essa
	//variável game
	let game = setInterval(StartGame, Conf_Speed); //frame rate

}


function beggin(){
		var settings = document.getElementById("settings");
		var menu = document.getElementById("menu");
		menu.style.display = "block";
		settings.style.display = "none";
}


function settings(){

	var settings = document.getElementById("settings");
	var start = document.getElementById("start");

	if(settings.style.display === "none"){

		settings.style.display = "block";
		start.style.display = "none";
	}else{
		start.style.display = "block";
		settings.style.display = "none";
	}
}


function speed(speed){

	switch(speed){
		case "low":
			Conf_Speed=100;
			speed_name=speed;
			break;
		case "hight":
			Conf_Speed=60;
			speed_name=speed;
			break;
		case "insane":
			Conf_Speed=40;
			speed_name=speed;
			break;
		default:
			Conf_Speed=100;
			speed_name=speed;
			break;
	}

	
	document.getElementById("points").innerHTML = "Pontos:&nbsp;&nbsp; " + Score +" -- "+ "Speed:&nbsp;&nbsp;" + speed_name;
}

