var game = new Phaser.Game(480, 320, Phaser.AUTO, 'hi', {preload: preload, create: create, update: update});
var cane = [];
var canecnt = 0;
var angle = [-99, -99, -99, -99, -99, -99, -99, -99, -99, -99, -99, -99, -99, -99, -99];
var canes;
var knife;
var scoreText;
var score = 0;
var timer;

function create_cane(){
    for(var i=0;i<15;++i){
        if(angle[i] != -99)
            canes.remove(cane[canecnt]);
    }
    cane[canecnt] = game.add.sprite(game.world.width*Math.random(), game.world.height, 'cane');
    cane[canecnt].width = 39;
    cane[canecnt].height = 63;
    cane[canecnt].anchor.set(0.5);
    game.physics.enable(cane[canecnt], Phaser.Physics.ARCADE);
    cane[canecnt].body.velocity.set(Math.random()*200-100, -200);
    cane[canecnt].body.collideWorldBounds = true;
    cane[canecnt].body.bounce.set(1);
    cane[canecnt].body.gravity.y = 80;
    canes.add(cane[canecnt]);
    angle[canecnt] = Math.random()*4-2;
    canecnt += 1;
    if(canecnt > 15)
        canecnt -= 15;
}

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#EADD63';
    game.load.image('cane', 'image/sugar_cane.png');
    game.load.image('knife', 'image/knife.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;
    canes = game.add.group();
    
    timer = game.time.create();
    create_cane();
    timer.repeat(0.6*Phaser.Timer.SECOND, 5000, create_cane, this);
    timer.start();
    
    knife = game.add.sprite(game.world.width*0.5, game.world.height-5, 'knife');
    knife.width = knife.height = 1;
    knife.anchor.set(0.5,0.5);
    game.physics.enable(knife, Phaser.Physics.ARCADE);
    knife.body.immovable = true;
    
    game.add.text(game.world.width*0.5+32, 25, '/100', { font: '15px Arial', fill: '#FFFFFF' });
    scoreText = game.add.text(game.world.width*0.5, 5, '0', { font: '40px Arial', fill: '#FFFFFF' });
    scoreText.anchor.set(0.5, 0);
}

function update() {
    for(var i=0; i<15; ++i){
        if(angle[i] != -99)
            cane[i].angle += angle[i];
    }
    knife.x = game.input.x;
    knife.y = game.input.y;
    game.physics.arcade.overlap(knife, canes, ballHitBrick);
}

function ballHitBrick(knife, cane) {
    if(score == 100){
        return;
    }
    cane.kill();
    score += 1;
    scoreText.setText(score);
    if(score == 100){
        timer.stop();
        var win = game.add.text(game.world.width*0.5, game.world.height*0.5, '採完甘蔗了！', { font: '40px Arial', fill: '#FFFFFF' });
        win.anchor.set(0.5, 0.5);
        setTimeout(function(){ location.href = 'index.html'; },1000);
    }
}