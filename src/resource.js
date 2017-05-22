var res = {
    font: "res/Quicksand-Light.ttf",
    vote_true: "res/vote_true.png",
    vote_false: "res/vote_false.png",
    forward: "res/forward.png"
};
var posNumbers = [0.5,3,-1,1];
var soundsMenu = 16;
var soundsAfterLevelLosing = 4;
var soundsAfterLevelWinning = 3;
var soundsCombos = 2;
var soundsWrongMoves = 2;
var soundsNoAction = 5;
var startUpMessagesold = ["Are you ready!", "Il presidente", "Pizza?", "That's what he said", "classic", "Bro?", "Really?", "Gl hf", "Enjoy!", "Have a nice Day!"];
var startUpMessages = ["„I have never seen a thin person drinking Diet Coke.“\n14 Oct 2012\n~D. J. Trump",
                        "„Why is Obama playing basketball today? That is why our country is in trouble!“\n6 Nov 2012\n~D. J. Trump",
                        "„Amazing how the haters & losers keep tweeting the name “F**kface Von Clownstick” like they areso original & like no one else is doing it...“\n3 May 2013\n~D. J. Trump",
                        "„Windmills are the greatest threat in the US to both bald and golden eagles. Media claims fictional ‘global warming’ is worse.“\n9 Sep 2014\n~D. J. Trump",
                        "„It’s amazing that people can say such bad things about me but if I say bad things about them, it becomes a national incident.“\n9 Jan 2013\n~D. J. Trump",
                        "„When somebody challenges you unfairly, fight back - be brutal, be tough - don't take it. It is always important to WIN!“\n27 Jun 2015\n~D. J. Trump",
                        "„It makes me feel so good to hit \"sleazebags\" back -- much better than seeing a psychiatrist (which I never have!)“\n19 Nov 2012\n~D. J. Trump",
                        "„Massive combined inoculations to small children is the cause for big increase in autism....“\n23 Aug 2012\n~D. J. Trump",
                        "„An 'extremely credible source' has called my office and told me that @BarackObama's birth certificate is a fraud.“\n6 Aug 2012\n~D. J. Trump",
                        "„Sorry losers and haters, but my I.Q. is one of the highest -and you all know it! Please don't feel so stupid or insecure, it's not your fault“\n9 May 2013\n~D. J. Trump",
                        ];
var levelTweets = ["„It all begins today! I will see you at 11:00 A.M. for the swearing-in. THE MOVEMENT CONTINUES - THE WORK BEGINS!“\n20. Jan. 2017\n~D. J. Trump",
                        "„Why is Obama playing basketball today? That is why our country is in trouble!“\n6 Nov 2012\n~D. J. Trump",
                        "„Amazing how the haters & losers keep tweeting the name “F**kface Von Clownstick” like they areso original & like no one else is doing it...“\n3 May 2013\n~D. J. Trump",
                        "„Windmills are the greatest threat in the US to both bald and golden eagles. Media claims fictional ‘global warming’ is worse.“\n10:19 PM - 9 Sep 2014\n~D. J. Trump",
                        "„It’s amazing that people can say suchbad things about me but if I say bad things about them, it becomes a national incident.“\n9:24 PM - 9 Jan 2013\n~D. J. Trump",
                        "„When somebody challenges you unfairly,fight back - be brutal, be tough - don't take it. It is always important to WIN!“\n4:50 PM - 27 Jun 2015\n~D. J. Trump",
                        "„It makes me feel so good to hit \"sleazebags\" back -- much better than seeing a psychiatrist (which I never have!)“\n5:06 PM - 19 Nov 2012\n~D. J. Trump",
                        "„Massive combined inoculations tosmall children is the cause for big increase in autism....“\n9:22 PM - 23 Aug 2012\n~D. J. Trump",
                        "„An 'extremely credible source' has called my office and told me that @BarackObama's birth certificate is a fraud.“\n10:23 PM - 6 Aug 2012\n~D. J. Trump",
                        "„Sorry losers and haters, but my I.Q. is one of the highest -and you all know it! Please don't feel so stupid or insecure, it's not your fault“\n3:37 AM - 9 May 2013\n~D. J. Trump",
                        ];
var levelsArray = [
                    //level 1
                   [[0, 1, 1, 1, 1, 1, 1, 1, 0],   
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]],
                    //level 2
                   [[1, 1, 1, 1, 1, 1, 1, 1, 1],   
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1]],
                    //level 3
                   [[1, 1, 1, 1, 1, 1, 1, 1, 1],   
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1]]
                    
                    ];
    //levelsAdditional [numOfGoals,pointsForRank3,pointsForRank2,pointsForRank1,type1Goal,amoutOftype1Chains,goal1String,type2Goal,amoutOftype2Chains,goal2String,movesAvailable]
var levelsAdditional = [
    [2, 2000, 4000, 6000, 3, 1,"(1) russian influence", 4, 1,"(1) executive order",20],
    [1, 2000, 4000, 6000, 0, 0,"Score (2000) points", 0, 0,"",20],
    [1, 2000, 4000, 6000, 0, 0,"Score 2000 points", 0, 0,"",20],
    [1, 2000, 4000, 6000, 0, 0,"Score 2000 points", 0, 0,"",20],
    [1, 2000, 4000, 6000, 0, 0,"Score 2000 points", 0, 0,"",20],
    [1, 2000, 4000, 6000, 0, 0,"Score 2000 points", 0, 0,"",20],
    [1, 2000, 4000, 6000, 0, 0,"Score 2000 points", 0, 0,"",20],
    [1, 2000, 4000, 6000, 0, 0,"Score 2000 points", 0, 0,"",20],
    [1, 2000, 4000, 6000, 0, 0,"Score 2000 points", 0, 0,"",20],
    [1, 2000, 4000, 6000, 0, 0,"Score 2000 points", 0, 0,"",20],
    [1, 2000, 4000, 6000, 0, 0,"Score 2000 points", 0, 0,"",20]
    ];
var amountOfTiles = 6;

var ranks = ["Fantastic", "Tremendous", "YHUUGE"];
//gen Levels with pointscalc https://jsfiddle.net/sye41f83/
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}