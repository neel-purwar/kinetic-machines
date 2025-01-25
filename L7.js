////////////////////////////////////////////////////////////////////////
function setupL7()
{
  setFlags();  
}

////////////////////////////////////////////////////////////////////////
function playL7()
{
  // Display the credit image
  image(creditImage, 0,0);

  // Ensure only the home button is visible
  homeButton.visible = true;
  startButton.visible = false;
  nextButton.visible = false;
  previousButton.visible = false;
  resetButton.visible = false;
  solutionButton.visible = false;

}