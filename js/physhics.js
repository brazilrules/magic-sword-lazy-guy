var collision = {
	NOTHING: -1,
	ALL: 0,
	OVER: 1,
	SPIKES: 2,
	EXIT: 3
};

var tileCollisions = {
	'-1': -1,
	0: 0,
	1: 1,
	2: 2,
	4: 3,
	5: 3
}

var GRAVITY = 1;

var JUMP_MOMENTUM = -15;

function calculate() {
	player.visX += player.hSpeed;
	player.x = Math.floor((player.visX + 32) / 64);
	player.visY += player.vSpeed;
	player.y = Math.floor((player.visY + 32) / 64);
}