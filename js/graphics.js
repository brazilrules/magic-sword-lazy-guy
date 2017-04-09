var tileSet = [];
var img = new Image(32, 32);
img.src = "img/brick.png";
tileSet.push(img);
img = new Image(32, 32);
img.src = "img/wood.png";
tileSet.push(img);
img = new Image(32, 32);
img.src = "img/spikes.png";
tileSet.push(img);
img = new Image(32, 32);
img.src = "img/start.png";
tileSet.push(img);
img = new Image(32, 32);
img.src = "img/end.png";
tileSet.push(img);
img = new Image(32, 32);
img.src = "img/magicSword.png";
tileSet.push(img);
img = new Image(32, 32);
img.src = "img/G.png";
tileSet.push(img);
img = new Image(32, 32);
img.src = "img/A.png";
tileSet.push(img);
img = new Image(32, 32);
img.src = "img/M.png";
tileSet.push(img);
img = new Image(32, 32);
img.src = "img/E.png";
tileSet.push(img);
img = new Image(32, 32);
img.src = "img/O.png";
tileSet.push(img);
img = new Image(32, 32);
img.src = "img/V.png";
tileSet.push(img);
img = new Image(32, 32);
img.src = "img/R.png";
tileSet.push(img);

var sprite = new Image(32, 32);
sprite.src = "img/bloboy.png";

function drawTile(y, x) {
	if (map[y][x] > -1) {
		var tile = tileSet[map[y][x]];
		ctx.drawImage(tile,x * 64, y * 64, 64 , 64);
	}
}

function drawMap() {
	ctx.clearRect(0, 0, c.width, c.height);
	for (y in map) {
		for (x in map[y]) {
			drawTile(y, x);
		}
	}
}

function drawSprite() {
	ctx.drawImage(sprite, player.visX, player.visY, 64, 64);
}