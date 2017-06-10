//Scene that starts the game
var PlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var ls = cc.sys.localStorage;
        this.addChild(new backgroundLayer(), 1, 1);
        this.addChild(new gameLayer(), 2, 2);
    }
});
var pauseLayer = cc.LayerColor.extend({
    // constructor
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super(cc.color(255, 255, 255, 150));
        var winsize = cc.director.getWinSize();
        this.ls = cc.sys.localStorage;
        var scaleFactor = winsize.height / 2550;

        this.recognizer = new SimpleRecognizer();

        this.swipeLabel = new cc.LabelTTF("Swipe to continue", res.font, winsize.height / 20);
        this.swipeLabel.setColor(cc.color(0, 0, 0));//black color
        this.swipeLabel.setPosition(cc.p(winsize.width / 2, winsize.height / 4));
        this.addChild(this.swipeLabel);

        this.backLabel = new cc.LabelTTF("Back to Menu", res.font, winsize.height / 20);
        this.backLabel.setColor(cc.color(0, 0, 0));//black color
        this.backLabelP = new cc.LabelTTF("Back to Menu", res.font, winsize.height / 20);
        this.backLabelP.setColor(cc.color(0, 0, 150));

        var backItemLabel = new cc.MenuItemSprite(
            this.backLabel,
            this.backLabelP,
            this.onBack, this);
        backItemLabel.setAnchorPoint(0, 1);
        var backMenu = new cc.Menu(backItemLabel);
        backMenu.setPosition(cc.p(0, winsize.height));
        this.addChild(backMenu, 0, 13);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            gOL: this,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

    },
    onRestart: function (sender) {
        cc.director.resume();
        this.getParent().addPauseLabel();
        this.removeFromParent();
    },
    onBack: function () {
        cc.director.resume();
        var statsArray = JSON.parse(cc.sys.localStorage.getItem(210));
        for(var i = 0; i< statsArray.length; i++){
            statsArray[i] += gameLayer_copy.statsArray[i];
        }
        cc.sys.localStorage.setItem(210,JSON.stringify(statsArray));
        cc.log(statsArray);
        cc.director.runScene(new levelSelectorScene());
    },
    onTouchBegan: function (touch, event) {
        var pos = touch.getLocation();
        event.getCurrentTarget().recognizer.beginPoint(pos.x, pos.y);
        return true;
    },

    onTouchMoved: function (touch, event) {
        var pos = touch.getLocation();
        event.getCurrentTarget().recognizer.movePoint(pos.x, pos.y);
    },

    onTouchEnded: function (touch, event) {
        var rtn = event.getCurrentTarget().recognizer.endPoint();
        //cc.log(rtn);
        switch (rtn) {
            case "left":
                this.gOL.onRestart();
                break;
            case "right":
                this.gOL.onRestart();
                break;
            default:
                break;
        }
    }
});
var backgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();
        var winsize = cc.director.getWinSize();
        var background = new cc.LayerColor(cc.color(255, 255, 255, 255), winsize.width, winsize.height);
        this.addChild(background);
    }
});

var gameLayer = cc.Layer.extend({
    thingsPerRow: 9,
    levelShape: null,
    gameNode: null,
    winsize: null,
    scaleFactor: null,
    sizeOfSprite: null,
    left: null,
    right: null,
    down: null,
    up: null,
    switcher: 0,
    lastMoveStamp: 0,
    movesLabelValue: null,
    pointsLabelValue: null,
    statsArray: null,
    points: 0,
    goalStatusLabel1: null,
    goalStatusLabel2: null,
    ctor: function () {
        this._super();
        this.winsize = cc.director.getWinSize();
        this.scaleFactor = this.winsize.width / 1440;      //154px original size 1440/9- some shit
        this.sizeOfSprite = this.scaleFactor * 154;
        this.sizeOfIcons = 140 / 256 * this.scaleFactor;
        this.statsArray = [];
        for (var i = 0; i <= amountOfTiles; i++) {
            this.statsArray.push(0);
        }
        this.initPause();
        this.loadLvl(); //returns this.init();*/
    },
    init: function () {
        this._super();
        this.initAnimations();
        //ads
        sdkbox.PluginAdMob.hide("bottombanner");
        this.levelShape = this.createLevel(this.levelShape);
        this.gameNode = new cc.Node;
        this.gameNode.y = 0;
        this.gameNode.x = 0;
        this.addChild(this.gameNode);
        this.lastMoveStamp = new Date().getTime();
        this.upwardsTransition = this.winsize.height / 4;
        cc.director.getScheduler().scheduleCallbackForTarget(this, ((function () { return function () { gameLayer_copy.checkForMovesTipp() } })()), 10, 20, 0, false);
        //scheduler
        //cc.director.getScheduler().scheduleCallbackForTarget(this,((function () { return function () { gameLayer_copy.checkForMoves() } })()) , 2, 1, 0, false ); //cc.director.getScheduler().scheduleCallbackForTarget(this, function, interval, repeat, delay, !this._isRunning );
        //some infos
        var dn1 = new cc.DrawNode();
        this.addChild(dn1);
        dn1.drawRect(cc.p(this.winsize.width / 2 - 1, 3.2 * this.winsize.height / 20), cc.p(this.winsize.width / 2 + 1, 1.9 * this.winsize.height / 20), cc.color(0, 0, 0, 255), 2, cc.color(0, 0, 0, 255));
        //some labels 3/26 + 2/15 ~= 0.25
        var pointsLabelText = new cc.LabelTTF("Points", res.font, this.winsize.height / 30);
        pointsLabelText.setColor(cc.color(0, 0, 0));
        pointsLabelText.setAnchorPoint(1, 0);
        pointsLabelText.setPosition(this.winsize.width / 2 - 20, 3.2 * this.winsize.height / 20);
        var movesLabelText = new cc.LabelTTF("Moves left", res.font, this.winsize.height / 30);
        movesLabelText.setColor(cc.color(0, 0, 0));
        movesLabelText.setAnchorPoint(0, 0);
        movesLabelText.setPosition(this.winsize.width / 2 + 20, 3.2 * this.winsize.height / 20);

        this.movesLabelValue = new cc.LabelTTF(this.moves, res.font, this.winsize.height / 20);
        this.movesLabelValue.setColor(cc.color(0, 0, 0));
        this.movesLabelValue.setAnchorPoint(0, 0);
        this.movesLabelValue.setPosition(this.winsize.width / 2 + 20, 2 * this.winsize.height / 20);
        this.pointsLabelValue = new cc.LabelTTF("0", res.font, this.winsize.height / 20);
        this.pointsLabelValue.setColor(cc.color(0, 0, 0));
        this.pointsLabelValue.setAnchorPoint(1, 0);
        this.pointsLabelValue.setPosition(this.winsize.width / 2 - 20, 2 * this.winsize.height / 20);
        this.addChild(pointsLabelText);
        this.addChild(movesLabelText);
        this.addChild(this.movesLabelValue);
        this.addChild(this.pointsLabelValue);

        //goals
        var scaleFactor = this.winsize.height / 2550 * 0.5;
        var levelNum = JSON.parse(cc.sys.localStorage.getItem(251));
        levelNum--;
        var checkmark1 = new cc.Sprite(res.vote_false);
        checkmark1.scale = scaleFactor;
        checkmark1.setAnchorPoint(0, 1);
        checkmark1.setPosition(this.winsize.width / 20, this.winsize.height - this.winsize.height / 15);
        this.addChild(checkmark1, 1, 1001);
        var goalLabel1 = new cc.LabelTTF(levelsAdditional[levelNum][6], res.font, this.winsize.height / 30);
        if (levelsAdditional[levelNum][4] > 0) { //mit chains 
            var sprite = new cc.Sprite.create("res/" + levelsAdditional[levelNum][4] + ".png");
            sprite.setAnchorPoint(0, 0.5);
            sprite.attr({ x: this.winsize.width / 20 + 256 * scaleFactor + this.winsize.width / 40, y: this.winsize.height - this.winsize.height / 15 - 0.5 * 256 * scaleFactor, scale: this.sizeOfIcons * 0.7 });
            this.addChild(sprite);
            goalLabel1.setPosition(this.winsize.width / 20 + 256 * scaleFactor + this.winsize.width / 40 + this.sizeOfIcons * 256, this.winsize.height - this.winsize.height / 15 - 0.5 * 256 * scaleFactor);
            //status Label 
            this.goalStatusLabel1 = new cc.LabelTTF("0", res.font, this.winsize.height / 40);
            this.goalStatusLabel1.setColor(cc.color(0, 0, 0));
            this.goalStatusLabel1.setAnchorPoint(0, 0.5);
            this.goalStatusLabel1.setPosition(this.winsize.width / 2 + 20, 2 * this.winsize.height / 40 + 20);
            this.addChild(this.goalStatusLabel1);
            var sprite2 = new cc.Sprite.create("res/" + levelsAdditional[levelNum][4] + ".png");
            sprite2.setAnchorPoint(1, 0.5);
            sprite2.attr({ x: this.winsize.width / 2 - 20, y: 2 * this.winsize.height / 40 + 20, scale: this.sizeOfIcons * 0.7 });
            this.addChild(sprite2,1,1500);
        }
        else {
            goalLabel1.setPosition(this.winsize.width / 20 + 256 * scaleFactor + this.winsize.width / 40, this.winsize.height - this.winsize.height / 15 - 0.5 * 256 * scaleFactor);
        }
        goalLabel1.setColor(cc.color(0, 0, 0));
        goalLabel1.setAnchorPoint(0, 0.5);
        this.addChild(goalLabel1);

        if (levelsAdditional[levelNum][0] == 2) {//second goal
            var checkmark2 = new cc.Sprite(res.vote_false);
            checkmark2.scale = scaleFactor;
            checkmark2.setAnchorPoint(0, 1);
            checkmark2.setPosition(this.winsize.width / 20, this.winsize.height - 2 * this.winsize.height / 15);
            this.addChild(checkmark2, 1, 1002);
            var goalLabel2 = new cc.LabelTTF(levelsAdditional[levelNum][9], res.font, this.winsize.height / 30);
            if (levelsAdditional[levelNum][7] > 0) { //mit chains 
                var sprite = new cc.Sprite.create("res/" + levelsAdditional[levelNum][7] + ".png");
                sprite.setAnchorPoint(0, 0.5);
                sprite.attr({ x: this.winsize.width / 20 + 256 * scaleFactor + this.winsize.width / 40, y: this.winsize.height - 2 * this.winsize.height / 15 - 0.5 * 256 * scaleFactor, scale: this.sizeOfIcons * 0.7 });
                this.addChild(sprite);
                goalLabel2.setPosition(this.winsize.width / 20 + 256 * scaleFactor + this.winsize.width / 40 + this.sizeOfIcons * 256, this.winsize.height - 2 * this.winsize.height / 15 - 0.5 * 256 * scaleFactor);
                //status Label
                this.goalStatusLabel2 = new cc.LabelTTF("0", res.font, this.winsize.height / 40);
                this.goalStatusLabel2.setColor(cc.color(0, 0, 0));
                this.goalStatusLabel2.setAnchorPoint(0, 0.5);
                this.goalStatusLabel2.setPosition(this.winsize.width / 4 *3  + 20, 2 * this.winsize.height / 40 + 20);
                this.goalStatusLabel1.setPosition(this.winsize.width / 4 + 20,2 * this.winsize.height / 40 + 20 );
                this.addChild(this.goalStatusLabel2);
                this.getChildByTag(1500).setPosition(this.winsize.width / 4 - 20 ,2 * this.winsize.height / 40 + 20)
                var sprite2 = new cc.Sprite.create("res/" + levelsAdditional[levelNum][7] + ".png");
                sprite2.setAnchorPoint(1, 0.5);
                sprite2.attr({ x: this.winsize.width / 4 *3 - 20, y: 2 * this.winsize.height / 40 + 20, scale: this.sizeOfIcons * 0.7 });
                this.addChild(sprite2);
            }
            else {
                goalLabel2.setPosition(this.winsize.width / 20 + 256 * scaleFactor + this.winsize.width / 40 + this.sizeOfIcons * 256, this.winsize.height - 2 * this.winsize.height / 15 - 0.5 * 256 * scaleFactor);
            }
            goalLabel2.setColor(cc.color(0, 0, 0));
            goalLabel2.setAnchorPoint(0, 0.5);
            this.addChild(goalLabel2);
        }

        for (var i = 0; i < this.levelShape.length; i++) {
            for (var j = 0; j < this.levelShape[0].length; j++) {
                var sprite = new cc.Sprite.create("res/" + this.levelShape[i][j] + ".png");
                sprite.attr({ x: j * this.sizeOfSprite + 104 * this.scaleFactor, y: i * this.sizeOfSprite + this.upwardsTransition, scale: this.sizeOfIcons });
                this.gameNode.addChild(sprite, 0, 100 * i + j);
            }
        }
        gameLayer_copy = this;
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            x: null,
            y: null,
            onTouchBegan: function (touch, event) {
                var corX = touch.getLocationX();
                var corY = touch.getLocationY();
                if (gameLayer_copy.getNumberOfRunningActions() === 0) {
                    this.x = corX;
                    this.y = corY;
                }
                //else return false;
                return true; //important otherwise onTouchEnded won't be executed
            },
            onTouchEnded: function (touch, event) {
                var x2 = touch.getLocationX();
                var y2 = touch.getLocationY();
                if (gameLayer_copy.getNumberOfRunningActions() === 0) {
                    var i = gameLayer_copy.calcI(this.y);
                    var j = gameLayer_copy.calcJ(this.x);
                    if (i < 10 && j < 10) { //valid start field
                        //checks if move is possible and so on
                        var spritemove1 = gameLayer_copy.gameNode.getChildByTag(100 * i + j);
                        var moveType = gameLayer_copy.getMoveType(this.x, x2, this.y, y2);
                        //cc.log("detected swipe: Movetype= " + moveType + "  block  :" + i + "," + j);
                        if (gameLayer_copy.moveAllowed(i, j, moveType) && !gameLayer_copy.anim) {
                            gameLayer_copy.lastMoveStamp = new Date().getTime();
                            for (var k = 0; k < gameLayer_copy.levelShape.length; k++) {
                                for (var n = 0; n < gameLayer_copy.levelShape[0].length; n++) {
                                    if (gameLayer_copy.levelShape[k][n] != 0 && gameLayer_copy.levelShape[k][n] != 501) {
                                        gameLayer_copy.gameNode.getChildByTag(100 * (k) + n).stopAllActions();
                                    }
                                }
                            }
                            if (moveType == 1) {
                                var spritemove2 = gameLayer_copy.gameNode.getChildByTag(100 * (i + 1) + j);
                                if (gameLayer_copy.movePossible(i, j, moveType)) {
                                    spritemove1.scale = gameLayer_copy.sizeOfIcons;
                                    spritemove2.scale = gameLayer_copy.sizeOfIcons;
                                    gameLayer_copy.anim = true;
                                    spritemove1.runAction(gameLayer_copy.up.clone());
                                    spritemove2.runAction(gameLayer_copy.down.clone());
                                    spritemove1.setTag(1000);
                                    spritemove2.setTag(100 * i + j);
                                    spritemove1.setTag(100 * (i + 1) + j);
                                    //swap im levelShape 
                                    gameLayer_copy.swapLevel(i, j, moveType);
                                    gameLayer_copy.removeChains(gameLayer_copy.detectChains());
                                    gameLayer_copy.moves--;
                                    gameLayer_copy.updateStatus();
                                }
                                else {
                                    spritemove1.scale = gameLayer_copy.sizeOfIcons;
                                    spritemove2.scale = gameLayer_copy.sizeOfIcons;
                                    spritemove1.runAction(cc.sequence(gameLayer_copy.up.clone(), gameLayer_copy.down.clone()));
                                    spritemove2.runAction(cc.sequence(gameLayer_copy.down.clone(), gameLayer_copy.up.clone()));
                                    gameLayer_copy.audio(400+Math.floor(Math.random()*soundsWrongMoves));
                                }
                            }
                            if (moveType == 2) {
                                var spritemove2 = gameLayer_copy.gameNode.getChildByTag(100 * i + j + 1);
                                if (gameLayer_copy.movePossible(i, j, moveType)) {
                                    spritemove1.scale = gameLayer_copy.sizeOfIcons;
                                    spritemove2.scale = gameLayer_copy.sizeOfIcons;
                                    gameLayer_copy.anim = true;
                                    spritemove1.runAction(gameLayer_copy.right);
                                    spritemove2.runAction(gameLayer_copy.left);
                                    spritemove1.setTag(1000);
                                    spritemove2.setTag(100 * i + j);
                                    spritemove1.setTag(100 * i + j + 1);
                                    gameLayer_copy.swapLevel(i, j, moveType);
                                    gameLayer_copy.removeChains(gameLayer_copy.detectChains());
                                    gameLayer_copy.moves--;
                                    gameLayer_copy.updateStatus();
                                }
                                else {
                                    spritemove1.scale = gameLayer_copy.sizeOfIcons;
                                    spritemove2.scale = gameLayer_copy.sizeOfIcons;
                                    spritemove1.runAction(cc.sequence(gameLayer_copy.right.clone(), gameLayer_copy.left.clone()));
                                    spritemove2.runAction(cc.sequence(gameLayer_copy.left.clone(), gameLayer_copy.right.clone()));
                                    gameLayer_copy.audio(400+Math.floor(Math.random()*soundsWrongMoves));
                                }
                            }
                            if (moveType == 3) {
                                var spritemove2 = gameLayer_copy.gameNode.getChildByTag(100 * (i - 1) + j);
                                if (gameLayer_copy.movePossible(i, j, moveType)) {
                                    spritemove1.scale = gameLayer_copy.sizeOfIcons;
                                    spritemove2.scale = gameLayer_copy.sizeOfIcons;
                                    gameLayer_copy.anim = true;
                                    spritemove1.runAction(gameLayer_copy.down);
                                    spritemove2.runAction(gameLayer_copy.up);
                                    spritemove1.setTag(1000);
                                    spritemove2.setTag(100 * i + j);
                                    spritemove1.setTag(100 * (i - 1) + j);
                                    gameLayer_copy.swapLevel(i, j, moveType);
                                    gameLayer_copy.removeChains(gameLayer_copy.detectChains());
                                    gameLayer_copy.moves--;
                                    gameLayer_copy.updateStatus();
                                }
                                else {
                                    spritemove1.scale = gameLayer_copy.sizeOfIcons;
                                    spritemove2.scale = gameLayer_copy.sizeOfIcons;
                                    spritemove1.runAction(cc.sequence(gameLayer_copy.down.clone(), gameLayer_copy.up.clone()));
                                    spritemove2.runAction(cc.sequence(gameLayer_copy.up.clone(), gameLayer_copy.down.clone()));
                                    gameLayer_copy.audio(400+Math.floor(Math.random()*soundsWrongMoves));
                                }
                            }
                            if (moveType == 4) {
                                var spritemove2 = gameLayer_copy.gameNode.getChildByTag(100 * i + j - 1);
                                if (gameLayer_copy.movePossible(i, j, moveType)) {
                                    spritemove1.scale = gameLayer_copy.sizeOfIcons;
                                    spritemove2.scale = gameLayer_copy.sizeOfIcons;
                                    gameLayer_copy.anim = true;
                                    spritemove1.runAction(gameLayer_copy.left);
                                    spritemove2.runAction(gameLayer_copy.right);
                                    spritemove1.setTag(1000);
                                    spritemove2.setTag(100 * i + j);
                                    spritemove1.setTag(100 * i + j - 1);
                                    gameLayer_copy.swapLevel(i, j, moveType);
                                    gameLayer_copy.removeChains(gameLayer_copy.detectChains());
                                    gameLayer_copy.moves--;
                                    gameLayer_copy.updateStatus();
                                }
                                else {
                                    spritemove1.scale = gameLayer_copy.sizeOfIcons;
                                    spritemove2.scale = gameLayer_copy.sizeOfIcons;
                                    spritemove1.runAction(cc.sequence(gameLayer_copy.left.clone(), gameLayer_copy.right.clone()));
                                    spritemove2.runAction(cc.sequence(gameLayer_copy.right.clone(), gameLayer_copy.left.clone()));
                                    gameLayer_copy.audio(400+Math.floor(Math.random()*soundsWrongMoves));
                                }
                            }
                        }
                    }
                }
            }
        });
        cc.eventManager.addListener(listener1, this);

    },
    refill: function () {
        var counter = 0;
        var temp = 0;
        //drop
        for (var j = 0; j < this.levelShape[0].length; j++) {
            for (var i = 0; i < this.levelShape.length; i++) {
                if (this.levelShape[i][j] == 0) {
                    counter = 0;
                }
                else if (this.levelShape[i][j] == 501) {
                    counter++;
                }
                else if (counter > 0 && this.levelShape[i][j] != 0) {
                    this.levelShape[i - counter][j] = this.levelShape[i][j];
                    this.levelShape[i][j] = 501;
                    var spritemove1 = this.gameNode.getChildByTag(100 * i + j);
                    spritemove1.runAction(new cc.MoveBy(0.2, cc.p(0, -counter * this.sizeOfSprite)));
                    spritemove1.setTag(100 * (i - counter) + j);
                    i -= counter;
                    counter = 0;
                }
            }
            counter = 0;
        }
        counter = 0;
        var tempHigh = 0;
        for (var j = 0; j < this.levelShape[0].length; j++) {
            for (var i = this.levelShape.length - 1; i >= 0; i--) {
                if (this.levelShape[i][j] == 501) {
                    counter++;
                }
                else if (counter > 0) {
                    var temp = 2;
                    for (var n = counter; n > 0; n--) {
                        var random = Math.floor(Math.random() * 6 + 1);
                        this.levelShape[this.levelShape.length - n][j] = random;
                        var sprite = new cc.Sprite.create("res/" + random + ".png");
                        sprite.setOpacity(0);
                        sprite.attr({ x: j * this.sizeOfSprite + 104 * this.scaleFactor, y: (this.levelShape.length - 1) * this.sizeOfSprite + this.upwardsTransition, scale: this.sizeOfIcons });
                        this.gameNode.addChild(sprite, 0, 100 * (this.levelShape.length - n) + j);
                        this.gameNode.getChildByTag((this.levelShape.length - n) * 100 + j).runAction(cc.sequence(new cc.DelayTime(temp * 0.2), new cc.FadeIn(0.2), new cc.MoveBy(0.2, cc.p(0, -(n - 1) * this.sizeOfSprite))));
                        if (temp > tempHigh) tempHigh = temp;
                        temp++;
                    }
                    counter = 0;
                }
                else i = 0;
            }
            counter = 0;
        }
        this.sideDrop(tempHigh * 0.2 + 0.4);
    },
    sideDrop: function (time) {
        //looking for sidedrops
        var counter = 0;
        loop1: for (var j = 0; j < this.levelShape[0].length; j++) {
            for (var i = 0; i < this.levelShape.length; i++) {
                if (this.levelShape[i][j] == 501) { //blindspot
                    if (j > 0 && this.levelShape[i + 1][j - 1] != 0 && this.levelShape[i + 1][j - 1] != 501 && j < this.levelShape[0].length - 1 && this.levelShape[i + 1][j + 1] != 0 && this.levelShape[i + 1][j + 1] != 501) {
                        //double drop
                        var leftOrRight = Math.ceil(Math.round * 2);
                        if (leftOrRight == 1) { //left
                            this.levelShape[i][j] = this.levelShape[i + 1][j - 1];
                            this.levelShape[i + 1][j - 1] = 501;
                            var spritemove1 = this.gameNode.getChildByTag(100 * (i + 1) + j - 1);
                            this.gameNode.getChildByTag(100 * (i + 1) + j - 1).runAction(cc.sequence(new cc.MoveBy(0.2, cc.p(+ this.sizeOfSprite, -this.sizeOfSprite)), cc.callFunc((function () { return function () { gameLayer_copy.refill() } })())));
                            spritemove1.setTag(100 * i + j);
                        }
                        else {//right
                            this.levelShape[i][j] = this.levelShape[i + 1][j + 1];
                            this.levelShape[i + 1][j + 1] = 501;
                            var spritemove1 = this.gameNode.getChildByTag(100 * (i + 1) + j + 1);
                            this.gameNode.getChildByTag(100 * (i + 1) + j + 1).runAction(cc.sequence(new cc.MoveBy(0.2, cc.p(- this.sizeOfSprite, -this.sizeOfSprite)), cc.callFunc((function () { return function () { gameLayer_copy.refill() } })())));
                            spritemove1.setTag(100 * i + j);
                        }
                        counter++;
                        break loop1;
                    }
                    else if (j > 0 && this.levelShape[i + 1][j - 1] != 0 && this.levelShape[i + 1][j - 1] != 501) { //left top drop chance
                        this.levelShape[i][j] = this.levelShape[i + 1][j - 1];
                        this.levelShape[i + 1][j - 1] = 501;
                        var spritemove1 = this.gameNode.getChildByTag(100 * (i + 1) + j - 1);
                        this.gameNode.getChildByTag(100 * (i + 1) + j - 1).runAction(cc.sequence(new cc.MoveBy(0.2, cc.p(+ this.sizeOfSprite, -this.sizeOfSprite)), cc.callFunc((function () { return function () { gameLayer_copy.refill() } })())));
                        spritemove1.setTag(100 * i + j);
                        counter++;
                        break loop1;
                    }
                    else if (j < this.levelShape[0].length - 1 && this.levelShape[i + 1][j + 1] != 0 && this.levelShape[i + 1][j + 1] != 501) { //right drp chance
                        this.levelShape[i][j] = this.levelShape[i + 1][j + 1];
                        this.levelShape[i + 1][j + 1] = 501;
                        var spritemove1 = this.gameNode.getChildByTag(100 * (i + 1) + j + 1);
                        this.gameNode.getChildByTag(100 * (i + 1) + j + 1).runAction(cc.sequence(new cc.MoveBy(0.2, cc.p(- this.sizeOfSprite, -this.sizeOfSprite)), cc.callFunc((function () { return function () { gameLayer_copy.refill() } })())));
                        spritemove1.setTag(100 * i + j);
                        counter++;
                        break loop1;
                    }
                }
            }
        }
        //cc.log(counter);
        //if (counter > 0) this.refill();
        if (counter == 0) {
            //this.removeChains(this.detectChains());
            cc.director.getScheduler().scheduleCallbackForTarget(this, ((function () { return function () { gameLayer_copy.removeChains(gameLayer_copy.detectChains()) } })()), time + 0.1, 0, 0, false); //2 sec delay
        }
        //else this.removeChains(this.detectChains()); //detect new chains
    },
    checkForMoves: function () {
        var moves = this.possibleMoves();
        if (moves.length == 0) {
            //keine Moves possible auswechseln mit scalout and fadeout respawn wie start
            cc.log("no moves possible");
            for (var i = 0; i < this.levelShape.length; i++) {
                for (var j = 0; j < this.levelShape[0].length; j++) {
                    if (this.levelShape[i][j] != 0 && this.levelShape[i][j] != 501) {
                        this.levelShape[i][j] = 501;
                        this.blockFadeoutAnim(100 * i + j, true); //removed
                    }
                }
            }
            cc.director.getScheduler().scheduleCallbackForTarget(this, ((function () { return function () { gameLayer_copy.refillAfter() } })()), 1, 0, 0, false); //1 sec delay
        }
        else {
            //cc.log("possible moves:" + moves.length);
        }
    },
    refillAfter: function () {
        var counter = 0;
        for (var j = 0; j < this.levelShape[0].length; j++) {
            for (var i = this.levelShape.length - 1; i >= 0; i--) {
                if (this.levelShape[i][j] == 501 && i != 0) {
                    counter++;
                }
                else if (counter > 0 || i == 0 && counter > 0) {
                    var temp = 2;
                    console.log(counter); //refill after problem
                    for (var n = counter; n > 0; n--) {
                        var random = Math.floor(Math.random() * 6 + 1);
                        this.levelShape[this.levelShape.length - n][j] = random;
                        var sprite = new cc.Sprite.create("res/" + random + ".png");
                        sprite.setOpacity(0);
                        sprite.attr({ x: j * this.sizeOfSprite + 104 * this.scaleFactor, y: (this.levelShape.length - 1) * this.sizeOfSprite + this.upwardsTransition, scale: this.sizeOfIcons });
                        this.gameNode.addChild(sprite, 0, 100 * (this.levelShape.length - n) + j);
                        this.gameNode.getChildByTag((this.levelShape.length - n) * 100 + j).runAction(cc.sequence(new cc.DelayTime(temp * 0.2), new cc.FadeIn(0.4), new cc.MoveBy(0.2, cc.p(0, -(n - 1) * this.sizeOfSprite))));
                        temp++;
                    }
                    counter = 0;
                    if (this.levelShape[i][j] == 0) {
                        i = -1;
                    }
                }
                else {
                    i = -1;
                }
            }
            counter = 0;
        }
        cc.director.getScheduler().scheduleCallbackForTarget(this, ((function () { return function () { gameLayer_copy.sideDrop() } })()), 3, 0, 0, false);
    },
    checkForMovesTipp: function () {
        var moves = this.possibleMoves();
        var now = new Date().getTime();
        //cc.log((now - this.lastMoveStamp) / 1000);
        if (moves.length == 0) {
            //keine Moves possible auswechseln mit scalout and fadeout respawn wie start
            cc.log("no moves possible");
        }
        else if ((now - this.lastMoveStamp) / 1000 > 20) { //blink after nach 10 sec
            var random = Math.floor(Math.random() * moves.length);
            if (moves[random].m == 1) {
                this.gameNode.getChildByTag(100 * moves[random].i + moves[random].j).runAction(cc.sequence(new cc.ScaleBy(0.5, 1.25), new cc.ScaleBy(0.5, 1.25).reverse()).repeat(5));
                this.gameNode.getChildByTag(100 * (moves[random].i + 1) + moves[random].j).runAction(cc.sequence(new cc.ScaleBy(0.5, 1.25), new cc.ScaleBy(0.5, 1.25).reverse()).repeat(5));
            }
            else if (moves[random].m == 2) {
                this.gameNode.getChildByTag(100 * moves[random].i + moves[random].j).runAction(cc.sequence(new cc.ScaleBy(0.5, 1.25), new cc.ScaleBy(0.5, 1.25).reverse()).repeat(5));
                this.gameNode.getChildByTag(100 * (moves[random].i) + moves[random].j + 1).runAction(cc.sequence(new cc.ScaleBy(0.5, 1.25), new cc.ScaleBy(0.5, 1.25).reverse()).repeat(5));
            }
            else if (moves[random].m == 3) {
                this.gameNode.getChildByTag(100 * moves[random].i + moves[random].j).runAction(cc.sequence(new cc.ScaleBy(0.5, 1.25), new cc.ScaleBy(0.5, 1.25).reverse()).repeat(5));
                this.gameNode.getChildByTag(100 * (moves[random].i - 1) + moves[random].j).runAction(cc.sequence(new cc.ScaleBy(0.5, 1.25), new cc.ScaleBy(0.5, 1.25).reverse()).repeat(5));
            }
            else if (moves[random].m == 4) {
                this.gameNode.getChildByTag(100 * moves[random].i + moves[random].j).runAction(cc.sequence(new cc.ScaleBy(0.5, 1.25), new cc.ScaleBy(0.5, 1.25).reverse()).repeat(5));
                this.gameNode.getChildByTag(100 * (moves[random].i) + moves[random].j - 1).runAction(cc.sequence(new cc.ScaleBy(0.5, 1.25), new cc.ScaleBy(0.5, 1.25).reverse()).repeat(5));
            }
            gameLayer_copy.audio(500+Math.floor(Math.random()*soundsNoAction));
        }
    },
    movePossible: function (i, j, m) {
        if (this.moveAllowed(i, j, m)) {
            var copy = new Array(this.levelShape.length); // boost in Safari
            for (var k = 0; k < this.levelShape.length; ++k)
                copy[k] = this.levelShape[k].slice(0);
            if (this.detectChainsStart(this.swap(i, j, m, copy)).length > 0) { //new chain detected
                return true;
            }
            return false;
        }
        else return false; //should never happen

    },
    possibleMoves: function () {
        var copy = new Array(this.levelShape.length); // boost in Safari
        for (var i = 0; i < this.levelShape.length; ++i)
            copy[i] = this.levelShape[i].slice(0);
        var moves = [];
        for (var i = 0; i < this.levelShape.length; i++) {
            for (var j = 0; j < this.levelShape[0].length; j++) {
                for (var m = 1; m < 5; m++) { //movetype
                    if (this.moveAllowed(i, j, m)) {
                        if (this.detectChainsStart(this.swap(i, j, m, copy)).length > 0) { //new chain detected
                            moves.push({ i: i, j: j, m: m });
                        }
                        this.reswap(i, j, m, copy); //same as swap without return
                    }
                }
            }
        }
        return moves;
    },
    swapLevel: function (i, j, m) {
        var temp = 0;
        if (m == 1) {
            temp = this.levelShape[i + 1][j];
            this.levelShape[i + 1][j] = this.levelShape[i][j];
            this.levelShape[i][j] = temp;
        }
        else if (m == 2) {
            temp = this.levelShape[i][j + 1];
            this.levelShape[i][j + 1] = this.levelShape[i][j];
            this.levelShape[i][j] = temp;
        }
        else if (m == 3) {
            temp = this.levelShape[i - 1][j];
            this.levelShape[i - 1][j] = this.levelShape[i][j];
            this.levelShape[i][j] = temp;
        }
        else if (m == 4) {
            temp = this.levelShape[i][j - 1];
            this.levelShape[i][j - 1] = this.levelShape[i][j];
            this.levelShape[i][j] = temp;
        }
    },
    swap: function (i, j, m, level) {
        var temp = 0;
        if (m == 1) {
            temp = level[i + 1][j];
            level[i + 1][j] = level[i][j];
            level[i][j] = temp;
        }
        else if (m == 2) {
            temp = level[i][j + 1];
            level[i][j + 1] = level[i][j];
            level[i][j] = temp;
        }
        else if (m == 3) {
            temp = level[i - 1][j];
            level[i - 1][j] = level[i][j];
            level[i][j] = temp;
        }
        else if (m == 4) {
            temp = level[i][j - 1];
            level[i][j - 1] = level[i][j];
            level[i][j] = temp;
        }
        return level;
    },
    reswap: function (i, j, m, level) {
        var temp = 0;
        if (m == 1) {
            temp = level[i + 1][j];
            level[i + 1][j] = level[i][j];
            level[i][j] = temp;
        }
        else if (m == 2) {
            temp = level[i][j + 1];
            level[i][j + 1] = level[i][j];
            level[i][j] = temp;
        }
        else if (m == 3) {
            temp = level[i - 1][j];
            level[i - 1][j] = level[i][j];
            level[i][j] = temp;
        }
        else if (m == 4) {
            temp = level[i][j - 1];
            level[i][j - 1] = level[i][j];
            level[i][j] = temp;
        }
        //return level;
    },
    detectChains: function () {
        //in x direction
        var chains = [];
        var last = 0;
        var tempCounter = 0;
        for (var i = 0; i < this.levelShape.length; i++) {
            last = 0;
            tempCounter = 0;
            for (var j = 0; j < this.levelShape[0].length; j++) {
                if (this.levelShape[i][j] == last) {
                    tempCounter++;
                    if (j == this.thingsPerRow - 1 && tempCounter >= 3) {
                        chains.push({ i: i, j: j - tempCounter + 1, length: tempCounter, type: 2, tile: last })
                    }
                }
                else if (j == this.thingsPerRow - 1) { // at the end of the row
                    if (tempCounter >= 3) {
                        chains.push({ i: i, j: j - tempCounter, length: tempCounter, type: 2, tile: last })
                    }
                }
                else if (this.levelShape[i][j] == 0 || this.levelShape[i][j] == 501) {
                    if (tempCounter >= 3) {
                        chains.push({ i: i, j: j - tempCounter, length: tempCounter, type: 2, tile: last })
                    }
                    last = 0;
                    tempCounter = 0;
                }
                else {
                    if (tempCounter >= 3) {
                        chains.push({ i: i, j: j - tempCounter, length: tempCounter, type: 2, tile: last })
                    }
                    last = this.levelShape[i][j];
                    tempCounter = 1;
                }
                if (last == 0) tempCounter = 0;
            }
        }
        for (var j = 0; j < this.levelShape[0].length; j++) {
            last = 0;
            tempCounter = 0;
            for (var i = 0; i < this.levelShape.length; i++) {
                if (this.levelShape[i][j] == last) {
                    tempCounter++;
                    if (i == this.thingsPerRow - 1 && tempCounter >= 3) {
                        chains.push({ i: i - tempCounter + 1, j: j, length: tempCounter, type: 1, tile: last })
                    }
                }
                else if (i == this.thingsPerRow - 1) { // at the end of the row
                    if (tempCounter >= 3) {
                        chains.push({ i: i - tempCounter, j: j, length: tempCounter, type: 1, tile: last })
                    }
                }
                else if (this.levelShape[i][j] == 0 || this.levelShape[i][j] == 501) {
                    if (tempCounter >= 3) {
                        chains.push({ i: i - tempCounter, j: j, length: tempCounter, type: 1, tile: last })
                    }
                    last = 0;
                    tempCounter = 0;
                }
                else {
                    if (tempCounter >= 3) {
                        chains.push({ i: i - tempCounter, j: j, length: tempCounter, type: 1, tile: last })
                    }
                    last = this.levelShape[i][j];
                    tempCounter = 1;
                }
                if (last == 0) tempCounter = 0;
            }
        }
        return chains;
    },
    removeChains: function (chains) {
        if (chains.length > 1) { //2chains form same type
            var tags = [];
            for (var k = 0; k < chains.length; k++) {
                if (chains[k].type == 1) {//up
                    for (var n = 0; n < chains[k].length; n++) {
                        this.levelShape[chains[k].i + n][chains[k].j] = 501;
                        tags.push(100 * (chains[k].i + n) + chains[k].j);
                    }
                }
                else if (chains[k].type == 2) {
                    for (var n = 0; n < chains[k].length; n++) {
                        this.levelShape[chains[k].i][chains[k].j + n] = 501;
                        tags.push(100 * chains[k].i + chains[k].j + n);
                    }
                }
            }
            var tagsfilterd = [];
            for (var i = 0; i < tags.length; i++) {
                if (tags[i] > 0) {
                    for (var j = i + 1; j < tags.length; j++) {
                        if (tags[j] == tags[i]) {
                            tags[j] = 0;
                        }
                    }
                    tagsfilterd.push(tags[i]);
                }
            }
            for (var i = 0; i < tagsfilterd.length; i++) {
                if (i == tagsfilterd.length - 1) {
                    this.blockFadeoutAnim(tagsfilterd[i], false);
                }
                else {
                    this.blockFadeoutAnim(tagsfilterd[i], true);
                }
            }
        }
        else {
            for (var k = 0; k < chains.length; k++) {
                if (chains[k].type == 1) {//up
                    for (var n = 0; n < chains[k].length; n++) {
                        this.levelShape[chains[k].i + n][chains[k].j] = 501;
                        if (k == chains.length - 1 && n == chains[k].length - 1) { //last
                            this.blockFadeoutAnim(100 * (chains[k].i + n) + chains[k].j, false);
                        }
                        else {
                            this.blockFadeoutAnim(100 * (chains[k].i + n) + chains[k].j, true);
                        }
                    }
                }
                else if (chains[k].type == 2) {
                    for (var n = 0; n < chains[k].length; n++) {
                        this.levelShape[chains[k].i][chains[k].j + n] = 501;
                        if (k == chains.length - 1 && n == chains[k].length - 1) {
                            this.blockFadeoutAnim(100 * chains[k].i + chains[k].j + n, false);
                        }
                        else {
                            this.blockFadeoutAnim(100 * chains[k].i + chains[k].j + n, true);
                        }
                    }
                }
            }
        }
        //points und points anim
        for (var k = 0; k < chains.length; k++) {
            var removeSelfAction = new cc.RemoveSelf();
            //x: j * this.sizeOfSprite + 104 * this.scaleFactor, y: (this.levelShape.length - 1) * this.sizeOfSprite + this.upwardsTransition, scale: this.sizeOfIcons 
            if (chains[k].type == 1) {
                this.statsArray[0] = this.statsArray[0] + 1;
                this.statsArray[chains[k].tile] = this.statsArray[chains[k].tile] + 1;
                var middleI = chains[k].i + (chains[k].length / 2) - 0.5;
                var middleJ = chains[k].j;
                var pointsLabel = new cc.LabelTTF((chains[k].length - 1) * 50, res.font, this.sizeOfSprite * 0.7);
                pointsLabel.setAnchorPoint(0.5, 0.5);
                pointsLabel.setColor(cc.color(150, 0, 0));
                pointsLabel.setPosition(middleJ * this.sizeOfSprite + 104 * this.scaleFactor, middleI * this.sizeOfSprite + this.upwardsTransition);
                this.gameNode.addChild(pointsLabel);
                pointsLabel.runAction(cc.sequence(new cc.ScaleBy(0.5, 1.3), new cc.FadeOut(0.4), removeSelfAction));
                this.combo((chains[k].length - 1) * 50);
            }
            else if (chains[k].type == 2) {
                this.statsArray[0] = this.statsArray[0] + 1;
                this.statsArray[chains[k].tile] = this.statsArray[chains[k].tile] + 1;
                var middleI = chains[k].i;
                var middleJ = chains[k].j + (chains[k].length / 2) - 0.5;
                var pointsLabel = new cc.LabelTTF((chains[k].length - 1) * 50, res.font, this.sizeOfSprite * 0.7);
                pointsLabel.setAnchorPoint(0.5, 0.5);
                pointsLabel.setColor(cc.color(150, 0, 0));
                pointsLabel.setPosition(middleJ * this.sizeOfSprite + 104 * this.scaleFactor, middleI * this.sizeOfSprite + this.upwardsTransition);
                this.gameNode.addChild(pointsLabel);
                pointsLabel.runAction(cc.sequence(new cc.ScaleBy(0.2, 1.2), new cc.FadeOut(0.1), removeSelfAction));
                this.combo((chains[k].length - 1) * 50);
            }
        }
        //if (chains.length > 0) this.refill();
        if (chains.length == 0) {
            this.checkForMoves();
            this.anim = false;
            this.combo(0);//end
            this.checkForBeforeMovesEndGameOver();
        }
    },
    comboPoints: 0,
    comboCounter: 0,
    moves: 0,
    levelNum: 0,
    combo: function (input) {
        var removeSelfAction = new cc.RemoveSelf();
        if (input == 0) {//end
            this.points += this.comboPoints + (0.2) * (this.comboCounter - 1) * this.comboPoints;
            if (this.comboPoints + (0.2) * (this.comboCounter - 1) * this.comboPoints > 2000) { //big combo
                //label + sounds
                var comboLabel = new cc.LabelTTF("MADNESS", res.font, this.winsize.height / 20);
                comboLabel.setAnchorPoint(0.5, 0.5);
                comboLabel.setColor(cc.color(150, 0, 0));
                comboLabel.setPosition(this.winsize.width / 2, this.winsize.height / 2);
                this.gameNode.addChild(comboLabel);
                comboLabel.runAction(cc.sequence(new cc.ScaleBy(0.5, 1.2), new cc.FadeOut(0.3), removeSelfAction));
                this.audio(300*Math.floor(Math.random()*soundsCombos));
            }
            else if (this.comboPoints + (0.2) * (this.comboCounter - 1) * this.comboPoints > 1000) {
                var comboLabel = new cc.LabelTTF("Incredible", res.font, this.winsize.height / 20);
                comboLabel.setAnchorPoint(0.5, 0.5);
                comboLabel.setColor(cc.color(150, 0, 0));
                comboLabel.setPosition(this.winsize.width / 2, this.winsize.height / 2);
                this.gameNode.addChild(comboLabel);
                comboLabel.runAction(cc.sequence(new cc.ScaleBy(0.5, 1.2), new cc.FadeOut(0.3), removeSelfAction));
                this.audio(300*Math.floor(Math.random()*soundsCombos));
            }
            else if (this.comboPoints + (0.2) * (this.comboCounter - 1) * this.comboPoints > 500) {
                var comboLabel = new cc.LabelTTF("Huge", res.font, this.winsize.height / 20);
                comboLabel.setAnchorPoint(0.5, 0.5);
                comboLabel.setColor(cc.color(150, 0, 0));
                comboLabel.setPosition(this.winsize.width / 2, this.winsize.height / 2);
                this.gameNode.addChild(comboLabel);
                comboLabel.runAction(cc.sequence(new cc.ScaleBy(0.5, 1.2), new cc.FadeOut(0.3), removeSelfAction));
                this.audio(300*Math.floor(Math.random()*soundsCombos));
            }
            else if (this.comboCounter > 1) {
                var comboLabel = new cc.LabelTTF(this.comboCounter + "x Combo", res.font, this.winsize.height / 20);
                comboLabel.setAnchorPoint(0.5, 0.5);
                comboLabel.setColor(cc.color(150, 0, 0));
                comboLabel.setPosition(this.winsize.width / 2, this.winsize.height / 2);
                this.gameNode.addChild(comboLabel);
                comboLabel.runAction(cc.sequence(new cc.ScaleBy(0.5, 1.2), new cc.FadeOut(0.3), removeSelfAction));
            }
            this.comboPoints = 0;
            this.comboCounter = 0;
        }
        else {
            this.comboPoints += input;
            this.comboCounter++;
        }
        this.updateStatus();
    },
    goalOne: false,
    goalTwo: false,
    movesOver: false,
    switcherHack: 0,
    updateStatus: function () {
        //cc.log(this.statsArray);
        this.movesLabelValue.setString(this.moves);
        this.pointsLabelValue.setString(this.points);
        if (this.moves == 0) {
            if (this.switcherHack == 1) {
                this.movesOver = true;
                this.checkGoal();
                this.gameOver();
            }
            this.switcherHack++;
        }
        if(levelsAdditional[this.levelNum][4]>0){
            this.goalStatusLabel1.setString(this.statsArray[levelsAdditional[this.levelNum][4]]);
        }
        if(levelsAdditional[this.levelNum][7]>0){
            this.goalStatusLabel2.setString(this.statsArray[levelsAdditional[this.levelNum][7]]);
        }
        this.checkGoal();
    },
    checkGoal: function () {
        if (levelsAdditional[this.levelNum][4] == 0) {//only points
            if (this.points >= levelsAdditional[this.levelNum][1] && !this.goalOne) { //change for 
                var scaleFactor = this.winsize.height / 2550 * 0.5;
                var checkmark1 = new cc.Sprite(res.vote_true);
                checkmark1.scale = scaleFactor;
                checkmark1.setAnchorPoint(0, 1);
                checkmark1.setPosition(this.winsize.width / 20, this.winsize.height - this.winsize.height / 15);
                this.removeChildByTag(1001);
                this.addChild(checkmark1, 1, 1001);
                this.goalOne = true;
            }
        }
        else if (levelsAdditional[this.levelNum][4] > 0 && levelsAdditional[this.levelNum][0] == 1 && !this.goalOne) {
            if (this.statsArray[levelsAdditional[this.levelNum][4]] >= levelsAdditional[this.levelNum][5]) {//ziel done
                var scaleFactor = this.winsize.height / 2550 * 0.5;
                var checkmark1 = new cc.Sprite(res.vote_true);
                checkmark1.scale = scaleFactor;
                checkmark1.setAnchorPoint(0, 1);
                checkmark1.setPosition(this.winsize.width / 20, this.winsize.height - this.winsize.height / 15);
                this.removeChildByTag(1001);
                this.addChild(checkmark1, 1, 1001);
                this.goalOne = true;
            }
        }
        else if (levelsAdditional[this.levelNum][4] > 0 && levelsAdditional[this.levelNum][0] == 2) {
            if (this.statsArray[levelsAdditional[this.levelNum][4]] >= levelsAdditional[this.levelNum][5] && !this.goalOne) {//ziel done
                var scaleFactor = this.winsize.height / 2550 * 0.5;
                var checkmark1 = new cc.Sprite(res.vote_true);
                checkmark1.scale = scaleFactor;
                checkmark1.setAnchorPoint(0, 1);
                checkmark1.setPosition(this.winsize.width / 20, this.winsize.height - this.winsize.height / 15);
                this.removeChildByTag(1001);
                this.addChild(checkmark1, 1, 1001);
                this.goalOne = true;
            }
            if (this.statsArray[levelsAdditional[this.levelNum][7]] >= levelsAdditional[this.levelNum][8] && !this.goalTwo) {
                var scaleFactor = this.winsize.height / 2550 * 0.5;
                var checkmark2 = new cc.Sprite(res.vote_true);
                checkmark2.scale = scaleFactor;
                checkmark2.setAnchorPoint(0, 1);
                checkmark2.setPosition(this.winsize.width / 20, this.winsize.height - 2 * this.winsize.height / 15);
                this.removeChildByTag(1002);
                this.addChild(checkmark2, 1, 1002);
                this.goalTwo = true;
            }
        }
    },
    checkForBeforeMovesEndGameOver: function () {
        if (levelsAdditional[this.levelNum][4] > 0 && levelsAdditional[this.levelNum][0] == 1 && this.goalOne) {
            this.gameBeforeMovesOverEnding();
        }
        else if (levelsAdditional[this.levelNum][4] > 0 && levelsAdditional[this.levelNum][0] == 2 && this.goalOne && this.goalTwo) {
            this.gameBeforeMovesOverEnding();
        }
    },
    gameOverCounter: 0,
    gameBeforeMovesOverEnding: function () {
        var removeSelfAction = new cc.RemoveSelf();
        this.anim = true;
        if(this.moves > 0) {
            this.gameOverCounter++;
            loop1:while (true) {
                var rand = Math.floor(Math.random() * 81);
                var i = Math.floor(rand / 9);
                var j = rand % 9;
                if (this.levelShape[i][j] != 0 && this.levelShape[i][j] != 501) {
                    this.blockFadeOutGameOver(100 * i + j);
                    this.levelShape[i][j]=501;
                    var pointsLabel = new cc.LabelTTF(200 * this.gameOverCounter, res.font, this.sizeOfSprite * 0.7);
                    pointsLabel.setAnchorPoint(0.5, 0.5);
                    pointsLabel.setColor(cc.color(150, 0, 0));
                    pointsLabel.setPosition(j * this.sizeOfSprite + 104 * this.scaleFactor, i * this.sizeOfSprite + this.upwardsTransition);
                    this.gameNode.addChild(pointsLabel);
                    pointsLabel.runAction(cc.sequence(new cc.ScaleBy(0.2, 1.2), new cc.FadeOut(0.1), removeSelfAction));
                    this.points += 200 * this.gameOverCounter;
                    break loop1;
                }
            }
            this.moves--;
        }
        this.updateStatus();
    },
    gameOver: function () {
        cc.director.pause();
        cc.director.getScheduler().pauseTarget(this);
        this.addChild(new gameOverLayer(), 5, 1005);
        cc.director.resume();
    },
    blockFadeOutGameOver: function(tag){
        var removeSelfAction = new cc.RemoveSelf();
        var sprite = this.gameNode.getChildByTag(tag);
        sprite.setTag(900);
        sprite.runAction(cc.sequence(new cc.ScaleBy(0.5,1.3), removeSelfAction, cc.callFunc((function () { return function () { gameLayer_copy.gameBeforeMovesOverEnding() } })())));
        sprite.runAction(new cc.FadeOut(0.5));
    },
    blockFadeoutAnim: function (tag, last) {
        var removeSelfAction = new cc.RemoveSelf();
        var sprite = this.gameNode.getChildByTag(tag);
        sprite.setTag(900);
        if (last) {
            sprite.runAction(cc.sequence(this.scaleout.clone(), removeSelfAction));
            sprite.runAction(this.fadeout.clone()); //removeSelfAction remove sprite from gameLayer
        }
        else {
            sprite.runAction(cc.sequence(this.scaleout.clone(), removeSelfAction, cc.callFunc((function () { return function () { gameLayer_copy.refill() } })())));
            sprite.runAction(this.fadeout.clone());
        }
    },
    moveAllowed: function (i, j, moveType) {
        if (this.levelShape[i][j] == 0) return false;
        else if (moveType == 1) {
            if (i + 1 > this.thingsPerRow - 1 || this.levelShape[i + 1][j] == 0 || this.levelShape[i + 1][j] == 501) return false; //out of bound test
            else return true;
        }
        else if (moveType == 2) {
            if (j + 1 > this.thingsPerRow - 1 || this.levelShape[i][j + 1] == 0 || this.levelShape[i][j + 1] == 501) return false;
            else return true;
        }
        else if (moveType == 3) {
            if (i - 1 < 0 || this.levelShape[i - 1][j] == 0 || this.levelShape[i - 1][j] == 501) return false;
            else return true;
        }
        else if (moveType == 4) {
            if (j - 1 < 0 || this.levelShape[i][j - 1] == 0 || this.levelShape[i][j - 1] == 501) return false;
            else return true;
        }
        else return false;
    },
    getMoveType: function (x1, x2, y1, y2) { //up = 1, right = 2, down = 3, left = 4 unknown = 5
        var dy = y2 - y1;
        var dx = x2 - x1;
        if (dx == 0) {
            if (dy == 0) return 0;
            if (dy > 0) return 1;
            else return 3;
        }
        if (dy >= 0) {
            if (dx > 0) {
                if (dy >= dx) return 1;
                else return 2;
            }
            else {
                if (dy >= Math.abs(dx)) return 1;
                else return 4;
            }
        }
        else { //dy <0
            if (dx > 0) {
                if (Math.abs(dy) >= dx) return 3;
                else return 2;
            }
            else {
                if (dy <= dx) return 3;
                else return 4;
            }
        }
    },
    calcI: function (y) {
        var i = (y - this.upwardsTransition + 77) / (this.sizeOfSprite);
        if (i > 0 && i < this.thingsPerRow) {
            i = Math.floor(i);
        }
        else i = 404;
        return i;
    },
    calcJ: function (x) {
        var j = ((x - 27) / this.sizeOfSprite);
        if (j > 0 && j < this.thingsPerRow) {
            j = Math.floor(j);
        }
        else j = 404;
        return j;
    },
    loadLvl: function () {
        this.levelShape = [];
        var temp = [];
        var levelNum = JSON.parse(cc.sys.localStorage.getItem(251));
        levelNum--;
        for (var i = levelsArray[levelNum].length - 1; i >= 0; i--) {
            this.levelShape.push(levelsArray[levelNum][i].slice(0));
        }
        //cc.log(this.levelShape);
        this.levelNum = levelNum;
        this.moves = levelsAdditional[levelNum][10];
        this.init();
    },
    createLevel: function (level) {
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[0].length; j++) {
                if (level[i][j] == 1) {
                    level[i][j] = Math.floor(Math.random() * 6 + 1);
                }
            }
        }
        while (this.detectChainsStart(level).length > 0) {
            level = this.removeChainsStart(this.detectChainsStart(level), level);
            for (var i = 0; i < level.length; i++) {
                for (var j = 0; j < level[0].length; j++) {
                    if (level[i][j] == 501) {
                        level[i][j] = Math.floor(Math.random() * 6 + 1);
                    }
                }
            }
        }
        return level;
    },
    removeChainsStart: function (chains, level) {
        for (var k = 0; k < chains.length; k++) {
            if (chains[k].type == 1) {//up
                for (var n = 0; n < chains[k].length; n++) {
                    level[chains[k].i + n][chains[k].j] = 501;
                }
            }
            else if (chains[k].type == 2) {
                for (var n = 0; n < chains[k].length; n++) {
                    level[chains[k].i][chains[k].j + n] = 501;
                }
            }
        }
        return level;
    },
    detectChainsStart: function (level) {
        //in x direction
        var chains = [];
        var last = 0;
        var tempCounter = 0;
        for (var i = 0; i < level.length; i++) {
            last = 0;
            tempCounter = 0;
            for (var j = 0; j < level[0].length; j++) {
                if (level[i][j] == last) {
                    tempCounter++;
                    if (j == this.thingsPerRow - 1 && tempCounter >= 3) {
                        chains.push({ i: i, j: j - tempCounter + 1, length: tempCounter, type: 2 })
                    }
                }
                else if (j == this.thingsPerRow - 1) { // at the end of the row
                    if (tempCounter >= 3) {
                        chains.push({ i: i, j: j - tempCounter, length: tempCounter, type: 2 })
                    }
                }
                else if (level[i][j] == 0 || level[i][j] == 501) {
                    if (tempCounter >= 3) {
                        chains.push({ i: i, j: j - tempCounter, length: tempCounter, type: 2 })
                    }
                    last = 0;
                    tempCounter = 0;
                }
                else {
                    if (tempCounter >= 3) {
                        chains.push({ i: i, j: j - tempCounter, length: tempCounter, type: 2 })
                    }
                    last = level[i][j];
                    tempCounter = 1;
                }
                if (last == 0) tempCounter = 0;
            }
        }
        for (var j = 0; j < level[0].length; j++) {
            last = 0;
            tempCounter = 0;
            for (var i = 0; i < level.length; i++) {
                if (level[i][j] == last) {
                    tempCounter++;
                    if (i == this.thingsPerRow - 1 && tempCounter >= 3) {
                        chains.push({ i: i - tempCounter + 1, j: j, length: tempCounter, type: 1 })
                    }
                }
                else if (i == this.thingsPerRow - 1) { // at the end of the row
                    if (tempCounter >= 3) {
                        chains.push({ i: i - tempCounter, j: j, length: tempCounter, type: 1 })
                    }
                }
                else if (level[i][j] == 0 || level[i][j] == 501) {
                    if (tempCounter >= 3) {
                        chains.push({ i: i - tempCounter, j: j, length: tempCounter, type: 1 })
                    }
                    last = 0;
                    tempCounter = 0;
                }
                else {
                    if (tempCounter >= 3) {
                        chains.push({ i: i - tempCounter, j: j, length: tempCounter, type: 1 })
                    }
                    last = level[i][j];
                    tempCounter = 1;
                }
                if (last == 0) tempCounter = 0;
            }
        }
        return chains;
    },
    audio: function(tag){
        if(JSON.parse(cc.sys.localStorage.getItem(301))==1 && !cc.audioEngine.isMusicPlaying()){//sounds on
            cc.log("sound played");
            cc.audioEngine.stopAllEffects();
            cc.audioEngine.playEffect("res/"+tag+".mp3");
        }
    },
    initAnimations: function () {
        this.left = new cc.moveBy(0.1, cc.p(-this.sizeOfSprite, 0)); //fucking shiiit of retain :-P costed me about 8hours
        this.left.retain();
        this.right = new cc.moveBy(0.1, cc.p(+this.sizeOfSprite, 0));
        this.right.retain();
        this.down = new cc.moveBy(0.1, cc.p(0, -this.sizeOfSprite));
        this.down.retain();
        this.up = new cc.moveBy(0.1, cc.p(0, +this.sizeOfSprite));
        this.up.retain();
        this.fadeout = new cc.FadeOut(0.5);
        this.fadeout.retain();
        this.scaleout = new cc.ScaleTo(0.5, 1.3);
        this.scaleout.retain();
    },
    initPause: function () {
        this.pauseLabel = new cc.LabelTTF("Pause", res.font, this.winsize.height / 20);
        this.pauseLabel.setColor(cc.color(0, 0, 0));
        this.pauseLabelP = new cc.LabelTTF("Pause", res.font, this.winsize.height / 20);
        this.pauseLabelP.setColor(cc.color(0, 0, 150));

        var pauseItemLabel = new cc.MenuItemSprite(
            this.pauseLabel,
            this.pauseLabelP,
            this.onPause, this);
        pauseItemLabel.setAnchorPoint(0, 1);
        this.pauseMenu = new cc.Menu(pauseItemLabel);
        this.pauseMenu.setPosition(cc.p(0, this.winsize.height));
        this.addChild(this.pauseMenu, 0, 12);
        this.pauseMenu.retain();
    },
    removeEverything: function () {
        this.removeAllChildren();
    },
    onPause: function () {
        var ls = cc.sys.localStorage;
        this.removeChildByTag(12);
        cc.director.pause();
        this.addChild(new pauseLayer());
    },
    addPauseLabel: function () {
        this.addChild(this.pauseMenu, 0, 12);
    },
    onExit: function () {
        this.pauseMenu.release();
        this.left.release();
        this.right.release();
        this.up.release(),
        this.down.release();
        this.fadeout.release();
        this.scaleout.release();
        this._super();
    }
});
