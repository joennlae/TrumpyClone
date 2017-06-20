var levelSelectorScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
                                         var loading = new loadingLayer();
                                         this.addChild(loading,1000,1);
        var layer = new levelSelector();
        this.addChild(layer,0,0);
                                         this.removeChildByTag(1);
    }
});
var loadingLayer = cc.Layer.extend({
                                   winsize: null,
                                   messageLabel: null,
                                   ctor: function(){
                                        this._super();
                                        this.winsize = cc.director.getWinSize();
                                        this.init();
                                   },
                                   init: function(){
                                        var whiteLayer = new cc.LayerColor(cc.color(255,255,255,255),this.winsize.width,this.winsize.height);
                                        this.addChild(whiteLayer);
                                   this.messageLabel = new cc.LabelTTF("Loading", res.font,this.winsize.height/8, cc.size(this.winsize.width-40,this.winsize.height/3) ,cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_TOP);
                                   this.messageLabel.setColor(cc.color(0,0,0));
                                   this.messageLabel.setAnchorPoint(0.5,0.5);
                                   this.messageLabel.setPosition(cc.p(this.winsize.width/2,this.winsize.height/2));
                                   this.addChild(this.messageLabel);
                                   }
});
var levelSelector = cc.Layer.extend({
    scrollView: null,
    winsize: null,
    ctor: function () {
        levelSelector_copy = this;
        this._super();
        this.winsize = cc.director.getWinSize();
        this.init();
    },
    init: function () {
                                    
        //loading bar
                                    var time = Date.now();
                                    cc.log("start");
        //ad
        sdkbox.PluginAdMob.show("bottombanner");
        var background = new cc.LayerColor(cc.color(255, 255, 255, 255), this.winsize.width, this.winsize.height);
        this.addChild(background);
        this.scrollView = new ccui.ScrollView();
        this.scrollView.setInnerContainerSize(cc.size(this.winsize.width, this.winsize.height * amountOfLevels/3 + this.winsize.height/3));
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.setContentSize(cc.size(this.winsize.width, this.winsize.height));
        this.scrollView.setScrollBarEnabled(false);
        this.scrollView.setAnchorPoint(cc.p(0.5, 0.5));
        this.scrollView.setPosition(cc.p(this.winsize.width / 2, this.winsize.height / 2));
        this.addChild(this.scrollView, 0, 1);
        //cc.log(((cc.sys.localStorage.getItem(201)-1)/(amountOfLevels+1))*100)
        if(cc.sys.localStorage.getItem(201)<2){
        this.scrollView.jumpToPercentVertical(0);
        }
        else{
            this.scrollView.jumpToPercentVertical(((cc.sys.localStorage.getItem(201)-2)/(amountOfLevels+1-3))*100);
        }
        //this.scrollView.jumpToPercentVertical((1/9)*100);
        //back label
        this.backLabel = new cc.LabelTTF("Back", res.font, this.winsize.height / 20);
        this.backLabel.setColor(cc.color(0, 0, 0));//black color
        this.backLabelP = new cc.LabelTTF("Back", res.font, this.winsize.height / 20);
        this.backLabelP.setColor(cc.color(0, 0, 150));

        var backItemLabel = new cc.MenuItemSprite(
            this.backLabel,
            this.backLabelP,
            this.onBack, this);
        backItemLabel.setAnchorPoint(0, 1);
        var backMenu = new cc.Menu(backItemLabel);
        backMenu.setPosition(cc.p(25, this.winsize.height - 20));
        this.addChild(backMenu, 5, 2);
        this.statsLabel = new cc.LabelTTF("Stats", res.font, this.winsize.height / 20);
        this.statsLabel.setColor(cc.color(0, 0, 0));//black color
        this.statsLabelP = new cc.LabelTTF("Stats", res.font, this.winsize.height / 20);
        this.statsLabelP.setColor(cc.color(0, 0, 150));

        var statsItemLabel = new cc.MenuItemSprite(
            this.statsLabel,
            this.statsLabelP,
            this.onstats, this);
        statsItemLabel.setAnchorPoint(1, 1);
        var statsMenu = new cc.Menu(statsItemLabel);
        statsMenu.setPosition(cc.p(this.winsize.width - 20, this.winsize.height - 20));
        this.addChild(statsMenu, 5, 4);
        var dn1 = new cc.DrawNode();
        dn1.drawRect(cc.p(0, this.winsize.height), cc.p(this.winsize.width, this.winsize.height - 40 - this.winsize.height / 20), cc.color(255, 255, 255, 255), 0, cc.color(0, 0, 0, 0));
        this.addChild(dn1, 4, 3);
        var dn = new cc.DrawNode();
        this.scrollView.addChild(dn);
        var scaleFactor = this.winsize.height / 2550 * 0.5;
        var saveArray = JSON.parse(cc.sys.localStorage.getItem(209));
        var sizeOfIcons = 140 / 256 * this.winsize.width / 1440;
                                    //padding calcs
                                    var padding = 40;
                                    if(this.winsize.width<1400){
                                        var padding = 20;
                                    }
                                    else if (this.winsize.width<1000){
                                        var padding = 10;
                                    }
                                    
        for (var i = 0; i < levelsAdditional.length; i++) {
            var topleftCornerY = this.scrollView.getInnerContainerSize().height - ((i * ((this.winsize.height - (3*padding)) / 3) + this.winsize.height / 20 + 30 + 40 + (i - 1)  * padding));
            var bottomRightCornerY = this.scrollView.getInnerContainerSize().height - ((i + 1) * ((this.winsize.height - (3*padding)) / 3) + this.winsize.height / 20 + 30 + 40 + (i - 1)  * padding);
            //dn.drawRect(cc.p(20, topleftCornerY), cc.p(this.scrollView.getInnerContainerSize().width - 20, bottomRightCornerY), cc.color(0, 0, 0, 0), 2, cc.color(0, 0, 0, 255));
                                    var lineThickness = 2;
                                    if(this.winsize.width<1000){
                                    var lineThickness = 1;
                                    }
            dn.drawRect(cc.p(this.winsize.width / 6, bottomRightCornerY + lineThickness), cc.p(this.winsize.width / 6 * 5, bottomRightCornerY), cc.color(0, 0, 0, 0), lineThickness, cc.color(0, 0, 0, 255));
            if (JSON.parse(cc.sys.localStorage.getItem(201)) > i) {
                var levelNum = new cc.LabelTTF(i + 1, res.font, this.winsize.height / 12);
                levelNum.setColor(cc.color(50, 50, 50));
                levelNum.setAnchorPoint(1, 1);
                levelNum.setPosition(this.winsize.width - 40, topleftCornerY - 20);
                this.scrollView.addChild(levelNum);
                var tweet = new cc.LabelTTF(levelTweets[i], res.font, this.winsize.height / 50, cc.size(this.winsize.width / 3 * 2.3, (this.winsize.height - (3*padding)) / (3 * 2)), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_ALIGNMENT_TOP);
                tweet.setColor(cc.color(50, 50, 50));
                tweet.setAnchorPoint(0, 1);//topleft
                tweet.setPosition(padding, topleftCornerY - padding/2);
                this.scrollView.addChild(tweet);
                if (saveArray[i][1] == 1) {
                    var checkmark1 = new cc.Sprite(res.vote_true);
                }
                else {
                    var checkmark1 = new cc.Sprite(res.vote_false);
                }
                checkmark1.scale = scaleFactor;
                checkmark1.setAnchorPoint(0, 0);
                checkmark1.setPosition(padding, bottomRightCornerY + padding + 256 * scaleFactor);
                this.scrollView.addChild(checkmark1);
                var goalLabel1 = new cc.LabelTTF(levelsAdditional[i][6], res.font, this.winsize.height / 40);
                if (levelsAdditional[i][4] > 0) { //mit chains 
                    var sprite = new cc.Sprite.create("res/" + levelsAdditional[i][4] + ".png");
                    sprite.setAnchorPoint(0, 0.5);
                    sprite.attr({ x: 1.5*padding + 256 * scaleFactor, y: bottomRightCornerY + padding + 1.5 * 256 * scaleFactor, scale: sizeOfIcons * 0.7 });
                    this.scrollView.addChild(sprite);
                    goalLabel1.setPosition(1.5*padding + 256 * scaleFactor + sizeOfIcons * 256, bottomRightCornerY + padding + 1.5 * 256 * scaleFactor);
                }
                else {
                    goalLabel1.setPosition(1.5*padding + 256 * scaleFactor, bottomRightCornerY + padding + 1.5 * 256 * scaleFactor);
                }
                goalLabel1.setColor(cc.color(0, 0, 0));
                goalLabel1.setAnchorPoint(0, 0.5);
                this.scrollView.addChild(goalLabel1);
                if (levelsAdditional[i][0] == 2) {//second goal
                    if (saveArray[i][2] == 1) {
                        var checkmark2 = new cc.Sprite(res.vote_true);
                    }
                    else {
                        var checkmark2 = new cc.Sprite(res.vote_false);
                    }
                    checkmark2.scale = scaleFactor;
                    checkmark2.setAnchorPoint(0, 0);
                    checkmark2.setPosition(padding, bottomRightCornerY + padding/2);
                    this.scrollView.addChild(checkmark2);
                    var goalLabel2 = new cc.LabelTTF(levelsAdditional[i][9], res.font, this.winsize.height / 40);
                    if (levelsAdditional[i][7] > 0) { //mit chains 
                        var sprite = new cc.Sprite.create("res/" + levelsAdditional[i][7] + ".png");
                        sprite.setAnchorPoint(0, 0.5);
                        sprite.attr({ x: 1.5*padding + 256 * scaleFactor, y: bottomRightCornerY + padding/2 + 0.5 * 256 * scaleFactor, scale: sizeOfIcons * 0.7 });
                        this.scrollView.addChild(sprite);
                        goalLabel2.setPosition(1.5*padding + 256 * scaleFactor + sizeOfIcons * 256, bottomRightCornerY + padding/2 + 0.5 * 256 * scaleFactor);
                    }
                    else {
                        goalLabel2.setPosition(1.5*padding + 256 * scaleFactor, bottomRightCornerY + padding/2 + 0.5 * 256 * scaleFactor);
                    }
                    goalLabel2.setColor(cc.color(0, 0, 0));
                    goalLabel2.setAnchorPoint(0, 0.5);
                    this.scrollView.addChild(goalLabel2);
                }
                if(i<JSON.parse(cc.sys.localStorage.getItem(201))-1){
                    var rankLabel = new cc.LabelTTF(ranks[this.getRank(i)], res.font, this.winsize.height / 30);
                }
                else{
                    var rankLabel = new cc.LabelTTF("NOT finished. SAD!", res.font, this.winsize.height / 30);
                }
                rankLabel.setColor(cc.color(150, 0, 0));
                rankLabel.setAnchorPoint(1, 0.5);
                rankLabel.setPosition(this.winsize.width - padding, bottomRightCornerY + ((this.winsize.height - (3*padding)) / 6));
                this.scrollView.addChild(rankLabel);
                this.startLabel = new cc.LabelTTF("Play", res.font, this.winsize.height / 14);
                this.startLabel.setColor(cc.color(0, 0, 0));//black color
                this.startLabelP = new cc.LabelTTF("Play", res.font, this.winsize.height / 14);
                this.startLabelP.setColor(cc.color(0, 0, 150));
                var startItemLabel = new cc.MenuItemSprite(
                    this.startLabel,
                    this.startLabelP,
                    null, ((function () { return function (i) { levelSelector_copy.startLevel(i.getTag()) } })()));
                startItemLabel.setAnchorPoint(1, 0);
                startItemLabel.setTag(i + 1);
                var startButton = new cc.Menu(startItemLabel);
                startButton.setPosition(cc.p(this.winsize.width - padding, bottomRightCornerY + padding/2));
                this.scrollView.addChild(startButton);
            }
            else {//level noch nicht freigeschaltet
                if (cc.sys.localStorage.getItem(201) == i) {//erste nachher
                    var tweet = new cc.LabelTTF(levelTweets[i], res.font, this.winsize.height / 50, cc.size(this.winsize.width / 3 * 2.3, (this.winsize.height - (3*padding)) / (3 * 2)), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_ALIGNMENT_TOP);
                    tweet.setColor(cc.color(199, 200, 201));
                    tweet.setAnchorPoint(0, 1);//topleft
                    tweet.setPosition(padding, topleftCornerY - padding/2);
                    this.scrollView.addChild(tweet);
                    var questionLabel = new cc.LabelTTF("?", res.font, this.winsize.height / 10);
                    questionLabel.setColor(cc.color(199, 200, 201));
                    questionLabel.setAnchorPoint(0.5, 0.5);
                    questionLabel.setPosition(cc.p(this.winsize.width / 2, bottomRightCornerY + ((this.winsize.height - (3*padding)) / 10)));
                    this.scrollView.addChild(questionLabel);
                }
                else {
                    var questionLabel = new cc.LabelTTF("?", res.font, this.winsize.height / 4);
                    questionLabel.setColor(cc.color(199, 200, 201));
                    questionLabel.setAnchorPoint(0.5, 0.5);
                    questionLabel.setPosition(cc.p(this.winsize.width / 2, bottomRightCornerY + ((this.winsize.height - (3*padding)) / 6)));
                    this.scrollView.addChild(questionLabel);
                }
            }
        }
                                    cc.log(Date.now()-time +  "ms loading time");
    },
    getRank: function (levelNum) {
        var saveArray = JSON.parse(cc.sys.localStorage.getItem(209));
        if( saveArray[levelNum][0]>= levelsAdditional[levelNum][3]){//höchster rank
            return 2;
        }
        else if(saveArray[levelNum][0] >= levelsAdditional[levelNum][2]){//mittlere Rank
            return 1;
        }
        else return 0;
    },
    startLevel: function (levelNum) {
        cc.log(levelNum);
        cc.sys.localStorage.setItem(251, levelNum);
        cc.director.runScene(/*new levelSelectorScene()*/new PlayScene());
    },
    onBack: function () {
        cc.director.resume();
        cc.director.runScene(/*new levelSelectorScene()*/new menuScene());
    },
    onstats: function () {
        cc.director.runScene(/*new levelSelectorScene()*/new statsScene()); //statsscene
    }
});
