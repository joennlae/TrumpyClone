var levelSelectorScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new levelSelector();
        this.addChild(layer);
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
        var background = new cc.LayerColor(cc.color(255, 255, 255, 255), this.winsize.width, this.winsize.height);
        this.addChild(background);
        this.scrollView = new ccui.ScrollView();
        this.scrollView.setInnerContainerSize(cc.size(this.winsize.width, this.winsize.height * levelsAdditional.length/3 + this.winsize.height/3));
        this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.scrollView.setContentSize(cc.size(this.winsize.width, this.winsize.height));
        this.scrollView.setScrollBarEnabled(false);
        this.scrollView.setAnchorPoint(cc.p(0.5, 0.5));
        this.scrollView.setPosition(cc.p(this.winsize.width / 2, this.winsize.height / 2));
        this.addChild(this.scrollView, 0, 1);
        //back label
        this.backLabel = new cc.LabelTTF("Back", "res/Quicksand-Light.ttf", this.winsize.height / 20);
        this.backLabel.setColor(cc.color(0, 0, 0));//black color
        this.backLabelP = new cc.LabelTTF("Back", "res/Quicksand-Light.ttf", this.winsize.height / 20);
        this.backLabelP.setColor(cc.color(0, 0, 150));

        var backItemLabel = new cc.MenuItemSprite(
            this.backLabel,
            this.backLabelP,
            this.onBack, this);
        backItemLabel.setAnchorPoint(0, 1);
        var backMenu = new cc.Menu(backItemLabel);
        backMenu.setPosition(cc.p(25, this.winsize.height - 20));
        this.addChild(backMenu, 5, 2);
        this.statsLabel = new cc.LabelTTF("Stats", "res/Quicksand-Light.ttf", this.winsize.height / 20);
        this.statsLabel.setColor(cc.color(0, 0, 0));//black color
        this.statsLabelP = new cc.LabelTTF("Stats", "res/Quicksand-Light.ttf", this.winsize.height / 20);
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
        for (var i = 0; i < levelsAdditional.length; i++) {
            var topleftCornerY = this.scrollView.getInnerContainerSize().height - ((i * ((this.winsize.height - (120)) / 3) + this.winsize.height / 20 + 30 + i * 40));
            var bottomRightCornerY = this.scrollView.getInnerContainerSize().height - ((i + 1) * ((this.winsize.height - (120)) / 3) + this.winsize.height / 20 + 30 + i * 40);
            //dn.drawRect(cc.p(20, topleftCornerY), cc.p(this.scrollView.getInnerContainerSize().width - 20, bottomRightCornerY), cc.color(0, 0, 0, 0), 2, cc.color(0, 0, 0, 255));
            dn.drawRect(cc.p(this.winsize.width / 6, bottomRightCornerY + 2), cc.p(this.winsize.width / 6 * 5, bottomRightCornerY), cc.color(0, 0, 0, 0), 2, cc.color(0, 0, 0, 255));
            if (JSON.parse(cc.sys.localStorage.getItem(201)) > i) {
                var levelNum = new cc.LabelTTF(i + 1, "res/Quicksand-Light.ttf", this.winsize.height / 12);
                levelNum.setColor(cc.color(50, 50, 50));
                levelNum.setAnchorPoint(1, 1);
                levelNum.setPosition(this.winsize.width - 40, topleftCornerY - 20);
                this.scrollView.addChild(levelNum);
                var tweet = new cc.LabelTTF(levelTweets[i], "res/Quicksand-Light.ttf", this.winsize.height / 50, cc.size(this.winsize.width / 3 * 2.3, (this.winsize.height - (120)) / (3 * 2)), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_ALIGNMENT_TOP);
                tweet.setColor(cc.color(50, 50, 50));
                tweet.setAnchorPoint(0, 1);//topleft
                tweet.setPosition(40, topleftCornerY - 20);
                this.scrollView.addChild(tweet);
                if (saveArray[i][1] == 1) {
                    var checkmark1 = new cc.Sprite(res.vote_true);
                }
                else {
                    var checkmark1 = new cc.Sprite(res.vote_false);
                }
                checkmark1.scale = scaleFactor;
                checkmark1.setAnchorPoint(0, 0);
                checkmark1.setPosition(40, bottomRightCornerY + 40 + 256 * scaleFactor);
                this.scrollView.addChild(checkmark1);
                var goalLabel1 = new cc.LabelTTF(levelsAdditional[i][6], "res/Quicksand-Light.ttf", this.winsize.height / 40);
                if (levelsAdditional[i][4] > 0) { //mit chains 
                    var sprite = new cc.Sprite.create("res/" + levelsAdditional[i][4] + ".png");
                    sprite.setAnchorPoint(0, 0.5);
                    sprite.attr({ x: 60 + 256 * scaleFactor, y: bottomRightCornerY + 40 + 1.5 * 256 * scaleFactor, scale: sizeOfIcons * 0.7 });
                    this.scrollView.addChild(sprite);
                    goalLabel1.setPosition(60 + 256 * scaleFactor + sizeOfIcons * 256, bottomRightCornerY + 40 + 1.5 * 256 * scaleFactor);
                }
                else {
                    goalLabel1.setPosition(60 + 256 * scaleFactor, bottomRightCornerY + 40 + 1.5 * 256 * scaleFactor);
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
                    checkmark2.setPosition(40, bottomRightCornerY + 20);
                    this.scrollView.addChild(checkmark2);
                    var goalLabel2 = new cc.LabelTTF(levelsAdditional[i][9], "res/Quicksand-Light.ttf", this.winsize.height / 40);
                    if (levelsAdditional[i][7] > 0) { //mit chains 
                        var sprite = new cc.Sprite.create("res/" + levelsAdditional[i][7] + ".png");
                        sprite.setAnchorPoint(0, 0.5);
                        sprite.attr({ x: 60 + 256 * scaleFactor, y: bottomRightCornerY + 20 + 0.5 * 256 * scaleFactor, scale: sizeOfIcons * 0.7 });
                        this.scrollView.addChild(sprite);
                        goalLabel2.setPosition(60 + 256 * scaleFactor + sizeOfIcons * 256, bottomRightCornerY + 20 + 0.5 * 256 * scaleFactor);
                    }
                    else {
                        goalLabel2.setPosition(60 + 256 * scaleFactor, bottomRightCornerY + 20 + 0.5 * 256 * scaleFactor);
                    }
                    goalLabel2.setColor(cc.color(0, 0, 0));
                    goalLabel2.setAnchorPoint(0, 0.5);
                    this.scrollView.addChild(goalLabel2);
                }
                if(i<JSON.parse(cc.sys.localStorage.getItem(201))-1){
                    var rankLabel = new cc.LabelTTF(ranks[this.getRank(i)], "res/Quicksand-Light.ttf", this.winsize.height / 30);
                }
                else{
                    var rankLabel = new cc.LabelTTF("NOT finished. SAD!", "res/Quicksand-Light.ttf", this.winsize.height / 30);
                }
                rankLabel.setColor(cc.color(150, 0, 0));
                rankLabel.setAnchorPoint(1, 0.5);
                rankLabel.setPosition(this.winsize.width - 40, bottomRightCornerY + ((this.winsize.height - (120)) / 6));
                this.scrollView.addChild(rankLabel);
                this.startLabel = new cc.LabelTTF("Play", "res/Quicksand-Light.ttf", this.winsize.height / 14);
                this.startLabel.setColor(cc.color(0, 0, 0));//black color
                this.startLabelP = new cc.LabelTTF("Play", "res/Quicksand-Light.ttf", this.winsize.height / 14);
                this.startLabelP.setColor(cc.color(0, 0, 150));
                var startItemLabel = new cc.MenuItemSprite(
                    this.startLabel,
                    this.startLabelP,
                    null, ((function () { return function (i) { levelSelector_copy.startLevel(i.getTag()) } })()));
                startItemLabel.setAnchorPoint(1, 0);
                startItemLabel.setTag(i + 1);
                var startButton = new cc.Menu(startItemLabel);
                startButton.setPosition(cc.p(this.winsize.width - 40, bottomRightCornerY + 20));
                this.scrollView.addChild(startButton);
            }
            else {//level noch nicht freigeschaltet
                if (cc.sys.localStorage.getItem(201) == i) {//erste nachher
                    var tweet = new cc.LabelTTF(levelTweets[i], "res/Quicksand-Light.ttf", this.winsize.height / 50, cc.size(this.winsize.width / 3 * 2.3, (this.winsize.height - (120)) / (3 * 2)), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_ALIGNMENT_TOP);
                    tweet.setColor(cc.color(199, 200, 201));
                    tweet.setAnchorPoint(0, 1);//topleft
                    tweet.setPosition(40, topleftCornerY - 20);
                    this.scrollView.addChild(tweet);
                    var questionLabel = new cc.LabelTTF("?", "res/Quicksand-Light.ttf", this.winsize.height / 10);
                    questionLabel.setColor(cc.color(199, 200, 201));
                    questionLabel.setAnchorPoint(0.5, 0.5);
                    questionLabel.setPosition(cc.p(this.winsize.width / 2, bottomRightCornerY + ((this.winsize.height - (120)) / 10)));
                    this.scrollView.addChild(questionLabel);
                }
                else {
                    var questionLabel = new cc.LabelTTF("?", "res/Quicksand-Light.ttf", this.winsize.height / 4);
                    questionLabel.setColor(cc.color(199, 200, 201));
                    questionLabel.setAnchorPoint(0.5, 0.5);
                    questionLabel.setPosition(cc.p(this.winsize.width / 2, bottomRightCornerY + ((this.winsize.height - (120)) / 6)));
                    this.scrollView.addChild(questionLabel);
                }
            }
        }
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