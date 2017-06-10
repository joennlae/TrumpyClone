var menuLayer = cc.Layer.extend({
	winsize: null,
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function(){
 
        this._super();
        if(cc.sys.localStorage.getItem(220) == null){//first start
            cc.sys.localStorage.setItem(220,1); //first start
            cc.sys.localStorage.setItem(201,1); //level progress
            cc.sys.localStorage.setItem(301,1); //sounds on/off
            var statsArray = [];
            for(var i = 0; i<=amountOfTiles; i++){
                statsArray.push(0);
            }
            cc.sys.localStorage.setItem(210,JSON.stringify(statsArray)); //statistics array
            var saveArray = [];
            for(var i = 0; i < amountOfLevels; i++){
                var temp = [0,0,0];
                saveArray.push(temp);
            }
            cc.sys.localStorage.setItem(209,JSON.stringify(saveArray)); //saveArray
        }
        this.winsize = cc.director.getWinSize();
        cc.log("Resolution"+this.winsize.width/this.winsize.height+"Height:"+this.winsize.height+"   Width:"+this.winsize.width);
        var background = new cc.LayerColor(cc.color(255,255,255,255), this.winsize.width, this.winsize.height);
        this.addChild(background);
		//Ads
        sdkbox.PluginAdMob.init();
        sdkbox.PluginAdMob.cache("bottombanner");
        sdkbox.PluginAdMob.cache("gameover");
        sdkbox.PluginAdMob.cache("topbanner");
        sdkbox.PluginAdMob.show("bottombanner");
        //
		this.startLabel = new cc.LabelTTF("Play", "res/Quicksand-Light.ttf", this.winsize.height/4);
        this.startLabel.setColor(cc.color(0,0,0));//black color
        
		this.startLabelP = new cc.LabelTTF("Play", "res/Quicksand-Light.ttf", this.winsize.height/4);
        this.startLabelP.setColor(cc.color(0,0,150));//blue color
        
        this.betaLabel = new cc.LabelTTF("Beta", "res/Quicksand-Light.ttf", this.winsize.height/10);
        this.betaLabel.setColor(cc.color(0,0,0));//black color
        
        this.betaLabelP = new cc.LabelTTF("Beta", "res/Quicksand-Light.ttf", this.winsize.height/10);
        this.betaLabelP.setColor(cc.color(0,0,150));//blue color
        
        this.settingsLabel = new cc.LabelTTF("Settings", "res/Quicksand-Light.ttf", this.winsize.height/20);
        this.settingsLabel.setColor(cc.color(0,0,0));//black color
        
        this.settingsLabelP = new cc.LabelTTF("Settings", "res/Quicksand-Light.ttf", this.winsize.height/20);
        this.settingsLabelP.setColor(cc.color(0,0,150));//blue color
        
        this.aboutLabel = new cc.LabelTTF("About", "res/Quicksand-Light.ttf", this.winsize.height/20);
        this.aboutLabel.setColor(cc.color(0,0,0));//black color
        this.aboutLabelP = new cc.LabelTTF("About", "res/Quicksand-Light.ttf", this.winsize.height/20);
        this.aboutLabelP.setColor(cc.color(0,0,150));//blue color
        
        //this.messageLabel = new cc.LabelTTF(startUpMessages[Math.floor(Math.random()*(startUpMessages.length))], "res/Quicksand-Light.ttf", this.winsize.height/40);
        this.messageLabel = new cc.LabelTTF(startUpMessages[Math.floor(Math.random()*(startUpMessages.length))], "res/Quicksand-Light.ttf",this.winsize.height/50, cc.size(this.winsize.width-40,this.winsize.height/3) ,cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this.messageLabel.setColor(cc.color(0,0,0));
        this.messageLabel.setAnchorPoint(0.5,0.5);
        this.messageLabel.setPosition(cc.p(this.winsize.width/2,this.winsize.height/3*2.2));
        this.messageLabel.scale = 0.001;
        this.addChild(this.messageLabel,5);
        this.messageLabel.runAction(new cc.ScaleTo(1.5, 1));

        this.messageLabel2 = new cc.LabelTTF(startUpMessagesold[Math.floor(Math.random()*(startUpMessages.length))], "res/Quicksand-Light.ttf", this.winsize.height/25);
        this.messageLabel2.setColor(cc.color(150,0,0));
        this.messageLabel2.setPosition(cc.p(0,this.winsize.height/3*2));
        this.messageLabel2.setAnchorPoint(0.5,0.5);
        this.addChild(this.messageLabel2,55);
        this.messageLabel2.setRotation(posNumbers[Math.floor(Math.random()*2+2)]*Math.floor(Math.random()*45));
        this.messageLabel2.runAction(new cc.JumpTo(2, cc.p(this.winsize.width/3*2, this.winsize.height/3*1.8), 50, 3));

        var menuItemLabel = new cc.MenuItemSprite(
            this.startLabel,
            this.startLabelP, 
            this.onPlay, this);
        var menu = new cc.Menu(menuItemLabel);  
        menu.setPosition(cc.p(this.winsize.width / 2, this.winsize.height / 2));
        this.addChild(menu);

        /*var betaItemLabel = new cc.MenuItemSprite(
            this.betaLabel,
            this.betaLabelP, 
            this.onBeta, this);
        var betaMenu = new cc.Menu(betaItemLabel); 
        betaMenu.setPosition(cc.p(this.winsize.width/2,this.winsize.height/3));
        this.addChild(betaMenu);*/

        var settingsItemLabel = new cc.MenuItemSprite(
            this.settingsLabel,
            this.settingsLabelP, 
            this.onSettings, this);
        var settingsMenu = new cc.Menu(settingsItemLabel); 
        settingsMenu.setPosition(cc.p(this.winsize.width/4,this.winsize.height/6));
        this.addChild(settingsMenu);

        var aboutItemLabel = new cc.MenuItemSprite(
            this.aboutLabel,
            this.aboutLabelP, 
            this.onabout, this);
        var aboutMenu = new cc.Menu(aboutItemLabel); 
        aboutMenu.setPosition(cc.p(this.winsize.width/4*3,this.winsize.height/6));
        this.addChild(aboutMenu);
        
        //audio Eninge
        //if(cc.audioEngine.isMusicPlaying() == false){
        //cc.audioEngine.playMusic(res.sound, true);
        //if (cc.sys.localStorage.getItem(211)==2) cc.audioEngine.stopMusic();
        //}
        cc.director.getScheduler().scheduleCallbackForTarget(this, ((function () { return function () { this.audio() } })()), 10, 20, 0, false);
        

    },
    audio: function(){
        if(JSON.parse(cc.sys.localStorage.getItem(301))==1 && !cc.audioEngine.isMusicPlaying()){//sounds on
            cc.log("sound played");
            var random = Math.floor(Math.random()*soundsMenu);
            cc.audioEngine.stopAllEffects();
            cc.audioEngine.playEffect("res/"+random+".mp3");
        }
    },
    onPlay : function(){
        cc.director.runScene(new levelSelectorScene());
    },

    onBeta : function(){
        cc.director.runScene(new PlayScene());
    },
    onSettings : function(){
        cc.director.runScene(new settingsScene());
    },
    onabout : function(){
        cc.director.runScene(new aboutScene());
    },
    onExit:function() {
        this._super();
    }
});

var menuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new menuLayer();
        layer.init();
        this.addChild(layer);
    }
});