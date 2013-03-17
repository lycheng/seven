function init() {
	var ctx = getCtx();
	if (ctx) {
		for (var i = 0; i < NUM; ++i) {
			for (var j = 0; j < NUM; ++j) {
				fillRect(i, j, GRAY);
			}
		}
		// init with three color cells
		for (var k = 0; k < 3; ++k) {
			while (1) {
				var x = parseInt(Math.random() * (NUM - 1));
				var y = parseInt(Math.random() * (NUM - 1));
				if (map[x][y] == 0) {
					addCell( x, y );
					break;
				}
			}
		}
	}
	else {
		alert("Chrome!OR Firefox!OR any other Browser except IE!");
	}
}

function play(event) {
	var x = parseInt((event.x - start) / (gap + cell));
	var y = parseInt((event.y - start) / (gap + cell));

	drawFlag(WHITE);

	if (x < 0 || x > NUM - 1 || y < 0 || y > NUM - 1) {
		if ( -1 != selectedX ) {
			drawLine( selectedX, selectedY, WHITE );
			setSelected( -1, -1 );
		}
		return ;
	}

	if ( -1 == selectedX ) {
		if ( map[x][y] != 0 ) {
			setSelected( x, y );
			drawLine( x, y, colors[ map[x][y] ] );
			searchAvailable(x, y);
			drawFlag(GREEN);
		}
	} 
	else {
		drawLine( selectedX, selectedY, WHITE );
		if ( selectedX == x && selectedY == y ) {
			setSelected(-1, -1);
			return ;
		}

		if ( map[x][y] != 0 ) {
			setSelected( x, y );
			drawLine( x, y, colors[ map[x][y] ]);
			fillRect( x, y, colors[ map[x][y] ]);

		} else {
			// move cell
			if ( map_search[x][y] == 1 ) {
				map_empty.push( new Array(selectedX, selectedY) );
				deleteFromEmpty( x, y );
				fillRect( selectedX, selectedY, GRAY );
				fillRect( x, y, colors[ map[selectedX][selectedY] ] );
				map[x][y] = map[selectedX][selectedY];
				map[selectedX][selectedY] = 0;
				setSelected( -1, -1 );

				// add some new ones
				if (clearCompleted(x, y) == 1) {
					addCells();
				}
			}
			initSearch();
		}
	}
}