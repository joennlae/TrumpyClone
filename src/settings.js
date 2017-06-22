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

        this.soundHelpLabel = new cc.LabelTTF("Sounds", res.font, this.winsize.height / 20);
        this.soundHelpLabel.setColor(cc.color(0, 0, 0));
        this.soundHelpLabel.setAnchorPoint(0, 0.5)
        this.soundHelpLabel.setPosition(cc.p(this.winsize.width / 2 + 20, this.winsize.height / 6 * 5));
        this.addChild(this.soundHelpLabel);

        var text = "Some sounds are random and are just for entertainment purposes. I want to thank you know who for saying such things.";
        this.messageLabel = new cc.LabelTTF(text, res.font,this.winsize.height/50, cc.size(this.winsize.width-40,this.winsize.height/6*3) ,cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this.messageLabel.setColor(cc.color(0,0,0));
        this.messageLabel.setAnchorPoint(0.5,0.5);
        this.messageLabel.setPosition(cc.p(this.winsize.width/2,this.winsize.height/2));
        this.addChild(this.messageLabel);

        //ads 
        this.voteTrueButtonAds = new cc.MenuItemSprite(new cc.Sprite(res.vote_true), new cc.Sprite(res.vote_true), this.ads, this);
        this.voteFalseButtonAds = new cc.MenuItemSprite(new cc.Sprite(res.vote_false), new cc.Sprite(res.vote_false), this.ads, this);
        this.voteTrueMenuAds = new cc.Menu(this.voteTrueButtonAds);
        this.voteTrueButtonAds.scale = scaleFactor;
        this.voteFalseMenuAds = new cc.Menu(this.voteFalseButtonAds);
        this.voteFalseButtonAds.scale = scaleFactor;
        this.voteFalseButtonAds.setAnchorPoint(1, 0.5);
        this.voteTrueButtonAds.setAnchorPoint(1, 0.5)
        this.voteTrueMenuAds.setPosition(cc.p(this.winsize.width / 2 - 20, this.winsize.height / 6 * 3));
        this.voteFalseMenuAds.setPosition(cc.p(this.winsize.width / 2 - 20, this.winsize.height / 6 * 3));
        this.voteTrueMenuAds.visible = false;
        this.voteFalseMenuAds.visible = false;
        this.addChild(this.voteTrueMenuAds);
        this.addChild(this.voteFalseMenuAds);

        if (JSON.parse(cc.sys.localStorage.getItem(401)) == 1) this.voteTrueMenuAds.visible = true;
        else this.voteFalseMenuAds.visible = true;

        this.AdsHelpLabel = new cc.LabelTTF("Ads", res.font, this.winsize.height / 20);
        this.AdsHelpLabel.setColor(cc.color(0, 0, 0));
        this.AdsHelpLabel.setAnchorPoint(0, 0.5)
        this.AdsHelpLabel.setPosition(cc.p(this.winsize.width / 2 + 20, this.winsize.height / 6 * 3));
        this.addChild(this.AdsHelpLabel);

        var text = "Remove ads form the app and with that support the developer. In App Purchase!";
        this.messageAdsLabel = new cc.LabelTTF(text, res.font,this.winsize.height/50, cc.size(this.winsize.width-40,this.winsize.height/6*1) ,cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this.messageAdsLabel.setColor(cc.color(0,0,0));
        this.messageAdsLabel.setAnchorPoint(0.5,0.5);
        this.messageAdsLabel.setPosition(cc.p(this.winsize.width/2,this.winsize.height/6*2));
        this.addChild(this.messageAdsLabel);
        //ads 
        sdkbox.IAP.setListener({
            onSuccess : function (product) {
                //Purchase success
                cc.log("Purchase successful: " + product.name);
                cc.sys.localStorage.setItem(401,1);
                sdkbox.PluginAdMob.hide("bottombanner");
                this.voteFalseMenuAds.visible = false;
                this.voteTrueMenuAds.visible = true;
            },
            onFailure : function (product, msg) {
                //Purchase failed
                //msg is the error message
                cc.log("Purchase failed: " + product.name + " error: " + msg);

            },
            onCanceled : function (product) {
                //Purchase was canceled by user
                cc.log("Purchase canceled: " + product.name);
            }
        });
        //
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
    ads: function(){
        if(cc.sys.localStorage.getItem(401)==0){
            sdkbox.IAP.purchase("remove_ads");
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
