var states = {
	GROUND: 0,
	AIR: 1,
	DEAD: 2,
	END: 3,
	WIN: 4
};

var playerState = states.AIR;

function runMachine() {
	var hereCollision = tileCollisions[map[player.y][player.x]];
	if (hereCollision == collision.EXIT) {
		if(level == 3) {
			playerState = states.WIN;
		} else {
			playerState = states.END;
		}
	}
	if (playerState == states.AIR){
		if (hereCollision == collision.SPIKES) {
			player.vSpeed = 0;
			player.hSpeed = 0;
			playerState = states.DEAD;
			return;
		}
		if (player.y > 0) {
			var overCollision = tileCollisions[map[player.y - 1][player.x]];
			if (overCollision == collision.ALL) {
				player.vSpeed = 0;
				player.visY += 1;
			}
		}
		if (player.y < 14) {
			var underCollision = tileCollisions[map[player.y + 1][player.x]];
			if (underCollision == collision.ALL || underCollision == collision.OVER) {
				player.vSpeed = 0;
				player.visY = player.y * 64;
				playerState = states.GROUND;
				return;
			}
		}
		if (player.x > 0) {
			var leftCollision = tileCollisions[map[player.y][player.x - 1]];
			if (leftCollision == collision.ALL) {
				player.hSpeed = 0;
				player.visX += 1;
			}
		}
		if (player.x < 14) {
			var rightCollision = tileCollisions[map[player.y][player.x + 1]];
			if (rightCollision == collision.ALL) {
				player.hSpeed = 0;
				player.visX -= 1;
			}
		}
		player.vSpeed += GRAVITY;
	}
	if (playerState == states.GROUND) {
		if(player.vSpeed > 0) {
			playerState = states.AIR;
		}
		var underCollision = tileCollisions[map[player.y + 1][player.x]];
		if (map[player.y + 1][player.x] == 1 && player.vSpeed == 0) {
			player.visY = player.y * 64 + 31;
		}
		if (underCollision == collision.NOTHING) {
			playerState = states.AIR;
		}
		if (player.x > 0) {
			var leftCollision = tileCollisions[map[player.y][player.x - 1]];
			if (leftCollision == collision.ALL) {
				player.hSpeed = 0;
				player.visX += 1;
			}
		}
		if (player.x < 14) {
			var rightCollision = tileCollisions[map[player.y][player.x + 1]];
			if (rightCollision == collision.ALL) {
				player.hSpeed = 0;
				player.visX -= 1;
			}
		}
	}
	if (playerState == states.DEAD) {
		alert("You died!");
		player.visY = player.y * 64;
		level = 1;
		initLevel();
	}
	if (playerState == states.END) {
		alert("Level Complete!");
		level++;
		initLevel();
	}
	if (playerState == states.WIN) {
		alert("Finally, Bobloy accomplished his objective of finding the Magic Sword\n"
		+ "But then, after the rush of victory wore out, Bloboy noticed he have no arms to pull out the sword!");
		level++;
		initLevel();
	}
}

function initLevel() {
	map = eval("lvl"+level);
	levelStart = findStart();
	setX(levelStart.x);
	setY(levelStart.y - 1);
	playerState = states.AIR;
	stop();
}