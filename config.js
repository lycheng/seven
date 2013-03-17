// global
var NUM           = 7;
var WHITE         = "rgb(255,255,255)";
var GRAY          = "rgb(220,220,220)";
var BLACK         = "rgb(0,0,0)";
var RED           = "rgb(255,69,0)";
var GREEN         = "rgb(46,139,87)";
var BLUE          = "rgb(100,149,237)";
var YELLOW        = "#FFFF00";
var NUM_OF_COLORS = 4;
var COMPLETED_NUM = 4;
var colors        = new Array(GRAY, BLACK, RED, GREEN, BLUE);

// selected cell
var selectedX = -1;
var selectedY = -1;

// some var for the cells
var start = 10;
var cell  = 30;
var gap   = 4;

// for game
var level = 3;

var map = new Array();
var map_empty = new Array();
var map_search = new Array();
for (var i = 0; i < NUM; ++i) {
	map[i] = new Array();
	map_search[i] = new Array();
	for (var j = 0; j < NUM; ++j) {
		map_empty.push(new Array(i, j));
		map_search[i][j] = 0;
		map[i][j] = 0;
	}
}