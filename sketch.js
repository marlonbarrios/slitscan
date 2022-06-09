//Soft-space #2: Slitscan imaging techniques are used to create static images of time-based phenomena. In traditional film photography, slit scan images are created by exposing film as it slides past a slit-shaped aperture. In the digital realm, thin slices are extracted from a sequence of video frames, and concatenated into a new image.

//concept and programminf: Marlon Barrios Solano

var video;
var x = 0;
var y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1)
  video = createCapture(VIDEO)
  video.size(windowWidth,windowHeight);

  background(51);

  video.hide();
}

function draw() {

  video.loadPixels();


//image(video,0,0)
var w = video.width;
var h = video.height;
stroke('white')


// copy(video, 0, y, w , 1,  0, y, w , 1,)
// y = y +1 ;
// if (y > h) {
// y = 0;
// }
copy(video,w/2, 0, 1 , h, x , 0, 1, h)

x = x +1 ;
if (x > w) {
x = 0;
}






}

function mousePressed(){
  saveFrames('horizomtal-slitscan', 'png', 1, 1);
}
