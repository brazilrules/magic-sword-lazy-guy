var player = {
	x: 0,
	y: 0,
	hSpeed: 0,
	vSpeed: 0,
	visX: 0,
	visY: 0
};

function setX(x) {
	player.x = x;
	player.visX = player.x * 64;
}

function setY(y) {
	player.y = y;
	player.visY = player.y * 64;
}

function walkRight() {
	if ((playerState == states.GROUND || playerState == states.AIR) && player.x < 19) {
		player.hSpeed = 8;
	} else {
		player.hSpeed = 0;
	}
}

function walkLeft() {
	if ((playerState == states.GROUND || playerState == states.AIR) && player.x > 0) {
		player.hSpeed = -8;
	} else {
		player.hSpeed = 0;
	} 
}

function stop() {
	player.hSpeed = 0;
}

function jump() {
	if (playerState == states.GROUND) {
		player.vSpeed = JUMP_MOMENTUM;
	}
}

function thinkAndAct() {
	var exit = findExit();
	
	var beforeCollision = tileCollisions[map[player.y][player.x - 1]];
	if((player.x != exit.x && playerState == states.AIR && player.hSpeed != 0) || beforeCollision == collision.OVER) {
		return;
	}
	
	if(player.y > 2) {
		var overBlockingCollision = tileCollisions[map[player.y - 3][player.x]];
	}
	if(player.x < exit.x && overBlockingCollision == collision.ALL && playerState == states.GROUND) {
		walkLeft();
	} else if(player.x < exit.x && player.x < 19){
		walkRight();
	} else if(player.x == exit.x) {
		stop();
	}
	if(playerState == states.GROUND) {
		var nextOverCollision = tileCollisions[map[player.y - 1][player.x + 1]];
		if (nextOverCollision == collision.OVER || nextOverCollision == collision.ALL) {
			jump();
		}
		var overCollision = tileCollisions[map[player.y - 1][player.x]];
		if (overCollision == collision.OVER) {
			stop();
			jump()
		}
		var nextUnderCollision = tileCollisions[map[player.y + 1][player.x + 1]];
		if (nextUnderCollision == collision.NOTHING) {
			jump();
		}
		var rightCollision = tileCollisions[map[player.y][player.x + 1]];
		if (rightCollision == collision.ALL) {
			jump();
		}
		if (beforeCollision == collision.ALL) {
			walkLeft();
			jump();
		}
		var beforeOverCollision = tileCollisions[map[player.y - 1][player.x - 1]];
		if (beforeOverCollision == collision.OVER) {
			jump();
		}
	}
}

function findExit() {
	for (y in map) {
		for (x in map[y]) {
			if(map[y][x] == 4 || map[y][x] == 5) {
				return {'x': x,'y': y};
			}
		}
	}
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        walkLeft();
    }
    else if(event.keyCode == 39) {
        walkRight();
    }
	else if(event.keyCode == 32) {
		jump();
	}
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 37) {
        stop();
    }
    else if(event.keyCode == 39) {
        stop();
    }
});