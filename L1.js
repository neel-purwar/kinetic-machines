////////////////////////////////////////////////////////////////////////
function setupL1()
{
  createSpritesL1();
  setFlags();
  
}

////////////////////////////////////////////////////////////////////////
function playL1()
{
	// background(L1bgImage);

  if (startButton.mouse.pressing()) 
  gravityActivated = true; 

  if (gravityActivated)
  {
    ball.collider = 'd';
    world.gravity.y = 10; 
    bar.collider = 's';   
  }

 // Check for collision with the basket and if the ball has come to a stop
  if (ball.collides(basket) && abs(ball.velocity.x) < .5 && abs(ball.velocity.y) < .5) {
    success = true; // Set success flag to true
    //console.log(bar.position);
   // console.log(bar.rotation);      
  }


  handleLevelTransition();

  if (previousButton.mouse.pressing())
  {
    level--;
    reset();
  }

  if (resetButton.mouse.pressing())
    reset();


  if (!showEducationalImage)
  {
    setFont();
    text('Position the red bar to ', width/2, height-65);
    text('help ball go inside the basket!', width/2, height-40);
  }

  if (solutionButton.mouse.pressing())
  {
      drawSolutionL1();
  }

}

function drawSolutionL1()
{  
    bar.rotation = -20;
    bar.position.x = 322;
    bar.position.y = 300;
}

////////////////////////////////////////////////////////////////////////
function createSpritesL1()
{
  bar = new Sprite(width/2,40,100,20,'k');
  addRotationHandle(bar, bar.halfWidth + 10);
  addTranslationHandle(bar);
  bar.color = color(255, 0, 0, 200);

  fixedbar = new Sprite(width/2-100, height / 2, 150, 30, 's');
  fixedbar.rotation = 45;
  fixedbar.stroke = color(0,0,0,100);
  fixedbar.color = color(0,0,0,100);

  ball = new Sprite(fixedbar.position.x - (fixedbar.halfWidth-30)*cos(45), fixedbar.position.y - (fixedbar.halfWidth+20)*sin(45), 20, 's');
  ball.velocity.x =  0; // Set initial horizontal velocity
  ball.velocity.y =  0; // Set initial vertical velocity
  ball.color = color(255,0,0,200);
  ball.stroke = color(255,0,0,200);

  // ball = new Sprite(fixedbar.position.x - (fixedbar.halfWidth-30)*cos(45), fixedbar.position.y - (fixedbar.halfWidth+20)*sin(45), 20, 's');
  // ball.velocity.x =  0; // Set initial horizontal velocity
  // ball.velocity.y =  0; // Set initial vertical velocity
  // ball.img = ballImage;
   
  	//        (  x,   y, [length0, angle0, length1, ...])
	basket = new Sprite(width/2+170, height/2+110, [60, 40, 60, -40, 60, -40], 's');
  basket.stroke = color(0,0,0,100);
  basket.strokeWeight = 7;
}