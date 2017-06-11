var res = {
    font: "res/Quicksand-Light.ttf",
    vote_true: "res/vote_true.png",
    vote_false: "res/vote_false.png",
    forward: "res/forward.png"
};
if(cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_OSX){
    res.font = "Quicksand-Light";
}
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
                        //level 11
                        "„72% of refugees admitted into U.S. (2/3 -2/11) during COURT BREAKDOWN are from 7 countries: SYRIA, IRAQ, SOMALIA, IRAN, SUDAN, LIBYA & YEMEN“\n12 Feb 2017\n~D. J. Trump",
                        "„Just leaving Florida. Big crowds of enthusiastic supporters lining the road that the FAKE NEWS media refuses to mention. Very dishonest!“\n12 Feb 2017\n~D. J. Trump",
                        "„The real story here is why are there so many illegal leaks coming out of Washington? Will these leaks be happening as I deal on N.Korea etc?“\n14 Feb 2017\n~D. J. Trump",
                        "„Obamacare continues to fail. Humana to pull out in 2018. Will repeal, replace & save healthcare for ALL Americans.“\n14 Feb 2017\n~D. J. Trump",
                        "„The fake news media is going crazy with their conspiracy theories and blind hatred. @MSNBC & @CNN are unwatchable. @foxandfriends is great!“\n15 Feb 2017\n~D. J. Trump",
                        "„The real scandal here is that classified information is illegally given out by \"intelligence\" like candy. Very un-American!“\n15 Feb 2017\n~D. J. Trump",
                        "„Leaking, and even illegal classified leaking, has been a big problem in Washington for years. Failing @nytimes (and others) must apologize!“\n16 Feb 2017\n~D. J. Trump",
                        "„The Democrats had to come up with a story as to why they lost the election, and so badly (306), so they made up a story - RUSSIA. Fake news!“\n16 Feb 2017\n~D. J. Trump",
                        "„The FAKE NEWS media (failing @nytimes, @NBCNews, @ABC, @CBS, @CNN) is not my enemy, it is the enemy of the American People!“\n17 Feb 2017\n~D. J. Trump",
                        "„Don't believe the main stream (fake news) media.The White House is running VERY WELL. I inherited a MESS and am in the process of fixing it.“\n18 Feb 2017\n~D. J. Trump",
                        //level 21
                        "„My statement as to what's happening in Sweden was in reference to a story that was broadcast on @FoxNews concerning immigrants & Sweden.“\n19 Feb 2017\n~D. J. Trump",
                        "„The so-called angry crowds in home districts of some Republicans are actually, in numerous cases, planned out by liberal activists. Sad!“\n22 Feb 2017\n~D. J. Trump",
                        "„The FBI is totally unable to stop the national security \"leakers\" that have permeated our government for a long time. They can't even......“\n24 Feb 2017\n~D. J. Trump",
                        "„Terrible! Just found out that Obama had my \"wires tapped\" in Trump Tower just before the victory. Nothing found. This is McCarthyism!“\n4 Mar 2017\n~D. J. Trump",
                        "„Is it legal for a sitting President to be \"wire tapping\" a race for president prior to an election? Turned down by court earlier. A NEW LOW!“\n4 Mar 2017\n~D. J. Trump",
                        "„How low has President Obama gone to tapp my phones during the very sacred election process. This is Nixon/Watergate. Bad (or sick) guy!“\n4 Mar 2017\n~D. J. Trump",
                        "„Our wonderful new Healthcare Bill is now out for review and negotiation. ObamaCare is a complete and total disaster - is imploding fast!“\n7 Mar 2017\n~D. J. Trump",
                        "„Don't worry, getting rid of state lines, which will promote competition, will be in phase 2 & 3 of healthcare rollout. @foxandfriends“\n7 Mar 2017\n~D. J. Trump",
                        "„Don't let the FAKE NEWS tell you that there is big infighting in the Trump Admin. We are getting along great, and getting major things done!“\n7 Mar 2017\n~D. J. Trump",
                        "„ObamaCare is imploding. It is a disaster and 2017 will be the worst year yet, by far! Republicans will come together and save the day.“\n13 Mar 2017\n~D. J. Trump",
                        //level 31
                        "„Can you imagine what the outcry would be if @SnoopDogg, failing career and all, had aimed and fired the gun at President Obama? Jail time!“\n15 Mar 2017\n~D. J. Trump",
                        "„Just heard Fake News CNN is doing polls again despite the fact that their election polls were a WAY OFF disaster. Much higher ratings at Fox“\n20 Mar 2017\n~D. J. Trump",
                        "„After seven horrible years of ObamaCare (skyrocketing premiums & deductibles, bad healthcare), this is finally your chance for a great plan!“\n24 Mar 2017\n~D. J. Trump",
                        "„The Freedom Caucus will hurt the entire Republican agenda if they don't get on the team, & fast. We must fight them, & Dems, in 2018!“\n30 Mar 2017\n~D. J. Trump",
                        "„The failing @nytimes has disgraced the media world. Gotten me wrong for two solid years. Change libel laws?“\n30 Mar 2017\n~D. J. Trump",
                        "„Mike Flynn should ask for immunity in that this is a witch hunt (excuse for big election loss), by media & Dems, of historic proportion!“\n31 Mar 2017\n~D. J. Trump",
                        "„The real story turns out to be SURVEILLANCE and LEAKING! Find the leakers.“\n2 Apr 2017\n~D. J. Trump",
                        "„Did Hillary Clinton ever apologize for receiving the answers to the debate? Just asking!“\n3 Apr 2017\n~D. J. Trump",
                        "„I explained to the President of China that a trade deal with the U.S. will be far better for them if they solve the North Korean problem!“\n11 Apr 2017\n~D. J. Trump",
                        "„I did what was an almost an impossible thing to do for a Republican-easily won the Electoral College! Now Tax Returns are brought up again?“\n16 Apr 2017\n~D. J. Trump",
                        //level 41
                        "„Someone should look into who paid for the small organized rallies yesterday. The election is over!“\n16 Apr 2017\n~D. J. Trump",
                        "„TRUMP APPROVAL HITS 50%“\n18 Apr 2017\n~D. J. Trump",
                        "„Next Saturday night I will be holding a BIG rally in Pennsylvania. Look forward to it!“\n22 Apr 2017\n~D. J. Trump",
                        "„Eventually, but at a later date so we can get started early, Mexico will be paying, in some form, for the badly needed border wall.“\n23 Apr 2017\n~D. J. Trump",
                        "„New polls out today are very good considering that much of the media is FAKE and almost always negative. Would still beat Hillary in .....“\n23 Apr 2017\n~D. J. Trump",
                        "„Today, I signed an Executive Order on Enforcing Statutory Prohibitions on Federal Control of Education.“\n26 Apr 2017\n~D. J. Trump",
                        "„FBI Director Comey was the best thing that ever happened to Hillary Clinton in that he gave her a free pass for many bad deeds! The phony...“\n3 May 2017\n~D. J. Trump",
                        "„Congratulations to @foxandfriends on its unbelievable ratings hike.“\n4 May 2017\n~D. J. Trump",
                        "„Insurance companies are fleeing ObamaCare - it is dead. Our healthcare plan will lower premiums & deductibles - and be great healthcare!“\n4 May 2017\n~D. J. Trump",
                        "„Of course the Australians have better healthcare than we do --everybody does. ObamaCare is dead! But our healthcare will soon be great.“\n5 May 2017\n~D. J. Trump",
                        //level 51
                        "„The Russia-Trump collusion story is a total hoax, when will this taxpayer funded charade end?“\n9 May 2017\n~D. J. Trump",
                        "„James Comey will be replaced by someone who will do a far better job, bringing back the spirit and prestige of the FBI.“\n10 May 2017\n~D. J. Trump",
                        "„Russia must be laughing up their sleeves watching as the U.S. tears itself apart over a Democrat EXCUSE for losing the election.“\n11 May 2017\n~D. J. Trump",
                        "„Again, the story that there was collusion between the Russians & Trump campaign was fabricated by Dems as an excuse for losing the election.“\n12 May 2017\n~D. J. Trump",
                        "„James Comey better hope that there are no \"tapes\" of our conversations before he starts leaking to the press!“\n12 May 2017\n~D. J. Trump",
                        "„As President I wanted to share with Russia (at an openly scheduled W.H. meeting) which I have the absolute right to do, facts pertaining....“\n16 May 2017\n~D. J. Trump",
                        "„This is the single greatest witch hunt of a politician in American history!“\n18 May 2017\n~D. J. Trump",
                        "„I will make my final decision on the Paris Accord next week!“\n27 May 2017\n~D. J. Trump",
                        "„Despite the constant negative press covfefe“\n30 May 2017\n~D. J. Trump",
                        "„Who can figure out the true meaning of \"covfefe\" ??? Enjoy!“\n31 May 2017\n~D. J. Trump",
                        //level 61
                        "„That's right, we need a TRAVEL BAN for certain DANGEROUS countries, not some politically correct term that won't help us protect our people!“\n6 Jun 2017\n~D. J. Trump",
                        "„Despite so many false statements and lies, total and complete vindication...and WOW, Comey is a leaker!“\n9 Jun 2017\n~D. J. Trump"
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
var amountOfLevels = levelsAdditional.length;
var ranks = ["Fantastic", "Tremendous", "YHUUGE"];
//gen Levels with pointscalc https://jsfiddle.net/sye41f83/
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
