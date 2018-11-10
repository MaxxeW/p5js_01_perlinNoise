// 4.0 Analyzing the Amplitude of the imported sound file
var song;
var button;
var jumpButton;
// 4.1 create an amplitude variable
var amp;




function setup() {
	createCanvas(200, 200);
	background(51);
	

	song = loadSound("./file.mp3", loaded);

	// 4.2 create a global amplitude object, listening to the volume of all the sound stuffs that's happening to the file
	amp = new p5.Amplitude();
	// now in the browser console, type 'amp' we can see the info of the amplitude object

	// addCue(Time-in seconds, Function called on that Cue, Argument[optional: addCue will take the argument and paste it into the callback function]);
	song.addCue(2, changeBackground, color(random(255), random(255), random(255)));
	song.addCue(4, changeBackground, color(random(255), random(255), random(255)));
	song.addCue(6, changeBackground, color(random(255), random(255), random(255)));
	song.addCue(8, changeBackground, color(random(255), random(255), random(255)));


}

function changeBackground(col) {
	background(col);
}

function jumpSong() {
	var len = song.duration();

	var t = 0; 
	console.log(t);
	song.jump(t);
	
	background(51);
}

function loaded() {
	// the loaded function is the callback
	console.log("loaded");
	
	// the buttons/sliders don't appear until the sound is completely loaded
	button = createButton("play");
	button.mousePressed(togglePlaying);

	jumpButton = createButton("jump");
	jumpButton.mousePressed(jumpSong);

}

function draw() {
	background(51);

	// 4.5 make the ellipse to grow and shrink based on the volume of the sound file
	var vol = amp.getLevel();
	// 4.6 use map function to map the range of the volume into another amounts of range
	var diam = map(vol, 0, 0.3, 100, 200);
	// 4.4 draw a pink ellipse
	fill(255, 0, 255);
	ellipse(width/2, height/2, diam, diam);
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

