function searchAvailable(x, y) {
	initSeach();
	map_search[x][y] = 1;
	search(x + 1, y);
	search(x - 1, y);
	search(x, y + 1);
	search(x, y - 1);
	map_search[x][y] = 0;
}

function initSeach() {
	for ( var i = 0; i < NUM; ++i ) {
		for ( var j = 0; j < NUM; ++j ) {
			map_search[i][j] = 0;
		}
	}
}

function search(x, y) {
	if ( x < 0 || x >= NUM || y < 0 || y >= NUM ) {
		return;
	}

	if ( map_search[x][y] == 1 ) {
		return ;
	}
	
	if ( map[x][y] != 0 ) {
		return ;
	}

	map_search[x][y] = 1;
	search( x + 1, y );
	search( x - 1, y );
	search( x, y + 1 );
	search( x, y - 1 );
}

function drawFlag(color) {
	for ( var i = 0; i < NUM; ++i ) {
		for ( var j = 0; j < NUM; ++j ) {
			if ( map_search[i][j] == 1 ) {
				drawLine( i, j, color );
			}
		}
	}
}

function deleteFromEmpty(x, y) {
	for ( var i = 0; i < map_empty.length; ++i ) {
		if ( x == map_empty[i][0] && y == map_empty[i][1] ) {
			map_empty.splice(i, 1);
		}
	}
}

function clearCompleted(x, y) {
	var cleared = 1;
	var target = map[x][y];

	// N - S
	var offsetN = 1;
	while ( x - offsetN >= 0 
		&& target == map[x - offsetN][y] ) {
		offsetN++;
	}
	offsetN -= 1;

	var offsetS = 1;
	while ( x + offsetS < NUM 
		&& target == map[x + offsetS][y] ) {
		offsetS++;
	}
	offsetS -= 1;
	if ( offsetS + offsetN >= COMPLETED_NUM - 1 ) {
		cleared *= 2;
		deleteCells( x - offsetN, y, x + offsetS, y );
	}

	// W - E
	var offsetE = 1;
	while ( y + offsetE < NUM 
		&& target == map[x][y + offsetE] ) {
		offsetE++;
	}
	offsetE -= 1;

	var offsetW = 1;
	while ( y - offsetW >= 0 
		&& target == map[x][y - offsetW] ) {
		offsetW++;
	}
	offsetW -= 1;
	if ( offsetE + offsetW >= COMPLETED_NUM - 1 ) {
		cleared *= 2;
		deleteCells( x, y - offsetW, x, y + offsetE );
	}

	// NE - SW
	var offsetNE = 1;
	while ( x - offsetNE >= 0 && y + offsetNE < NUM 
		&&  target == map[x - offsetNE][y + offsetNE] ) {
		offsetNE++;
	}
	offsetNE--;

	var offsetSW = 1;
	while ( x + offsetSW < NUM && y - offsetSW >= 0 
		&& target == map[x + offsetSW][y - offsetSW] ) {
		offsetSW++;
	} 
	offsetSW--;

	if ( offsetSW + offsetNE >= COMPLETED_NUM - 1 ) {
		cleared *= 2;
		deleteCells(x - offsetNE, y + offsetNE, x + offsetSW, y - offsetSW );
	}

	// NW - SE
	var offsetNW = 1;
	while ( x - offsetNW >= 0 && y - offsetNW >= 0 
		&& target == map[x - offsetNW][y - offsetNW] ) {
		offsetNW++;
	}
	offsetNW--;

	var offsetSE = 1;
	while ( x + offsetSE < NUM && y + offsetSE < NUM 
		&& target == map[x + offsetSE][y + offsetSE] ) {
		offsetSE++;
	}
	offsetSE--;

	if ( offsetSE + offsetNW >= COMPLETED_NUM - 1 ) {
		cleared *= 2;
		deleteCells( x - offsetNW, y - offsetNW, x + offsetSE, y + offsetSE );
	}
	deleteFromEmpty(x, y);
	return cleared;
 }

function getCtx() {
	var canvas = document.getElementById("canvas");
	var ctx    = canvas.getContext("2d");
	return ctx;
}

function setSelected(x, y) {
	selectedX = x;
	selectedY = y;
}

function drawLine(x, y, color) {
	var ctx = getCtx();
	ctx.beginPath();
	ctx.lineWidth = gap - 2;
	ctx.moveTo( start + x * (gap + cell) - gap / 2, start + y * (gap + cell) - gap / 2 );
	ctx.lineTo( start + x * (gap + cell) - gap / 2, start + y * (gap + cell) + cell + gap / 2 );
	ctx.lineTo( start + x * (gap + cell) + gap / 2 + cell, start + y * (gap + cell) + cell + gap / 2 );
	ctx.lineTo( start + x * (gap + cell) + gap / 2 + cell, start + y * (gap + cell) - gap / 2 );
	ctx.lineTo( start + x * (gap + cell) - gap / 2, start + y * (gap + cell) - gap / 2 );
	ctx.strokeStyle = color;
	ctx.stroke();
}

function fillRect(x, y, color) {
	var ctx = getCtx();
	ctx.fillStyle = color;
	ctx.fillRect(start + (cell + gap) * x, start + (cell + gap) * y, cell, cell);
}

function deleteCell(x, y) {
	map_empty.push( new Array(x, y) );
	map[x][y] = 0;
}

function deleteCells(fromX, fromY, toX, toY) {
	var disX = toX - fromX;
	var disY = toY - fromY;
	var stepX = 1;
	var stepY = 1;
	if ( disX < 0 ) {
		stepX = -1;
	}
	else if ( disX == 0) {
		stepX = 0;
	}
	if ( disY < 0 ) {
		stepY = -1;
	}
	else if ( disY == 0) {
		stepY = 0;
	}

	var i = fromX;
	var j = fromY;
	for ( ; !(i == toX + stepX && j == toY + stepY); i += stepX, j += stepY ) {
		deleteCell( i, j );
		fillRect( i, j, colors[0] );
	}
}

function getNextOnes() {
    for ( var i = 0; i < level; i++ ) {
        var index = parseInt(Math.random() * (NUM_OF_COLORS) + 1);
        nextOnes[i] = index;
    }
}

function drawGameInfo() {
    for ( var i = 0; i < level; ++i ) {
        fillRect( 1 + NUM + i, 1, colors[ nextOnes[i] ] );
    }
    var ctx = getCtx();
    ctx.fillStyle = WHITE;
	ctx.fillRect((cell + gap) * (NUM + 1) , (cell + gap) * 3 + 10, cell * 7, cell);
    ctx.font = '22px';
    ctx.fillStyle = BLACK;
    ctx.fillText(score, (cell + gap) * (NUM + 1) + 10 , (gap + cell) * 4 );
}

function addCell(x, y, index) {
	deleteFromEmpty( x, y );
	fillRect(x, y, colors[index]);
	map[x][y] = index;
	return index;
}

function addCells() {
	for ( var i = 0; i < level; ++i ) {
		if ( map_empty.length == 0 ) {
			alert( "You Lose!" );
			return ;
		}
		var index = nextOnes[i];
		var x = parseInt( map_empty[index][0] );
		var y = parseInt( map_empty[index][1] );
		addCell( x, y, index );
	}
    getNextOnes();
}
