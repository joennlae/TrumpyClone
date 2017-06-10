var aboutLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        this.winsize = cc.director.getWinSize();
        this.init();
    },
    init: function(){
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
        //some info Labels
        var text = "\n\nInstructions\n\nYour target in this game is to swap the positions of the tiles so that at least 3 pieces of the same kind form a horizontal or vertical line and then be destroyed. To master a level you should also take care of the diffrent goals you will have.\n\nSome infos\n\n The tweets of you know who inspired me a lot. Not in a way that I would be on the same page with him more in a entertaining way. This app shouldn't be taken tooooo serious. Peace out :-)\n\n Ranks\n\n3. Fantastic\n2.Tremendous\n1.YHUUUGE\n\n\n Credits\n\n Icons made by:\nRoundicons\nMadebyoliver\nFreepik\nfrom www.flaticon.com ";
        this.messageLabel = new cc.LabelTTF(text, res.font,this.winsize.height/50, cc.size(this.winsize.width-40,this.winsize.height-40-this.winsize.height / 20) ,cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this.messageLabel.setColor(cc.color(0,0,0));
        this.messageLabel.setAnchorPoint(0.5,0.5);
        this.messageLabel.setPosition(cc.p(this.winsize.width/2,this.winsize.height/2));
        this.addChild(this.messageLabel);
    },
    onBack: function(){
        cc.director.runScene(new menuScene());
    }
});

var aboutScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new aboutLayer();
        this.addChild(layer);
    }
});
