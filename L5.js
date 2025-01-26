////////////////////////////////////////////////////////////////////////
function setupL5()
{
  createSpritesL5();
  setFlags();
}

////////////////////////////////////////////////////////////////////////
function playL5()
{
 
  if (startButton.mouse.pressing()) 
  {
    ball1.collider = 'd';
    ball2.collider = 'd';
    world.gravity.y = 10; // Activate gravity 
    dominos.collider = 'd';  
    hammerHandle.collider = 'd';
    hammerHead.collider = 'd';
  }

  if (ball2.collides(basket))
    success = true;

   handleLevelTransition();
   
  if (resetButton.mouse.pressing())
    reset();

  if (previousButton.mouse.pressing())
  {
    level--;
    reset();
  }

  if (!showEducationalImage)
  {
    setFont(18);
    text('Lay the dominos and', width/2, height-60);
    text('help red ball go inside the basket!', width/2, height-35);
  }

  if (solutionButton.mouse.pressing())
  {
      drawSolutionL5();
  }
}

  function drawSolutionL5()
{  
  for (let i = 0; i < dominos.length; i++)
  {
    dominos[i].position.x = 150 + i*55;
    dominos[i].y = 159;  
  }
}
////////////////////////////////////////////////////////////////////////
function createSpritesL5()
{
    dominos = new Group();
    dominos.width = 10;
    // dominos.height = 60;
   // dominos.amount = 3;  
    dominos.y = 40;
    dominos.collider = 'k';
    dominos.color = color(223, 170, 13, 200);
    dominos.stroke = color(0, 0, 0, 200);
    dominos.rotation = 0;
   
	 while (dominos.length < 3)
   {
		let d = new dominos.Sprite();
    //addRotationHandle(d, d.halfWidth + 10);
    addTranslationHandle(d);
		d.x = (width/2-100) + dominos.length * 50;
    //d.height = 85 + dominos.length*10;  
	  }
  
    ramp1 = new Sprite(width/2-50, 100, 350, 20, 's');
    ramp1.stroke = color(0,0,0,100);
    ramp1.color = color(0,0,0,100);
    ramp1.rotation = 7

    ramp2 = new Sprite(width/2-20, height/2-40, 350, 20, 's');
    ramp2.stroke = color(0,0,0,100);
    ramp2.color = color(0,0,0,100);
   
    ramp3 = new Sprite(width/1.5+120, height/2-80, 150, 20, 's');
    ramp3.stroke = color(0,0,0,100);
    ramp3.color = color(0,0,0,100);
    ramp3.rotation = -30;

    ramp4 = new Sprite(width/2-30, height-130, 275, 20, 's');
    ramp4.stroke = color(0,0,0,100);
    ramp4.color = color(0,0,0,100);

    ball1 = new Sprite(100, 30, 30, 'k');
    ball1.vel.x = 0;
    ball1.vel.y = 0;
    ball1.color = color(67, 109, 205, 200);
    ball1.stroke = color(67, 109, 205, 200);
    ball1.rotationDrag = 0.75; 
   
    ball2 = new Sprite(width/2-150, height-160, 40, 'k');
    ball2.vel.x = 0;
    ball2.vel.y = 0;
    ball2.color = color(255, 0, 0, 255);
    ball2.stroke = color(255, 0, 0, 255);

   	basket = new Sprite(width/2+220, height/2+120, [60, 40, 60, -40, 60, -40], 's');
    basket.stroke = color(0,0,0,100);
    basket.strokeWeight = 7;

    hammerHandle = new Sprite(width/2-210, height-305, 10, 80, 'k');
    hammerHead = new Sprite(width/2-210, height-350, 37.5, 20, 'k');
    hammerHandle.color = color(134, 71, 23, 200);
    hammerHead.color = color(98, 95, 93, 200);
    
    hammer = new GlueJoint(hammerHandle, hammerHead);

    frame = new Sprite(width/2-210, height/2-35, 25, 25, 'k');
     frame.visible = false;
    
    hammerHinge = new HingeJoint(frame, hammerHandle);
    hammerHinge.offsetA = {x: 0, y:10};
    hammerHinge.maxPower = 0.5;
  

    
}