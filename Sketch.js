let flipper1, flipper2, bar, fixedbar, ball, basket, dominos; 
let hammer, ramp1, ramp2, ramp3, ramp4; 
let hammerHandle, hammerHead, hammerHinge, crateR, ball1, ball2;
let bar_solution;
let startButton, resetButton, nextButton, previousButton, solutionButton, homeButton;
let musicNote;
let nextIntroButton, previousIntroButton;
let rotationHandleDistance;
let isDragging;
let initialAngle;
let handleX, handleY;
let result = 0;
let gravityActivated;
let success;
let framesSinceFirstCollision = 10;
let arcSize;
let successSound, introSound, gameSound;
let successHasPlayed;
let turnMusicOff = false;
let level = 0;

let introImages = [];
let learningImages = [];
let currentImageIndex = 0;
let showIntro = true;
let gameOn = false;

let selectedRotationHandle = null;
let selectedTranslationHandle = null;

let ChalkboyFont;

let hideNavigation = false;

let showEducationalImage = false; // New state to display educational images
let currentEducationalImage = null; // Image to be displayed

let showCredits = false; // Tracks whether to display the credit screen
let creditImage; // Holds the credit image




////////////////////////////////////////////////////////////////////////
function preload() {
  // Load the images for the sprites

  introImages[0] = loadImage('assets/intro1.jpg');
  introImages[1] = loadImage('assets/intro2.jpg');
  introImages[2] = loadImage('assets/intro3.jpg');
  introImages[3] = loadImage('assets/intro4.jpg');
  introImages[4] = loadImage('assets/intro5.jpg');
  introImages[5] = loadImage('assets/intro6.jpg');

  learningImages[0] = loadImage('assets/learn0.png');
  learningImages[1] = loadImage('assets/learn1.png');
  learningImages[2] = loadImage('assets/learn2.png');
  learningImages[3] = loadImage('assets/learn3.png');
  learningImages[4] = loadImage('assets/learn4.png');
  learningImages[5] = loadImage('assets/learn5.png');
  learningImages[6] = loadImage('assets/learn6.png');

  creditImage = loadImage('assets/credit.png');

  bgImage = loadImage('assets/grid.jpg'); 

  successSound = loadSound("assets/success-small.mp3");
  successSound.volume = 0.3;
  introSound = loadSound("assets/cinematic-cut.mp3");
  // ChalkboyFont  = loadFont("assets/Chalkboy.ttf");
}

////////////////////////////////////////////////////////////////////////
function setup() {
  new Canvas(625,471);

  makeMusicNote();   

  if (showIntro)
  {
    setupButtons();      
  }
  else if (gameOn)
  {    
    nextIntroButton.visible = false;
    previousIntroButton.visible = false;
    skipIntroButton.visible = false;
    commonSprites();
    checkNavigation();
    switch (level)
    {
    case 0:
      setupL0();
      break;
    case 1:
      setupL1();
      break;
    case 2: 
      setupL2();
      break;
    case 3: 
      setupL3();
      break;
    case 4: 
      setupL4();
      break;
    case 5: 
      setupL5();
      break;
    case 6: 
      setupL6();
      break;
    case 7: 
      setupL7();
      break;
    default:    
    }
  }
  
}

function checkNavigation() {
  if (hideNavigation) {
    startButton.visible = false;
    nextButton.visible = false;
    previousButton.visible = false;
    homeButton.visible = false;
    solutionButton.visible = false;
    resetButton.visible = false;
    skipIntroButton.visible = false;
  } else {
    startButton.visible = true;
    nextButton.visible = true;
    previousButton.visible = true;
    homeButton.visible = true;
    solutionButton.visible = true; // Always hidden in educational state
    resetButton.visible = true;
  }
}

////////////////////////////////////////////////////////////////////////
function draw() {
  clear(); 

  if (musicNote.mouse.pressed())
  {
    turnMusicOff = !turnMusicOff;
     console.log("music off from mouse press");
  }
    if (turnMusicOff)
      introSound.pause();


  if (showIntro) 
  {
    displayIntroImages();
    userStartAudio().then(() => {
    if (!introSound.isPlaying() && !turnMusicOff) 
      {
        introSound.play();
        console.log("music on");
      }
    else console.log("music off")
     });
  } 

  if (gameOn)
  {
    background(bgImage);
    introSound.pause();

    if (homeButton.mouse.pressing())
      {
        showIntro = true;
        gameOn = false;
        currentImageIndex = 0;
        turnMusicOff = false;
        allSprites.remove();
        level = 0;
        showEducationalImage = false;
        currentEducationalImage = null;
        setup();
      }

    switch (level)
    {
    case 0:
      playL0();
      break;
    case 1:
      playL1();
      break;
    case 2: 
      playL2();
      break;
    case 3: 
      playL3();
      break;
    case 4: 
      playL4();
      break;
    case 5: 
      playL5();
      break;
    case 6: 
      playL6();
      break;
    case 7: 
      playL7();
      break;
    default:
    }
  
    // Draw all sprites

  allSprites.draw();

  for (let sprite of allSprites) {
    if (sprite.rotationHandle) {
      if (selectedRotationHandle && selectedRotationHandle.parentSprite === sprite) {
        let angle = atan2(mouseY - sprite.y, mouseX - sprite.x);
        sprite.rotation = angle;
      }
      drawRotationHandle(sprite);
    }

    if (sprite.translationHandle) {
      if (sprite.mouse.dragging()) {
       sprite.moveTowards(mouse.x + sprite.mouse.x, mouse.y + sprite.mouse.y, 1);
      }
      drawTranslationHandle(sprite);
    }

    if (sprite.mouse.released())
    {
    sprite.vel.x = 0;
    sprite.vel.y = 0;
    }
  }
  }
}

function displayIntroImages() {
  background(0);

  image(introImages[currentImageIndex], 0, 0);

  if (nextIntroButton.mouse.pressed()) 
    nextImage();

  if (previousIntroButton.mouse.pressed())
    previousImage();

  if (skipIntroButton.mouse.pressed())
  {
    showIntro = false;
    gameOn = true;
    currentImageIndex = 0;
    turnMusicOff = true;
    allSprites.remove();
    level = 0;
    showEducationalImage = false;
    currentEducationalImage = null;
    setup();
  }

}

function setFont(size)
{
  textFont("cursive");
  textSize(size);
  textAlign(CENTER);
}
function setupButtons() {

  setFont(18);

  nextIntroButton = new Sprite(width - 35, height - 15, 65,25, 'k');
  // nextIntroButton.textSize = 20;
  nextIntroButton.text ="Next";
  nextIntroButton.color = color(255, 255, 255);
  nextIntroButton.stroke = color(255, 255, 255);


  previousIntroButton = new Sprite(40, height - 15, 75,25, 'k');
  // previousIntroButton.textSize = 20;
  previousIntroButton.text ="Previous";
  previousIntroButton.color = color(255, 255, 255);
  previousIntroButton.stroke = color(255, 255, 255);

  skipIntroButton = new Sprite(width - 48, 15, 90, 25, 'k');
  // skipIntroButton.textSize = 20;
  skipIntroButton.text =" Skip Intro ";
  skipIntroButton.color = color(255, 255, 255, 133);
  skipIntroButton.stroke = color(255, 255, 255);

}

function nextImage() {
  if (currentImageIndex < introImages.length - 1) {
    currentImageIndex++;
  } else {
    showIntro = false; // End the intro and start the game
    gameOn = true;
    setup();
  }
}

function previousImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
  }
}

////////////////////////////////////////////////////////////////////////
function mousePressed() {
  // Check for rotation handle
  selectedRotationHandle = null;
  for (let sprite of allSprites) {
    if (sprite.rotationHandle) {
      let angle = sprite.rotation;
      let rotationHandleX = sprite.x + cos(angle) * sprite.rotationHandle.offset;
      let rotationHandleY = sprite.y + sin(angle) * sprite.rotationHandle.offset;

      if (dist(mouseX, mouseY, rotationHandleX, rotationHandleY) < 15) {
        selectedRotationHandle = sprite.rotationHandle;
        return;
      }
    }
  }

  // Check for translation handle
  selectedTranslationHandle = null;
  for (let sprite of allSprites) {
    if (sprite.translationHandle) {
      if (dist(mouseX, mouseY, sprite.x, sprite.y) < 35) {
        selectedTranslationHandle = sprite.translationHandle;
        return;
      }
    }
  }
}

////////////////////////////////////////////////////////////////////////
function mouseReleased() {
  selectedRotationHandle = null;
  selectedTranslationHandle = null;
  allSprites.vel.x = 0;
  allSprites.vel.y = 0;
}


////////////////////////////////////////////////////////////////////////
function drawRotationHandle(sprite) {
  let angle = sprite.rotation;
  let handleX = sprite.x + cos(angle) * sprite.rotationHandle.offset;
  let handleY = sprite.y + sin(angle) * sprite.rotationHandle.offset;

  textFont('Helvetica'); 
  arcSize = sprite.height + 12;
  textSize(arcSize);
  textAlign(CENTER, CENTER);
  push();
  translate(handleX, handleY+2);
  rotate(angle);
  fill(255, 255, 255);
  stroke('gray');
  text("\u2938", 0, 0); // Unicode character ⤸
  pop();


}

////////////////////////////////////////////////////////////////////////
function drawTranslationHandle(sprite) {
  let handleX = sprite.x;
  let handleY = sprite.y;

  textFont('Helvetica'); 
  textSize(arcSize-7);
  textAlign(CENTER, CENTER);
  push();
  translate(handleX, handleY+2);
  fill(255, 255, 255);
  stroke('gray');
  text("\u2723", 0, 0); // Unicode character ✣
  pop();
}

function makeMusicNote()
{
    // Create a sprite for the music note
    //ellipse(width-25, height-40, 50,50);
   musicNote = new Sprite(width-25, height-80, 50, 50, 'k');
  // Customize the appearance with a Unicode character
    musicNote.draw = function () {
    textAlign(CENTER, CENTER);
    textFont("Helvetica");
    textSize(25);
    fill(255, 255, 255);
    text(turnMusicOff ? "\u266B" : "\u266B", 0, 0); // \u266B for music, \u1F507 for no music
    textFont('Verdana');
    textSize(15);
    text(turnMusicOff ? "off" : "on", 0, 20); // \u266B for music, \u1F507 for no music
  };

}
////////////////////////////////////////////////////////////////////////
function commonSprites()
{
  setFont(18);

  startButton = new Sprite(40,20, 70,25, 'k');
  startButton.text = "Run";
  //startButton.color = 'white';
  startButton.color = color(255, 255, 255, 200);
  // startButton.strokeWeight = 0;

  homeButton = new Sprite(40, 50, 70,25, 'k');
  homeButton.text = "Home";
  homeButton.color = color(255, 255, 255, 200);


  resetButton = new Sprite(width-40,20, 70, 25, 'k');
  resetButton.text = "Reset";
  resetButton.color = color(255, 255, 255, 200);

  nextButton = new Sprite(width-40, 50, 70, 25, 'k');
  nextButton.text = "Next";
  nextButton.color = color(255, 255, 255, 200);

  previousButton = new Sprite(width-40, 80, 70, 25, 'k');
  previousButton.text = "Previous";
  previousButton.color = color(255, 255, 255, 200);
  

  solutionButton = new Sprite(40, height-20, 75,25, 'k');
  solutionButton.text = "Solution";
  solutionButton.color = color(255, 255, 255, 200);  

}

////////////////////////////////////////////////////////////////////////
function reset() 
{
  allSprites.remove();
  setup();  
}

////////////////////////////////////////////////////////////////////////
function setFlags()
{
  gravityActivated = false; // Deactivate gravity.
  success = false;
  isDragging = false;
  successHasPlayed = false;
}

////////////////////////////////////////////////////////////////////////
/**
 * Adds a rotation handle to an existing sprite.
 * @param {Sprite} sprite - The sprite to add a rotation handle to.
 * @param {number} offset - The distance of the handle from the sprite center.
 */
function addRotationHandle(sprite, offset) {
  sprite.rotationHandle = {
    parentSprite: sprite, // Link to the parent sprite
    offset: offset,       // Distance from the sprite center
  };
}

////////////////////////////////////////////////////////////////////////
/**
 * Adds a translation handle to an existing sprite.
 * @param {Sprite} sprite - The sprite to add a translation handle to.
 */
function addTranslationHandle(sprite) {
  sprite.translationHandle = {
    parentSprite: sprite, // Link to the parent sprite
    offset: 0,            // Centered on the sprite
  };
}

////////////////////////////////////////////////////////////////////////
// Display success message if the ball stops in the basket
  function successMessage()
  {
    if (success) 
      {
        setFont(20);
        text('Level ' + level + ' of 6 Completed!', canvas.w/2, 40);
        if (!successSound.isPlaying() && !successHasPlayed) 
          {
            if (!turnMusicOff) 
              successSound.play();
            successHasPlayed = true;
          }
      }
  }
  

////////////////////////////////////////////////////////////////////////
  function keyPressed()
  {
    //allSprites.debug = !allSprites.debug;
  }


////////////////////////////////////////////////////////////////////////
function hideLevelSprites() {
  for (let sprite of allSprites) {
    sprite.visible = false; // Hide all active sprites
  }
}

////////////////////////////////////////////////////////////////////////
function showEducation() {

  image(currentEducationalImage, 0, 0);

  // Display navigation buttons
  startButton.visible = false;
  nextButton.visible = true;
  previousButton.visible = false;
  resetButton.visible = false;
  homeButton.visible = true;
  solutionButton.visible = false; // Hide solution button in educational state
  setFont(25);
}

function handleLevelTransition() {
  if (success) successMessage();

  if (nextButton.mouse.pressed()) {
    if (!showEducationalImage) {
      // Enter the educational state
      showEducationalImage = true;
      currentEducationalImage = learningImages[level]; // Set the educational image for the current level
      allSprites.remove();
      commonSprites();
      checkNavigation();
    } else {
      // Exit the educational state and advance to the next level
      showEducationalImage = false; // Reset the educational state
      level++; // Move to the next level
      reset(); // Start the next level
    }
  }
  
  if (showEducationalImage) 
    // Display the educational image
    showEducation();

}