
////////////////////////////////////////////////////////////////////////
function setupL0()
{
  createSpritesL0();
  setFlags();
  previousButton.visible = false;
  
}

////////////////////////////////////////////////////////////////////////
function playL0()
{
	// background(L1bgImage);

 if (kb.pressing('up'))
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
  gravityActivated = true; 

  if (gravityActivated)
  {
    world.gravity.y = 100;  
    ball1.collider = 'd';
    ball2.collider = 'd';
    ball3.collider = 'd';
  
  }

  handleLevelTransition();

if (resetButton.mouse.pressing())
    reset();

if (!showEducationalImage)
{
  // fill(color(252, 38, 0));
  setFont(18);
  text('Practice positioning objects below the balls to see bounce effect.', width/2, height-65);
  text('Use up and down keys to change the size of the square box.', width/2, height-40);
}

  if (solutionButton.mouse.pressing())
  {
      drawSolutionL0();
  }

}



function drawSolutionL0()
{  
    bar.rotation = -20;
    bar.position.x = 322;
    bar.position.y = 300;
}

////////////////////////////////////////////////////////////////////////
function createSpritesL0()
{
  bar = new Sprite(width/2-100,40,100,20,'k');
  addRotationHandle(bar, bar.halfWidth + 10);
  addTranslationHandle(bar);
  bar.color = color(255, 0, 0, 200);

  bounce = new Sprite(width/2+30,40,100,20,'k');
  addRotationHandle(bounce,bounce.halfWidth + 10);
  addTranslationHandle(bounce);
  bounce.bounciness = 1;
  bounce.color = color(3, 3, 3, 200);

  block = new Sprite(width/2+125, 40, 40, 40, 'k');
  addTranslationHandle(block);
  block.color = color(255,0,0,200);
  block.stroke = color(255,0,0,200);

  // bolt = new Group();
  // bolt.collider = 'k';
  // bolt.color = color(0, 0, 0, 84);
  // bolt.stroke = color(0, 0, 0, 200);
   
	//  while (bolt.length < 3)
  //  {
	// 	let b = new bolt.Sprite(25, 25, 7, 'hexagon');
  //   //addRotationHandle(d, d.halfWidth + 10);
  //   addTranslationHandle(b);
	// 	 b.x = 230 + bolt.length * 40;
  //    b.y = 60;
  //   //d.height = 85 + dominos.length*10;  
	//   }

  ball1 = new Sprite(width/2-115, 100, 20, 's');
  ball1.color = color(255,0,0,200);
  ball1.stroke = color(255,0,0,200);

  ball2 = new Sprite(width/2+5, 100, 20, 's');
  ball2.color = color(255,0,0,200);
  ball2.stroke = color(255,0,0,200);

  ball3 = new Sprite(width/2+120, 100, 20, 's');
  ball3.color = color(255,0,0,200);
  ball3.stroke = color(255,0,0,200);
}