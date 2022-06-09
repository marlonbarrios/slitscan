var video;
var x = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1)
  video = createCapture(VIDEO)
  video.size(windowWidth,windowHeight);
  background(51);
}

function draw() {

  video.loadPixels();
//image(video,0,0)
var w = video.width;
var h = video.height;

copy(video, w/2, 0, 1, h, x , 0, 1, h)
x = x +1 ;
if (x > w) {
x = 0;
}

}

function mousePressed(){
  saveFrames('slitscan', 'png', 1, 1);
}
