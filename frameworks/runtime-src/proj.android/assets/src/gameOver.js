var gameOverLayer = cc.LayerColor.extend({
    // constructor
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super(cc.color(255, 255, 255, 255));
        var winsize = cc.director.getWinSize();
        this.winsize = winsize;
        var saveArray = JSON.parse(cc.sys.localStorage.getItem(209));

        this.levelCompleteLabel = new cc.LabelTTF("Level Completed", "res/Quicksand-Light.ttf", winsize.height / 18);
        this.levelCompleteLabel.setPosition(cc.p(winsize.width / 2, winsize.height / 6 * 5));
        this.levelCompleteLabel.setColor(cc.color(0, 150, 0));
        this.levelCompleteLabel.visible = false;
        this.addChild(this.levelCompleteLabel);

        this.againLabel = new cc.LabelTTF("You did it again!", "res/Quicksand-Light.ttf", winsize.height / 18);
        this.againLabel.setPosition(cc.p(winsize.width / 2, winsize.height / 6 * 5));
        this.againLabel.setColor(cc.color(0, 150, 0));
        this.againLabel.visible = false;
        this.addChild(this.againLabel);

        this.highscoreLabel = new cc.LabelTTF("New Highscore!", "res/Quicksand-Light.ttf", winsize.height / 18);
        this.highscoreLabel.setPosition(cc.p(winsize.width / 2, winsize.height / 6 * 5));
        this.highscoreLabel.setColor(cc.color(0, 150, 0));
        this.highscoreLabel.visible = false;
        this.addChild(this.highscoreLabel);

        this.newrankLabel = new cc.LabelTTF("New Rank!", "res/Quicksand-Light.ttf", winsize.height / 18);
        this.newrankLabel.setPosition(cc.p(winsize.width / 2, winsize.height / 6 * 5));
        this.newrankLabel.setColor(cc.color(0, 150, 0));
        this.newrankLabel.visible = false;
        this.addChild(this.newrankLabel);

        this.movesoverLabel = new cc.LabelTTF("Out of Moves", "res/Quicksand-Light.ttf", winsize.height / 18);
        this.movesoverLabel.setPosition(cc.p(winsize.width / 2, winsize.height / 6 * 5));
        this.movesoverLabel.setColor(cc.color(150, 0, 0));
        this.movesoverLabel.visible = false;
        if (gameLayer_copy.movesOver) this.addChild(this.movesoverLabel);

        if(gameLayer_copy.levelNum == JSON.parse(cc.sys.localStorage.getItem(201))-1){
            if(levelsAdditional[gameLayer_copy.levelNum][0] == 1 && gameLayer_copy.goalOne){ //level geschafft ein ziel
                this.levelCompleteLabel.visible = true;
                this.save();
                this.audio(200+Math.floor(Math.random()*soundsAfterLevelWinning));
            }
            else if(levelsAdditional[gameLayer_copy.levelNum][0] == 2 && gameLayer_copy.goalOne && gameLayer_copy.goalTwo){ //level geschafft zwei goals
                this.levelCompleteLabel.visible = true;
                this.save();
                this.audio(200+Math.floor(Math.random()*soundsAfterLevelWinning));
            }
            else{//level nicht geschafft und höchstes level
                this.movesoverLabel.visible = true;
                this.saveStats();
                this.audio(100+Math.floor(Math.random()*soundsAfterLevelLosing));
            }
        }
        else if(gameLayer_copy.levelNum < JSON.parse(cc.sys.localStorage.getItem(201))-1){
            if(levelsAdditional[gameLayer_copy.levelNum][0] == 1 && gameLayer_copy.goalOne){ //level again gemacht
                if(this.getRank(gameLayer_copy.points)>this.getRank(saveArray[gameLayer_copy.levelNum][0])){//new rank
                    this.newrankLabel.visible = true;
                    this.save();
                    this.audio(200+Math.floor(Math.random()*soundsAfterLevelWinning));
                }
                else if(gameLayer_copy.points>saveArray[gameLayer_copy.levelNum][0]){//new highscore
                    this.highscoreLabel.visible= true;
                    this.save();
                    this.audio(200+Math.floor(Math.random()*soundsAfterLevelWinning));
                }
                else{
                    this.againLabel.visible = true;
                    this.saveStats();
                    this.audio(200+Math.floor(Math.random()*soundsAfterLevelWinning));
                }
            }
            else if(levelsAdditional[gameLayer_copy.levelNum][0] == 2 && gameLayer_copy.goalOne && gameLayer_copy.goalTwo){ //level geschafft zwei goals
                if(this.getRank(gameLayer_copy.points)>this.getRank(saveArray[gameLayer_copy.levelNum][0])){//new rank
                    this.newrankLabel.visible = true;
                    this.save();
                    this.audio(200+Math.floor(Math.random()*soundsAfterLevelWinning));
                }
                else if(gameLayer_copy.points>saveArray[gameLayer_copy.levelNum][0]){//new highscore
                    this.highscoreLabel.visible= true;
                    this.save();
                    this.audio(200+Math.floor(Math.random()*soundsAfterLevelWinning));
                }
                else{
                    this.againLabel.visible = true;
                    this.saveStats();
                    this.audio(200+Math.floor(Math.random()*soundsAfterLevelWinning));
                }
            }
            else{//level nicht geschafft und höchstes level
                this.movesoverLabel.visible = true;
                this.saveStats();
                this.audio(100+Math.floor(Math.random()*soundsAfterLevelLosing));
            }
        }


        var scaleFactor = this.winsize.height / 2550 * 0.5;

        //Points und Moves

        var dn1 = new cc.DrawNode();
        this.addChild(dn1);
        dn1.drawRect(cc.p(this.winsize.width / 2 - 1, this.winsize.height / 6 * 4), cc.p(this.winsize.width / 2 + 1, this.winsize.height / 6 * 4 - this.winsize.height / 20), cc.color(0, 0, 0, 255), 2, cc.color(0, 0, 0, 255));
        //some labels 3/26 + 2/15 ~= 0.25
        var pointsLabelText = new cc.LabelTTF("Points", "res/Quicksand-Light.ttf", this.winsize.height / 30);
        pointsLabelText.setColor(cc.color(0, 0, 0));
        pointsLabelText.setAnchorPoint(1, 0);
        pointsLabelText.setPosition(this.winsize.width / 2 - 20, this.winsize.height / 6 * 4);
        var movesLabelText = new cc.LabelTTF("Moves", "res/Quicksand-Light.ttf", this.winsize.height / 30);
        movesLabelText.setColor(cc.color(0, 0, 0));
        movesLabelText.setAnchorPoint(0, 0);
        movesLabelText.setPosition(this.winsize.width / 2 + 20, this.winsize.height / 6 * 4);

        this.movesLabelValue = new cc.LabelTTF(0, "res/Quicksand-Light.ttf", this.winsize.height / 20);
        this.movesLabelValue.setColor(cc.color(0, 0, 0));
        this.movesLabelValue.setAnchorPoint(0, 0);
        this.movesLabelValue.setPosition(this.winsize.width / 2 + 20, this.winsize.height / 6 * 4 - this.winsize.height / 20);
        //if (gameLayer_copy.movesOver) {
            this.movesLabelValue.setString(levelsAdditional[gameLayer_copy.levelNum][10]);
        //}
        /*else {
            this.movesLabelValue.setString(levelsAdditional[gameLayer_copy.levelNum][10] - gameLayer_copy.movesLeft);
        }*/

        this.pointsLabelValue = new cc.LabelTTF(gameLayer_copy.points, "res/Quicksand-Light.ttf", this.winsize.height / 20);
        this.pointsLabelValue.setColor(cc.color(0, 0, 0));
        this.pointsLabelValue.setAnchorPoint(1, 0);
        this.pointsLabelValue.setPosition(this.winsize.width / 2 - 20, this.winsize.height / 6 * 4 - this.winsize.height / 20);
        this.addChild(pointsLabelText);
        this.addChild(movesLabelText);
        this.addChild(this.movesLabelValue);
        this.addChild(this.pointsLabelValue);
        //goals
        var scaleFactor = this.winsize.height / 2550 * 0.5;
        if (gameLayer_copy.goalOne) {
            var checkmark1 = new cc.Sprite(res.vote_true);
        }
        else {
            var checkmark1 = new cc.Sprite(res.vote_false);
        }
        checkmark1.scale = scaleFactor;
        checkmark1.setAnchorPoint(0, 1);
        checkmark1.setPosition(this.winsize.width / 20, this.winsize.height / 2 + 1 * 256 * scaleFactor);
        this.addChild(checkmark1, 1, 1001);
        var goalLabel1 = new cc.LabelTTF(levelsAdditional[gameLayer_copy.levelNum][6], "res/Quicksand-Light.ttf", this.winsize.height / 30);
        if (levelsAdditional[gameLayer_copy.levelNum][4] > 0) { //mit chains 
            var sprite = new cc.Sprite.create("res/" + levelsAdditional[gameLayer_copy.levelNum][4] + ".png");
            sprite.setAnchorPoint(0, 0.5);
            sprite.attr({ x: this.winsize.width / 20 + 256 * scaleFactor + this.winsize.width / 40, y: this.winsize.height / 2 + 0.5 * 256 * scaleFactor, scale: gameLayer_copy.sizeOfIcons * 0.7 });
            this.addChild(sprite);
            goalLabel1.setPosition(this.winsize.width / 20 + 256 * scaleFactor + this.winsize.width / 40 + gameLayer_copy.sizeOfIcons * 256 , this.winsize.height / 2 + 0.5 * 256 * scaleFactor);
        }
        else{
            goalLabel1.setPosition(this.winsize.width / 20 + 256 * scaleFactor + this.winsize.width / 40, this.winsize.height / 2 + 0.5 * 256 * scaleFactor);
        }
        goalLabel1.setColor(cc.color(0, 0, 0));
        goalLabel1.setAnchorPoint(0, 0.5);
        this.addChild(goalLabel1);

        if (levelsAdditional[gameLayer_copy.levelNum][0] == 2) {//second goal
            if (gameLayer_copy.goalTwo) {
                var checkmark2 = new cc.Sprite(res.vote_true);
            }
            else {
                var checkmark2 = new cc.Sprite(res.vote_false);
            }
            checkmark2.scale = scaleFactor;
            checkmark2.setAnchorPoint(0, 1);
            checkmark2.setPosition(this.winsize.width / 20, this.winsize.height / 2);
            this.addChild(checkmark2, 1, 1002);
            var goalLabel2 = new cc.LabelTTF(levelsAdditional[gameLayer_copy.levelNum][9], "res/Quicksand-Light.ttf", this.winsize.height / 30);
            if (levelsAdditional[gameLayer_copy.levelNum][7] > 0) { //mit chains 
                var sprite = new cc.Sprite.create("res/" + levelsAdditional[gameLayer_copy.levelNum][7] + ".png");
                sprite.setAnchorPoint(0, 0.5);
                sprite.attr({ x: this.winsize.width / 20 + 256 * scaleFactor + this.winsize.width / 40, y: this.winsize.height / 2 - 0.5 * 256 * scaleFactor, scale: gameLayer_copy.sizeOfIcons * 0.7 });
                this.addChild(sprite);
                goalLabel2.setPosition(this.winsize.width / 20 + 256 * scaleFactor + this.winsize.width / 40 + gameLayer_copy.sizeOfIcons * 256 , this.winsize.height / 2 - 0.5 * 256 * scaleFactor);
            }
            else{
                goalLabel2.setPosition(this.winsize.width / 20 + 256 * scaleFactor + this.winsize.width / 40, this.winsize.height / 2 - 0.5 * 256 * scaleFactor);
            
            }
            goalLabel2.setColor(cc.color(0, 0, 0));
            goalLabel2.setAnchorPoint(0, 0.5);
            this.addChild(goalLabel2);
        }

        //stats

        var statsLabel1 = new cc.LabelTTF("Stats", "res/Quicksand-Light.ttf", this.winsize.height / 20);
        statsLabel1.setColor(cc.color(0, 0, 0));
        statsLabel1.setAnchorPoint(0.5, 0.5);
        statsLabel1.setPosition(this.winsize.width/2, this.winsize.height/8*3);
        this.addChild(statsLabel1);

        var totalLabel1 = new cc.LabelTTF("Total chains: "+ gameLayer_copy.statsArray[0], "res/Quicksand-Light.ttf", this.winsize.height / 30);
        totalLabel1.setColor(cc.color(0, 0, 0));
        totalLabel1.setAnchorPoint(0.5, 0.5);
        totalLabel1.setPosition(this.winsize.width/2, this.winsize.height/3);
        this.addChild(totalLabel1);

        for(var i = 1; i< 4; i++){
            var sprite = new cc.Sprite.create("res/" +i+ ".png");
            sprite.setAnchorPoint(0,0.5)
            sprite.attr({ x: (i-1) * (this.winsize.width-100)/3 + 50, y: this.winsize.height/3-1.5*this.winsize.height / 30, scale: gameLayer_copy.sizeOfIcons });
            this.addChild(sprite);
            if(gameLayer_copy.statsArray[i]==0) {
                var numLabel = new cc.LabelTTF("0", "res/Quicksand-Light.ttf", this.winsize.height / 30);
            }
            else var numLabel = new cc.LabelTTF(gameLayer_copy.statsArray[i], "res/Quicksand-Light.ttf", this.winsize.height / 30);
            numLabel.setColor(cc.color(0, 0, 0));
            numLabel.setAnchorPoint(0.5, 0.5);
            numLabel.setPosition((i-1) * (this.winsize.width-100)/3 + 50+ 2* this.winsize.height / 20, this.winsize.height/3-1.5*this.winsize.height / 30);
            this.addChild(numLabel);
        }
        for(var i = 4; i < 7; i++){
            var sprite = new cc.Sprite.create("res/" +i+ ".png");
            sprite.setAnchorPoint(0,0.5)
            sprite.attr({ x: (i-4) * (this.winsize.width-100)/3 + 50, y: this.winsize.height/3-3.5*this.winsize.height / 30, scale: gameLayer_copy.sizeOfIcons });
            this.addChild(sprite);
            if(gameLayer_copy.statsArray[i]==0) {
                var numLabel = new cc.LabelTTF("0", "res/Quicksand-Light.ttf", this.winsize.height / 30);
            }
            else var numLabel = new cc.LabelTTF(gameLayer_copy.statsArray[i], "res/Quicksand-Light.ttf", this.winsize.height / 30);
            numLabel.setColor(cc.color(0, 0, 0));
            numLabel.setAnchorPoint(0.5, 0.5);
            numLabel.setPosition((i-4) * (this.winsize.width-100)/3 + 50+ 2*this.winsize.height / 20, this.winsize.height/3-3.5*this.winsize.height / 30);
            this.addChild(numLabel);
        }


        this.recognizer = new SimpleRecognizer();

        var backItemLabel = new cc.MenuItemSprite(
            new cc.Sprite(res.forward),
            new cc.Sprite(res.forward),
            this.onRestart, this);
        backItemLabel.scale = scaleFactor * 3;
        var backMenu = new cc.Menu(backItemLabel);
        backMenu.setPosition(cc.p(winsize.width / 2, winsize.height / 12));
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
        //cc.director.pause();
        cc.director.runScene(new levelSelectorScene());
        //cc.director.resume();
    },
    save: function () {
        var saveArray = JSON.parse(cc.sys.localStorage.getItem(209));
        if(gameLayer_copy.points>saveArray[gameLayer_copy.levelNum][0]){
            saveArray[gameLayer_copy.levelNum][0] = gameLayer_copy.points;
        }
        saveArray[gameLayer_copy.levelNum][1] = gameLayer_copy.goalOne;
        saveArray[gameLayer_copy.levelNum][2] = gameLayer_copy.goalTwo;
        //nächstes Level freischalten
        cc.sys.localStorage.setItem(209,JSON.stringify(saveArray));

        if(gameLayer_copy.levelNum == JSON.parse(cc.sys.localStorage.getItem(201))-1){
            cc.sys.localStorage.setItem(201,JSON.parse(cc.sys.localStorage.getItem(201))+1);
        }
        this.saveStats();
    },
    audio: function(tag){
        if(JSON.parse(cc.sys.localStorage.getItem(301))==1 && !cc.audioEngine.isMusicPlaying()){//sounds on
            cc.audioEngine.stopAllEffects();
            cc.log("sound played");
            cc.audioEngine.playEffect("res/"+tag+".mp3");
        }
    },
    saveStats: function(){
        //save stats
        var statsArray = JSON.parse(cc.sys.localStorage.getItem(210));
        for(var i = 0; i< statsArray.length; i++){
            statsArray[i] += gameLayer_copy.statsArray[i];
        }
        cc.sys.localStorage.setItem(210,JSON.stringify(statsArray));
    },
    getRank: function (points) {
        if(points >= levelsAdditional[gameLayer_copy.levelNum][3]){//höchster rank
            return 3;
        }
        else if(points >= levelsAdditional[gameLayer_copy.levelNum][2]){//mittlere Rank
            return 2;
        }
        else return 1;
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
        cc.log(rtn);
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
    },
    onExit: function () {
        this._super();
    }
});