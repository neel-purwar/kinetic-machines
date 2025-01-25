////////////////////////////////////////////////////////////////////////
function setupL2()
{
  createSpritesL2();
  setFlags();
}

////////////////////////////////////////////////////////////////////////
function playL2()
{
 
  if (startButton.mouse.pressing()) 
  {
    ball.collider = 'd';
    bounce.collider = 's';
    world.gravity.y = 10; // Activate gravity 
  }

   if (resetButton.mouse.pressing())
    reset();


 // Check for collision with the basket and if the ball has come to a stop
  if (ball.collides(basket) && (abs(ball.velocity.x) < 1) && (abs(ball.velocity.y) < 1)) {
    success = true; // Set success flag to true        
  }

handleLevelTransition();

  if (previousButton.mouse.pressing())
  {
    level--;
    reset();
  }

  if (!showEducationalImage)
  {
    setFont();
    text('Position the black bouncy bar to ', width/2, height-65);
    text('help ball go inside the basket!', width/2, height-40);
  }

  if (solutionButton.mouse.pressing())
  {
      drawSolutionL2();
  }

}

function drawSolutionL2()
{  
    bounce.rotation = 1;
    bounce.position.x = 230;
    bounce.position.y = 300;
}


////////////////////////////////////////////////////////////////////////
function createSpritesL2()
{
	
  fixedbar = new Sprite(width/2-200, height/3, 150, 30, 's');
  fixedbar.rotation = 45;
  fixedbar.stroke = color(0,0,0,100);
  fixedbar.color = color(0,0,0,100);

  ball = new Sprite(width/2-220, height/7, 20, 's');
  ball.vel.x = 0;
  ball.vel.y = 0;
  ball.color = color(255,0,0,200);
  ball.stroke = color(255,0,0,200);

  	//        (  x,   y, [length0, angle0, length1, ...])
	basket = new Sprite(width/2+150, height-200, [60, 40, 60, -40, 60, -40], 's');
  basket.stroke = color(0,0,0,100);
  basket.strokeWeight = 7;

  bounce = new Sprite(width/2,40,100,20,'k');
  addRotationHandle(bounce,bounce.halfWidth + 10);
  addTranslationHandle(bounce);
  bounce.bounciness = 1;
  bounce.color = color(3, 3, 3, 200);
}