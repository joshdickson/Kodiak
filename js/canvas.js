/*
 * canvas.js
 *
 * @author Joshua Dickson
 *
 * A file that provides functionality for working with canvas HTML5 elements.
 */


/********************** GLOBAL VARIABLES ***********************/

/*
 * The jQuery object representing the canvas element
 */
var canvas;
var headsUpCanvas;

/*
 * The jQuery object representing the context element
 */
var context;
var headsUpContext;

/*
 * A function used to instantiate the canvas and context objects
 */
function doCanvasSetup(canvasID) {
	canvas = $('#' + canvasID);
	context = canvas.get(0).getContext('2d');
//	headsUpCanvas = $('#head-up-display');
//	headsUpContext = headsUpCanvas.get(0).getContext('2d');
}

/*
 * A function used to draw a rotated image on the canvas without otherwise modifying the canvas
 */
function drawRotatedImage(image, x, y, angle) { 
	context.save(); 
	context.translate(x, y);
	context.rotate(0); 
	context.drawImage(image, -(image.width/2), -(image.height/2));
	context.restore(); 
};