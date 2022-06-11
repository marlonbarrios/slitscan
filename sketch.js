// Soft-space #2: Slitscan imaging techniques are used to create static images of time-based phenomena. In traditional film photography, slit scan images are created by exposing film as it slides past a slit-shaped aperture. In the digital realm, thin slices are extracted from a sequence of video frames, and concatenated into a new image.
// Granulation of a 3D printer's operating sound is influences by the pixel colours at the current scan point
// concept and programming: Marlon Barrios Solano
// interactive audio programming: Cristian Vogel ( @neverenginelabs )

var video, sample;
let x = 0, y = 0;
let running = false;
let bufferPos
let prompt = 'click to start audio'
let playButton, playBG

function preload() {

  soundFormats('mp3');
  sample = loadSound('assets/mp3/3DPrinter_Piezo.mp3')
}

function setup() {
  getAudioContext().suspend();
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1)
  video = createCapture(VIDEO)
  video.size(windowWidth,windowHeight);


  background(51);
  playButton = createDiv().class('playButtonOuter')
  playBG = createDiv('').class('playButtonInner')
  playBG.parent(playButton)
  video.hide();
  bufferPos = ( n ) => min(1, abs(n)) * sample.duration() ;

}

function draw() {
  if (!running) {
    playButton.center();
    return
  } else {
    playButton.hide()
  }

  video.loadPixels();

  //image(video,0,0)
  let w = video.width;
  let h = video.height;

  copy(video,w/2, 0, 1 , h, x , 0, 1, h)

  x = (x > w) ? 0 : x + 1;
  newGrain()
}

function normAverageFromRGBat(i) {
  const res = norm((video.pixels[i] + video.pixels [i + 1] + video.pixels [i + 2]) / 3, 0, 255)
  return res
}

function newGrain( pos = x ){
  if (!running) return;
  const influence = pixelAt( pos );
  const grainDur = max(0.1, noise( pos * 0.1))
  const extent = (sample.duration() * 0.99) - grainDur
  const mapping = map( influence, 0 , 1 , 0, bufferPos( pos / video.width ) )
  const newPos = min(  extent, mapping )
 // console.log ( `grain dur: ${grainDur} max dur: ${extent} -> new pos: ${newPos}`)
  sample.jump( newPos, grainDur )
  sample.setVolume( influence * 2, 0.01 )
}

function pixelAt( x, y = video.height / 2 ){
  const index = 4 * ((y * video.width) + x);
  const pixelValue = normAverageFromRGBat(index)
  //console.log(`pixel value: ${pixelValue}`)
  return pixelValue
}

let initSound = function () {
  userStartAudio();
  running = true;
  sample.play(0.25);
  sample.setVolume(0.7, 0.1)
};

function mousePressed(){
  if (getAudioContext().state !== 'running') {
    initSound();
    return;
  }
  saveFrames('horizontal-slitscan', 'png', 1, 1);
}
