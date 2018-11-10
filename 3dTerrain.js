let cols = 10; 
let rows = 10;
let scl = 40;
let w = 1200;
let h = 1600;

let song;
let button;
let jumpButton;
let amp;

let flying = 0;
let terrain = [];

function make2dArray(cols, rows) {
    let arrCol = new Array(cols);
    for (let i=0; i < arrCol.length; i++) {
        arrCol[i] = new Array(rows);
    }
    return arrCol;
} 

function loaded() {
	// the loaded function is the callback
	console.log("loaded");
	
	// the buttons/sliders don't appear until the sound is completely loaded
	button = createButton("play");
	button.mousePressed(togglePlaying);

}

function setup() {
    song = loadSound("./file.mp3", loaded);
    createCanvas(600, 600, WEBGL);
    cols = w / scl;
    rows = h / scl;
    terrain = make2dArray(cols, rows);
    amp = new p5.Amplitude();
}



function draw() {
    let vol = amp.getLevel();
    let noiseDiam = map(vol, 0, 0.3, 0, 0.2);
    flying -= 0.1;

    // Perlin Noise
    let yoff = flying;
    for (let y=0; y < rows; y++) {
        let xoff = 0;
        for (let x=0; x < cols; x++ ) {
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -150, 150);
            xoff += noiseDiam;
        }
        yoff += noiseDiam;
    }
    
    background(0);
    let colorDiam = map(vol, 0, 0.3, 0, 255);
    stroke(colorDiam * random(0.8), colorDiam * random(0.8), colorDiam * random(0.8));
    noFill();
    rotateX(PI/3);
    translate(-w/2, -h/2);
    
    // TRIANGLE_STRIP MESH on x-y grids
    for(let y=0; y < rows-1; y++) {
        beginShape(TRIANGLE_STRIP);
        for(let x=0; x < cols; x++) {
            vertex(x*scl, y*scl, terrain[x][y]);
            vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
            //rect(x*scl, y*scl, scl, scl);
        }
        endShape();
    }
}

function togglePlaying() {
	if (!song.isPlaying()) {
		song.play();
		// 4.3 set the max volume to 0.3
		song.setVolume(0.3);
		button.html("pause");
	} else {
		song.pause();
		button.html("play");
	}
}