var statsLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.winsize = cc.director.getWinSize();
        this.init();
    },
    init: function () {
        var background = new cc.LayerColor(cc.color(255, 255, 255, 255), this.winsize.width, this.winsize.height);
        this.addChild(background);
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

        var headerLabel = new cc.LabelTTF("Statistics", "res/Quicksand-Light.ttf", this.winsize.height / 15);
        headerLabel.setColor(cc.color(0, 0, 0));
        headerLabel.setAnchorPoint(0.5, 1);
        headerLabel.setPosition(this.winsize.width / 2, this.winsize.height - this.winsize.height / 20);
        this.addChild(headerLabel);
        var movesLabelText = new cc.LabelTTF("You have...", "res/Quicksand-Light.ttf", this.winsize.height / 30);
        movesLabelText.setColor(cc.color(0, 0, 0));
        movesLabelText.setAnchorPoint(0.5, 1);
        movesLabelText.setPosition(this.winsize.width / 2, this.winsize.height - this.winsize.height / 20 - this.winsize.height / 12);
        this.addChild(movesLabelText);
        var statsArray = JSON.parse(cc.sys.localStorage.getItem(210));
        var sizeOfIcons = 140 / 256 * this.winsize.width / 1440;
        var statsMessages = [["..spread ", " conspiracy theories"],
        ["..consumed ", " Fake News articles"],
        ["..been hacked ", " by the russians"],
        ["..signed ", " executive orders"],
        ["..collected ", " red ties"],
        ["..written ", " tweets"]
        ];
        for (var i = 1; i <= amountOfTiles; i++) {
            var sprite2 = new cc.Sprite.create("res/" + i + ".png");
            sprite2.setAnchorPoint(1, 0.5);
            sprite2.attr({ x: this.winsize.width - this.winsize.width / 20, y: this.winsize.height - this.winsize.height / 6 - i * this.winsize.height / 12, scale: sizeOfIcons });
            this.addChild(sprite2);
            var label = new cc.LabelTTF(statsMessages[i - 1][0] + statsArray[i] + statsMessages[i - 1][1], "res/Quicksand-Light.ttf", this.winsize.height / 40);
            label.setColor(cc.color(0, 0, 0));
            label.setAnchorPoint(0, 0.5);
            label.setPosition(this.winsize.width / 20, this.winsize.height - this.winsize.height / 6 - i * this.winsize.height / 12);
            this.addChild(label);
        }
        var label = new cc.LabelTTF("..collected over " + statsArray[0] + " chains in total", "res/Quicksand-Light.ttf", this.winsize.height / 40);
        label.setColor(cc.color(0, 0, 0));
        label.setAnchorPoint(0, 0.5);
        label.setPosition(this.winsize.width / 20, this.winsize.height - this.winsize.height / 6 - (amountOfTiles + 1) * this.winsize.height / 12);
        this.addChild(label);
    },
    onBack: function () {
        cc.director.runScene(new levelSelectorScene());
    }
});

var statsScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new statsLayer();
        this.addChild(layer);
    }
});