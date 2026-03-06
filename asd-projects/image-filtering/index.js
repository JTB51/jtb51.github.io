// This is a small program. There are only two sections. 
// This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; 
// do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and
// is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
   applyFilter(reddify);
  // applyFilter(increaseGreenByBlue);
  // applyFilter(decreaseBlue);
   applyFilterNoBackground(reddify); 
   applyFilterNoBackground(increaseGreenByBlue); 
  // applyFilterNoBackground(decreaseBlue); 
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2, 3 & 5: Create the applyFilter function here
function applyFilter (filterFunction) {
  for (var r = 0; r < image.length; r++) {
    for (var c = 0; c < image[r].length; c++) {
      var pixel = image[r][c];
      var pixelArray = rgbStringToArray(pixel);
      filterFunction(pixelArray);
      var updatedPixel = rgbArrayToString(pixelArray);
      image[r][c] = updatedPixel;
    }
  }
}

// TODO 9 Create the applyFilterNoBackground function
function applyFilterNoBackground (filterFunction) {
  var backgroundColor = image[0][0];
  for (var r = 0; r < image.length; r++) {
    for (var c = 0; c < image[r].length; c++ ) {
      var pixel = image[r][c];
      if (pixel !== backgroundColor) {
        var pixelArray = rgbStringToArray(pixel);
        filterFunction(pixelArray);
        pixel = rgbArrayToString(pixelArray);
        image[r][c] = pixel; 
      } 
    }
  }
}

// TODO 6: Create the keepInBounds function
function keepInBounds (num) {
  return num < 0 ? 0 : num > 255 ? 255 : num; 
}
// TODO 4: Create reddify filter function
function reddify(arr) {
  arr[RED] = 200;
}
// TODO 7 & 8: Create more filter functions
function decreaseBlue (arr) {
  arr[BLUE] = keepInBounds(arr[BLUE] - 50); 
}
function increaseGreenByBlue (arr) {
  arr[GREEN] = keepInBounds(arr[GREEN] + arr[BLUE])
}

// CHALLENGE code goes below here
