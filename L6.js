////////////////////////////////////////////////////////////////////////
function setupL6()
{
  createSpritesL6();
  setFlags();
  
}

////////////////////////////////////////////////////////////////////////
function playL6()
{
 
  if (startButton.mouse.pressing()) 
  {
    ball1.collider = 'd';
    bounce.collider = 's';
    world.gravity.y = 10; // Activate gravity 
    bolt.collider = 'k';  
    flipper1.rotationSpeed = 2;
    flipper2.rotationSpeed = 2;
    bar.collider = 'd'
    box.collider = 'd'
  }

  if (ball1.collides(basket))
    success = true;

   
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
    text('Use elements provided and', width/2, height-65);
    text('help ball go inside the basket!', width/2, height-40);
  }
  
  if (solutionButton.mouse.pressing())
  {
      drawSolutionL6();
  }
}
////////////////////////////////////////////////////////////////////////
 function drawSolutionL6()
{  
  box.position.x = 340;
  box.position.y = 383;
  bounce.position.x = 275.5;
  bounce.position.y = 383;
  bounce.rotation = -4;
  
  bolt[0].position.x = 300;
  bolt[0].position.y = 225;

  bolt[1].position.x = 312;
  bolt[1].position.y = 245;
  
  bolt[2].position.x = 330;
  bolt[2].position.y = 265;


 
  // bolt[0].position.x = 300;
  // bolt[0].position.y = 400;

  // bolt[1].position.x = 250;
  // bolt[1].position.y = 180;
  
  // bolt[2].position.x = 250;
  // bolt[2].position.y = 180;
  

}

function createSpritesL6()
{
    bolt = new Group();
    bolt.collider = 'k';
    bolt.color = color(0, 0, 0, 84);
    bolt.stroke = color(0, 0, 0, 200);
   
	 while (bolt.length < 3)
   {
		let b = new bolt.Sprite(25, 25, 7, 'hexagon');
    //addRotationHandle(d, d.halfWidth + 10);
    addTranslationHandle(b);
		 b.x = 190 + bolt.length * 40;
     b.y = 40;
    //d.height = 85 + dominos.length*10;  
	  }
    ramp1 = new Sprite(width/2+125, 125, 200, 20, 's');
    ramp1.stroke = color(0,0,0,100);
    ramp1.color = color(0,0,0,100);
    ramp1.rotation = -25 

    ramp2 = new Sprite(width/2-50, 150, 150, 20, 's');
    ramp2.stroke = color(0, 0, 0, 100);
    ramp2.color = color(0,0,0,100);
    ramp2.rotation = -110
    
    floor = new Sprite(width/2, height/1.5+100, 612, 20, 's');
    floor.stroke = color(0,0,0,100);
    floor.color = color(0,0,0,100);

    ball1 = new Sprite(497, 70, 20, 'k');
    ball1.vel.x = 0;
    ball1.vel.y = 0;
    ball1.color = color(255, 0, 0, 255);
    ball1.stroke = color(255, 0, 0, 255);
    ball1.rotationDrag = 1.5; 


   	basket = new Sprite(width/8+10, height/2+100, [60, 40, 60, -40, 60, -40], 's');
    basket.stroke = color(0,0,0,100);
    basket.strokeWeight = 7;
    
    flipper1 = new Sprite(width/4-50, height/2.5, 130, 20, 'k');
	  flipper1.color = color(237, 187, 51, 218);;
	  flipper2 = new Sprite(width/4-50, height/2.5, 20, 130, 'k');
	  flipper2.color = color(237, 187, 51, 218);;
	  baseframe = new Sprite(width/4-50, height/2.5, 15, 's'); // Static base
    baseframe.color = color(150); // Gray base 
    
    bar = new Sprite(width/3+200, height/1.46, 150, 10, 'k');
    bar.rotation = 20;
    bar.color = color(244, 203, 39);
    fulcrum = new Sprite(width/3+200, 371, 85, 'triangle');
    fulcrum.collider = 'd'
    fulcrum.color = color(244, 203, 39);

    box = new Sprite(180, 40, 25, 25, 'k')
    box.color = color("red");
    addRotationHandle(box, box.halfWidth + 10);
    addTranslationHandle(box);

    bounce = new Sprite(400,40,100,20,'k');
    addRotationHandle(bounce,bounce.halfWidth + 10);
    addTranslationHandle(bounce);
    bounce.bounciness = 2.5;
    bounce.color = color(3, 3, 3, 200);
}