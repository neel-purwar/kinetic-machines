////////////////////////////////////////////////////////////////////////
function setupL3()
{
  createSpritesL3();
  setFlags();
}

////////////////////////////////////////////////////////////////////////
function playL3()
{
 
  if (startButton.mouse.pressing()) 
  {
    ball.collider = 'd';
    bar.collider = 's';
    world.gravity.y = 10; // Activate gravity
    flipper1.rotationSpeed = 2;
    flipper2.rotationSpeed = 2;
  }

   if (resetButton.mouse.pressing())
    reset();


 // Check for collision with the basket and if the ball has come to a stop
  if (ball.collides(basket) && (abs(ball.velocity.x) < .1) && (abs(ball.velocity.y) < .1)) {
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
      drawSolutionL3();
  }

}

function drawSolutionL3()
{  
    bar.rotation = -30;
    bar.position.x = 450;
    bar.position.y = 350;
}


////////////////////////////////////////////////////////////////////////
function createSpritesL3()
{
  flipper1 = new Sprite(width/2, height/2.5, 130, 30, 'k');
	flipper1.color = color(237, 187, 51, 218);
	
  flipper2 = new Sprite(width/2, height/2.5, 30, 130, 'k');
	flipper2.color = color(237, 187, 51, 218);
	
  baseframe = new Sprite(width/2, height/2.5, 20, 's'); // Static base
  baseframe.color = color(150); // Gray base


  bar = new Sprite(width/2,40,100,20,'k');
  addRotationHandle(bar,bar.halfWidth + 10);
  addTranslationHandle(bar);
  bar.bounciness = 1;
  bar.drag = 10;
  bar.rotationDrag = 5;
  bar.color = color(3, 3, 3, 200);

  fixedbar = new Sprite(width/2-150, height/3, 170, 30, 's');
  fixedbar.rotation = 25;
  fixedbar.stroke = color(0,0,0,100);
  fixedbar.color = color(0,0,0,100);

  ball = new Sprite(width/2-210, height/4.65, 20, 's');
  ball.vel.x = 0;
  ball.vel.y = 0;
  ball.color = color(255,0,0,200);
  ball.stroke = color(255,0,0,200);

  	//        (  x,   y, [length0, angle0, length1, ...])
	// basket = new Sprite(width/2-100, height/1.2, [60, 40, 60, -40, 60, -40], 's');
  // basket.stroke = color(0,0,0,100);
  // basket.strokeWeight = 7;

  basket = new Sprite(width/2-100, height/1.3, [60, 40, 60, -40, 60, -40], 's');
  basket.stroke = color(0,0,0,100);
  basket.strokeWeight = 7;

}