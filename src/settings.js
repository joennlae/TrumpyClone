var settingsLayer = cc.Layer.extend({
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
        var scaleFactor = this.winsize.height / 2550;
        this.voteTrueButtonSound = new cc.MenuItemSprite(new cc.Sprite(res.vote_true), new cc.Sprite(res.vote_true), this.sound, this);
        this.voteFalseButtonSound = new cc.MenuItemSprite(new cc.Sprite(res.vote_false), new cc.Sprite(res.vote_false), this.sound, this);
        this.voteTrueMenuSound = new cc.Menu(this.voteTrueButtonSound);
        this.voteTrueButtonSound.scale = scaleFactor;
        this.voteFalseMenuSound = new cc.Menu(this.voteFalseButtonSound);
        this.voteFalseButtonSound.scale = scaleFactor;
        this.voteFalseButtonSound.setAnchorPoint(1, 0.5);
        this.voteTrueButtonSound.setAnchorPoint(1, 0.5)
        this.voteTrueMenuSound.setPosition(cc.p(this.winsize.width / 2 - 20, this.winsize.height / 6 * 5));
        this.voteFalseMenuSound.setPosition(cc.p(this.winsize.width / 2 - 20, this.winsize.height / 6 * 5));
        this.voteTrueMenuSound.visible = false;
        this.voteFalseMenuSound.visible = false;
        this.addChild(this.voteTrueMenuSound);
        this.addChild(this.voteFalseMenuSound);

        if (JSON.parse(cc.sys.localStorage.getItem(301)) == 1) this.voteTrueMenuSound.visible = true;
        else this.voteFalseMenuSound.visible = true;

        this.soundHelpLabel = new cc.LabelTTF("Sounds", "res/Quicksand-Light.ttf", this.winsize.height / 20);
        this.soundHelpLabel.setColor(cc.color(0, 0, 0));
        this.soundHelpLabel.setAnchorPoint(0, 0.5)
        this.soundHelpLabel.setPosition(cc.p(this.winsize.width / 2 + 20, this.winsize.height / 6 * 5));
        this.addChild(this.soundHelpLabel);

        var text = "Some sounds are random and are just for entertainment purposes. I want to thank you know who for saying such things.";
        this.messageLabel = new cc.LabelTTF(text, "res/Quicksand-Light.ttf",this.winsize.height/50, cc.size(this.winsize.width-40,this.winsize.height/6*3) ,cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this.messageLabel.setColor(cc.color(0,0,0));
        this.messageLabel.setAnchorPoint(0.5,0.5);
        this.messageLabel.setPosition(cc.p(this.winsize.width/2,this.winsize.height/2));
        this.addChild(this.messageLabel);
    },
    sound: function () {
        if (JSON.parse(cc.sys.localStorage.getItem(301)) == 1) {
            cc.sys.localStorage.setItem(301, 2);
            this.voteTrueMenuSound.visible = false;
            this.voteFalseMenuSound.visible = true;
            cc.audioEngine.stopAllEffects();
        }
        else if (JSON.parse(cc.sys.localStorage.getItem(301)) == 2) {
            cc.sys.localStorage.setItem(301, 1);
            this.voteTrueMenuSound.visible = true;
            this.voteFalseMenuSound.visible = false;
            cc.audioEngine.stopAllEffects();
            cc.audioEngine.playEffect("res/" + 0 + ".mp3");
        }
    },
    onBack: function () {
        cc.director.runScene(new menuScene());
    }
});

var settingsScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new settingsLayer();
        this.addChild(layer);
    }
});