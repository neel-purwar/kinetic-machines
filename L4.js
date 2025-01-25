////////////////////////////////////////////////////////////////////////
function setupL4()
{
  createSpritesL4();
  setFlags();
}

////////////////////////////////////////////////////////////////////////
function playL4()
{
 
  if (kb.pressing('left')) 
    {
		  fulcrum.x--;
	  } 
    else if (kb.pressing('right')) 
    {
		  fulcrum.x++;
	  } 
    else if (kb.pressing('up'))
    {
      block.width++;
      block.height++;
      if (block.width > 100 || block.height > 100)
      {
        block.width = 100;
        block.height = 100;
      }
    }
    else if (kb.pressing('down'))
    {
       block.width--;
       block.height--;
      if (block.width < 10 || block.height < 10)
      {
        block.width = 10;
        block.height = 10;
      }
    }

  if (startButton.mouse.pressing()) 
  {
    block.collider = 'd';
    world.gravity.y = 20; // Activate gravity 
    bar.collider = 'd';
  }

 // Check for collision with the basket and if the ball has come to a stop
  if (smallBall.collides(basket) && (abs(smallBall.velocity.x) < .1) && (abs(smallBall.velocity.y) < .1)) {
    success = true; // Set success flag to true        
  }

   if (resetButton.mouse.pressing())
    reset();

  handleLevelTransition();

  if (previousButton.mouse.pressing())
  {
    level--;
    reset();
  }

  if (!showEducationalImage)
  {
    setFont();
    text('Use all four arrow keys to', width/2, height-65);
    text('help red ball go inside the basket!', width/2, height-40);
  }
 
 if (solutionButton.mouse.pressing())
  {
      drawSolutionL4();
  }


}

function drawSolutionL4()
{  
    block.position.x = 106;
    block.position.y = 79.5;
    block.width = 70;
    block.height = 70;
    fulcrum.position.x = 250;
}

////////////////////////////////////////////////////////////////////////
function createSpritesL4()
{    
    fixedbar = new Sprite(width/2, height-100, 650, 20, 's');
    fixedbar.stroke = color(0,0,0,100);
    fixedbar.color = color(0,0,0,100);

    block = new Sprite(width/2, 40, 40, 40, 'k');
    addTranslationHandle(block);
    block.vel.x = 0;
    block.vel.y = 0;
    block.color = color(255,0,0,200);
    block.stroke = color(255,0,0,200);
      
    fulcrum = new Sprite(width/2-100, height-115, 25, 'triangle');
    fulcrum.color = color(244, 203, 39);
    fulcrum.collider = 'k'
    addTranslationHandle(fulcrum);

    bar = new Sprite(width/2, height-135, 400, 10, 'k');
    bar.color = color(244, 203, 39);
  
   	basket = new Sprite(width/2+230, height/2-45, [60, 90, 40, -90, 60, -90], 's');
    basket.stroke = color(0,0,0,100);
    basket.strokeWeight = 7;
   
    basketPole = new Sprite(width/2+230, height-175, 7, 135, 's');
    basketPole.color = color(0,0,0,100)
    basketPole.stroke = color(0,0,0,100)

    smallBall = new Sprite();
    smallBall.color = 'red';
    smallBall.diameter = 25;
    smallBall.position.x = 475;
    smallBall.position.y = height-150;
    smallBall.stroke = color(255,0,0,200);
  
}


