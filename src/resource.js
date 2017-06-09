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
var startUpMessages = [ "„Why is Obama playing basketball today? That is why our country is in trouble!“\n6 Nov 2012\n~D. J. Trump",
                        "„An 'extremely credible source' has called my office and told me that @BarackObama's birth certificate is a fraud.“\n6 Aug 2012\n~D. J. Trump",
                        "„Sorry losers and haters, but my I.Q. is one of the highest -and you all know it! Please don't feel so stupid or insecure, it's not your fault“\n9 May 2013\n~D. J. Trump",
                        "„Happy New Year to all, including to my many enemies and those who have fought me and lost so badly they just don't know what to do. Love!“\n31 Dec 2016\n~D. J. Trump",
                        "„Any negative polls are fake news, just like the CNN, ABC, NBC polls in the election. Sorry, people want border security and extreme vetting.“\n6 Feb 2017\n~D. J. Trump",
                        "„If Obama resigns from office NOW, thereby doing a great service to the country—I will give him free lifetime golf at any one of my courses!“\n10 Sep 2014\n~D. J. Trump",
                        "„It's freezing and snowing in New York--we need global warming!“\n7 Nov 2012\n~D. J. Trump",
                        "„Russian leaders are publicly celebrating Obama's reelection.  They can't wait to see how flexible Obama will be now.“\n8 Nov 2012\n~D. J. Trump",
                        "„Jackie Evancho's album sales have skyrocketed after announcing her Inauguration performance.Some people just don't understand the \"Movement\"“\n4 Jan 2017\n~D. J. Trump",
                        "„The FAKE NEWS media (failing @nytimes, @NBCNews, @ABC, @CBS, @CNN) is not my enemy, it is the enemy of the American People!“\n17 Feb 2017\n~D. J. Trump",
                        "„Hillary Clinton should have been prosecuted and should be in jail. Instead she is running for president in what looks like a rigged election“\n15 Oct 2016\n~D. J. Trump",
                        "„I refuse to call Megyn Kelly a bimbo, because that would not be politically correct. Instead I will only call her a lightweight reporter!“\n27 Jan 2016\n~D. J. Trump",
                        "„Meryl Streep, one of the most over-rated actresses in Hollywood, doesn't know me but attacked last night at the Golden Globes. She is a.....“\n9 Jan 2017\n~D. J. Trump"
                        ];
var levelTweets = ["„It all begins today! I will see you at 11:00 A.M. for the swearing-in. THE MOVEMENT CONTINUES - THE WORK BEGINS!“\n20. Jan. 2017\n~D. J. Trump",
                        "„Signing orders to move forward with the construction of the Keystone XL and Dakota Access pipelines in the Oval Office.“\n24 Jan 2017\n~D. J. Trump",
                        "„I will be asking for a major investigation into VOTER FRAUD, including those registered to vote in two states, those who are illegal and....“\n25 Jan 2017\n~D. J. Trump",
                        "„Congratulations to @FoxNews for being number one in inauguration ratings. They were many times higher than FAKE NEWS @CNN - public is smart!“\n25 Jan 2017\n~D. J. Trump",
                        "„If the ban were announced with a one week notice, the \"bad\" would rush into our country during that week. A lot of bad \"dudes\" out there!“\n30 Jan 2017\n~D. J. Trump",
                        "„Yes, Arnold Schwarzenegger did a really bad job as Governor of California and even worse on the Apprentice...but at least he tried hard!“\n3 Feb 2017\n~D. J. Trump",
                        "„The opinion of this so-called judge, which essentially takes law-enforcement away from our country, is ridiculous and will be overturned!“\n4 Feb 2017\n~D. J. Trump",
                        "„I call my own shots, largely based on an accumulation of data, and everyone knows it. Some FAKE NEWS media, in order to marginalize, lies!“\n6 Feb 2017\n~D. J. Trump",
                        "„I don't know Putin, have no deals in Russia, and the haters are going crazy - yet Obama can make a deal with Iran, #1 in terror, no problem!“\n7 Feb 2017\n~D. J. Trump",
                        "„SEE YOU IN COURT, THE SECURITY OF OUR NATION IS AT STAKE!“\n10 Feb 2017\n~D. J. Trump",
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
                   [[0, 1, 1, 1, 1, 1, 1, 1, 0],   
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0, 1, 1, 1, 0],
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]],
                    //level 3
                   [[0, 0, 1, 1, 1, 1, 1, 0, 0],   
                    [0, 0, 1, 1, 1, 1, 1, 0, 0],
                    [0, 0, 1, 1, 1, 1, 1, 0, 0],
                    [0, 0, 1, 1, 1, 1, 1, 0, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]],
                    //level 4
                   [[0, 0, 0, 1, 1, 1, 0, 0, 0],   
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 1, 1, 1, 1, 1, 0, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]],
                    //level 5
                   [[0, 0, 1, 1, 1, 1, 1, 1, 0],   
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 1, 1, 1, 1, 1, 0, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 0, 1, 1, 1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]],
                    //level 6
                   [[0, 1, 1, 0, 0, 0, 1, 1, 0],   
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 1, 1, 1, 0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0, 1, 1, 1, 0],
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]],
                    //level 7
                   [[0, 1, 1, 1, 0, 1, 1, 1, 0],   
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0, 1, 1, 1, 0],
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]],
                    //level 8
                   [[0, 1, 1, 1, 1, 1, 1, 1, 0],   
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 0, 1, 1, 1, 1, 1, 0, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 1, 1, 1, 1, 1, 0, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]],
                    //level 9
                   [[0, 1, 1, 0, 0, 0, 1, 1, 0],   
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 1, 1, 1, 0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0, 1, 1, 1, 0],
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]],
                    //level 10
                   [[0, 1, 1, 0, 0, 0, 1, 1, 0],   
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 1, 1, 1, 0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0, 1, 1, 1, 0],
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]]
                    ];
    //levelsAdditional [numOfGoals,pointsForRank3,pointsForRank2,pointsForRank1,type1Goal,amoutOftype1Chains,goal1String,type2Goal,amoutOftype2Chains,goal2String,movesAvailable]
    //types: 
    // 1: iluminati
    // 2: fake news
    // 3: putin
    // 4: executive Order
    // 5: red tie
    // 6: tweets
var levelsAdditional = [
    [2, 2000, 4000, 6000, 3, 1,"(1) russian influence", 4, 1,"(1) executive order",20],
    [1, 2000, 4000, 6000, 4, 3,"(3) executive order", 0, 0,"",15], //[1, 2000, 4000, 6000, 0, 0,"Score (2000) points", 0, 0,"",20],
    [1, 2000, 4000, 6000, 1, 3,"(3) exactly :-)", 0, 0,"",15],
    [2, 2000, 4000, 6000, 2, 2,"(2) accusation", 6, 2,"(2) angry tweet",20],
    [2, 2000, 4000, 6000, 4, 3,"(3) bany bany mc bany", 5, 1,"(1) steve's plan",25],
    [2, 2000, 4000, 6000, 6, 2,"(2) angry tweets", 5, 2,"(2) angry man",20],
    [2, 2000, 4000, 6000, 6, 3,"(3) toilet tweet", 4, 1,"(1) bany bany",20],
    [2, 2000, 4000, 6000, 5, 3,"(3) You're fired!", 2, 1,"(1) claim",20],
    [1, 2000, 4000, 6000, 3, 4,"(4) Il putinhio", 0, 0,"",30],
    [2, 2000, 4000, 6000, 6, 2,"(2) angry tweets", 5, 2,"(2) little hands?",20],
    //level 1-10 next lvl 11
    [1, 2000, 4000, 6000, 0, 0,"Score 2000 points", 0, 0,"",20]
    ];
var amountOfTiles = 6;

var ranks = ["Fantastic", "Tremendous", "YHUUGE"];
//gen Levels with pointscalc https://jsfiddle.net/sye41f83/
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}