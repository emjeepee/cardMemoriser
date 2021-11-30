/*
Explanation
===========
the controller contains a certain amount of logic in the form of methods that
are members of the someObject property.
some Object also contains:
i)    an array that lists the 52 svgs that represent the cards of a deck
ii)   a load of other properties that generally have simple values
iii)



*/

//////////-----------//////////-----------//////////-----------//////////-------
import * as myModel from './Model' ;






var someObject = {

// All 52 cards in a pack, here needlessly jumbled up!!:
availableCards: [
    "start.svg",
    "cardC6.svg", "cardC7.svg", "cardC8.svg", "cardC9.svg", "cardC10.svg",
    "cardCJ.svg", "cardCQ.svg", "cardCK.svg", "cardD1.svg", "cardD2.svg",
    "cardC1.svg", "cardC2.svg", "cardC3.svg", "cardC4.svg", "cardC5.svg",
    "cardD8.svg", "cardD9.svg", "cardD10.svg", "cardDJ.svg", "cardDQ.svg",
    "cardH2.svg", "cardH3.svg", "cardH4.svg", "cardH5.svg", "cardH6.svg",
    "cardDK.svg", "cardS1.svg", "cardS2.svg", "cardS3.svg", "cardS4.svg",
    "cardS5.svg", "cardS6.svg", "cardS7.svg", "cardS8.svg", "cardS9.svg",
    "cardS10.svg", "cardSJ.svg", "cardSQ.svg", "cardSK.svg", "cardH1.svg",
    "cardD3.svg", "cardD4.svg", "cardD5.svg", "cardD6.svg", "cardD7.svg",
    "cardH7.svg", "cardH8.svg", "cardH9.svg", "cardH10.svg", "cardHJ.svg",
    "cardHQ.svg", "cardHK.svg", "endOfPack.svg"
                ] , // end array availableCards

// ----------- -------------- ------------- ------------ --------- ------//
showRecallArea: false,

secondsElapsed: 0,

minutes: 0,

seconds: 0,

usedCards: [] , //

playPack: [] ,

usedRandomNumbers: [] ,

aRandomNumber: null ,

numberOfClicks: 0, // shows how many times user has clicked "Next card" button

nextCardButtonText: "First card" ,

nextCard: "start.svg" , // the image that shows words "Cards appear here"

startTheTimer: false ,

timerButtonText: "Timer",

// ----------- -------------- ------------- ------------ --------- ------//

// The following method asks the Model for data about previous attempts. Code
// in <RecallArea> calls this function. This function calls a function in the
// Model:
demandForDataFromModel: function () {
return myModel.someObject.sendPrevAttemptDataToController()
                                    } , // end demandForDataFromModel


//The following method receives data from <RecallArea>
// and sends it to the model:
rxDataForModel: function (data) {
console.log("C here. have rxed: " + data)
    myModel.someObject.rxDataFromController(data)
                                }, // end rxDataForModel

// ----------- -------------- ------------- ------------ --------- ------//

// The following method comes from MDN and produces a random number
// between max and min inclusive:
getRandomIntInclusive: function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
                                            } , // end getRandomIntInclusive

// ----------- -------------- ------------- ------------ --------- ------//

// This method responds to the user's click of the "Reset" button:
reset: function () {
// Make a new shuffled deck and put it into array playPack, ready for function
// nextCardPlease:
this.createShuffledDeck()
this.usedCards          = []
this.numberOfClicks     = 0
this.nextCardButtonText = "First card"
this.nextCard           = "start.svg"
this.startTheTimer      = false
this.timerButtonText    = "Timer"
this.showRecallArea     = false
this.secondsElapsed     = 0
this.minutes            = 0
this.seconds            = 0

return [this.usedCards, this.numberOfClicks, this.nextCardButtonText,
        this.nextCard, this.startTheTimer, this.timerButtonText,
        this.showRecallArea, this.secondsElapsed, this.minutes, this.seconds ]
                   } , // end reset
// --------- --------- --------- --------- ---------- --------- -------- //


// This function responds to the user's click of the "Recall" button. It returns
// an array containing only the cards that the user has overturned from the play
// pack. We want the array it returns to look like this:
//
recall: function () {
// Remember fn "slice" selects elements from an array and returns them in a new
// array object. Remember that this.playPack includes 54 cards:
// ["start.svg", "cardC1.svg", "cardDQ.svg", etc , "endOfPack.svg"]:
return this.playPack.slice(0, this.numberOfClicks)
                    } , // end recall

// --------- --------- --------- --------- ---------- --------- -------- //

// Now fn createShuffledDeck to create a pack of shuffled cards and put it into
// array this.playPack:
createShuffledDeck: function () {
this.aRandomNumber = null ;
// Set the array playPack to empty:
this.playPack = [] ;
// Zero out array usedRandomNumbers:
this.usedRandomNumbers = [] ;
//
    do {
// Generate a random number between 1 and 52 (because array this.playPack
// contains as card at index 0 "start.svg", which must remain in that position.
// The next 52 cards, at indexes 1 to 52, must be shuffled).
// The card at index 53 is "endOfPack.svg":
this.aRandomNumber = this.getRandomIntInclusive( 1 , 52  )
// If the random number has not already been generated:
if (!this.usedRandomNumbers.includes(this.aRandomNumber)) {
// Push the (aRandomNumber)th card from this.availableCards into array playPack
this.playPack.push(this.availableCards[this.aRandomNumber])
// Put the just-created random number into the array of already used random
// numbers:
this.usedRandomNumbers.push(this.aRandomNumber)
// So at the end of this loop playPack looks like this, for example:
// ["cardH6.svg", "cardSQ.svg", … … … "cardD1.svg"]
                                                          } // end if
       } // end do
// Stop picking a random card from array availableCards when 52 random numbers
// have been generated:
    while (this.usedRandomNumbers.length < 52); // NOTE tricky! must be 52!!!!
// Push start.svg into the beginning of availableCards:
// Now add card "start.svg" to position index[0] and "endOfPack.svg" to the end
// (ie position index[53]) of playPack:
// NOTE: unshift() doesn't work properly in IE8 and earlier
this.playPack.push(this.availableCards[53])
this.playPack.unshift(this.availableCards[0])
// console.log(this.playPack)
    return this.playPack
// so this.playPack now includes 54 cards:
// ["start.svg", "cardC1.svg", /randomly selected cards here/ , "endOfPack.svg"]
                                  } , // end createShuffledDeck


// --------- --------- --------- --------- ---------- --------- -------- //
// Now a function to respond to the clicking of the "Next card" and "Back"
// buttons.
// Clicking "Next card" (or "First card" or "Last card" or "*****", it's the
// same button just the text varies) makes <App> call this fn, feeding it
// "true" as arg.
// Clicking "Back" button causes <App> to call this function, sending it "false"
// as argument.
// This function will:
// 1) start the stopwatch if it's the first click of the button (which will read
// "First card" before the user clicks for the first time)
// 2)
// i) user clicks "Next card" or "First card" or "Last card" (it's all the same
// button, just the text changes):
// select the next card from the shuffled deck in this.playPackpack
// and add that card to the used pile
// ii)  user clicks "Back":
// select the previous card from those already taken from top of pack or show
// "Cards appear here" text if the user has clicked back beyong the first card
// 3) change the text of the "Next card" button to either
// "First card", "Next card", "Last card" or "*******".
// 4) start the timer if this.startTheTimer = true

// This function simply returns an array of five members, the values of some of
// which change with every click of the "First card"/ "Next card"/ "Last card"/
// "*******" button or the "back" button.
// The <App>'s nextCardPlease function calls this function and sets a non-state
// property of the same name to each of the things that this
// function returns in this array (wtf does this mean?):
// i)   [ this.startTheTimer ,    // a boolean
// ii)  this.nextCard,            // text string indicating the next card
// iii) this.nextCardButtonText
// iv) this.numberOfClicks        // === 0 when the app starts up
// v)  this.timerButtonText  ]    // either "Start timer" or "Stop timer"
nextCardPlease: function  (forwardBackward) {
// There are mainly two if blocks, one for what to do when the user clicks "Next
// card", one for when the user clicks "Back"

// When the app starts up this.numberOfClicks === 0. NOTE change the name of
// NOTE this to "cardOrdinalNumber"

// 1st if block, dealing with user clicking "Back" button:
// Decrement the value of numberOfClicks down to minimum of 1:
if (!forwardBackward) {  // if user has clicked "Back" button:
this.numberOfClicks-- ;
if (this.numberOfClicks < 1) {
this.numberOfClicks = 1
                             } // end if numberOfClicks has gone below 0

// Change the text on the "Next card" button to read appropriately depending on
// the number of times the user has clcked it. Also change the card display area
// accordingly.
// There are three scenarios:
// i) the user has clicked "Back" so many times that the card-display area
// should read "Card appears here":
if (this.numberOfClicks === 0) {
this.nextCardButtonText = "First card"
this.nextCard = "start.svg"
                                } // end if

// ii) the user has clicked "Back" when the current card was ordinal 2 to 51:
if(this.numberOfClicks >0 && this.numberOfClicks <51) {
this.nextCardButtonText = "Next card"
                                                      } // end if

// iii) the user has clicked "Back" when the current card was ordinal 52:
// Change the text of the "Next card" button to "Last card":
if (this.numberOfClicks === 51) {
this.nextCardButtonText = "Last card"
                                 } // end if

// Remember this.Playpack contains a shuffled pack.
// Pick the appropriate card in the shuffled deck:
this.nextCard = this.playPack[(this.numberOfClicks -1)]

                       } // end if user has clicked "Back" button:

//-----

// 2nd if block, dealing with the user clicking "Next card"
if (forwardBackward) { // if user has clicked "Next card" button (whatever it
// actually reads):
this.numberOfClicks++ ;

// Remember that this.numberOfClicks now = ordinal number of the card to be
// shown.
// Only do anything if the user has clicked the "Next card" button < 53 times:
if (this.numberOfClicks < 53) { // closed far off

// First change the button text to a value that depends on how many times the
// user has clicked the button.
// -------- ------------- ----------- ------------ --------- ------------ ----//
// Remember that state.nextCardButtonText starts off as "First card".
// If the user has clicked for the first time change the text of the "Next card"
// button to "Next card". Also make a change that will start the timer in the
// <StopWatch> component:

if (this.numberOfClicks === 1) {
this.nextCardButtonText = "Next card"
this.timerButtonText = "Stop timer"
this.startTheTimer = true ;
                                } // end if

// If the user has clicked for the 51st time there is only one card left, so
// change the text of the "Next card" button to "Last card":
if (this.numberOfClicks === 51) {
this.nextCardButtonText = "Last card"
                                 } // end if

// If the user has clicked for the 52nd time there are no cards left, hence
// change the button text to "*******"
if (this.numberOfClicks === 52) {
this.nextCardButtonText = "********"
                                 } // end if

// We're still in function nextCardPlease
// Remember this.Playpack contains a shuffled pack.
// Pick the next card in the shuffled deck that this.playPack holds:
this.nextCard = this.playPack[(this.numberOfClicks -1)]
                                } // end if this.numberOfClicks < 53

// But if this.numberOfClicks > 52 show the card that says "End of pack":
if (this.numberOfClicks > 52) {
// Never let this.numberOfClicks go above 52
this.numberOfClicks = 53
this.nextCard = "endOfPack.svg"
                               } // end if this.numberOfClicks > 52

                    } // end if user has clicked "Next card" button

// Return stuff:
return [this.startTheTimer , this.nextCard, this.nextCardButtonText,
    this.numberOfClicks, this.timerButtonText, forwardBackward ]

                                        }  // end method nextCardPlease

// --------- --------- --------- --------- ---------- --------- -------- //
                } // end someObject


//---------

export  { someObject }
