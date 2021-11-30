import React from 'react';
import styles from './myCSSfiles/OverturnedCardDisplayArea.module.css';
import PurpleButton from './PurpleButton.js';
import * as myController from './Controller' ; // Contains fns
import Timer from './Timer.js';

/*
structure:
=========
<App>
    <RecallArea>
        <RecallCard>s
            <CardMenu>
            <attemptSuit>
            <RecallCardNumber>
        <Tick>
        <Cross>
    <Timer>
        <OverturnedCardDisplayArea> (this component)



This component comprises
i)   a portrait rectangle in which the card will appear
ii)  a button that reads one of "Frst card"/"Nxt card"/"Last card"/"End of pack"
iii) a button that reads "Back"
iv)  a button that reads "Reset" that resets timer and gets new shuffled deck
     This component is a child of <Timer>
v)   a button that reads "Done" that resets timer and causes the <RecallCard>s
     to appear in the <RecallArea>

How this component works
========================
1) componentDidMount() calls a controller fn that returns a shuffled deck of
cards, which goes into this.playPack and is in the form of an array of 54
string members that looks like this:
["start.svg", "cardCQ.svg", … … "cardD3.svg", "end of pack"], where, eg,
cardD3 = 3 of diamonds.

2) The card in the display area is "start.svg" when the app opens

3) User clicks the advance-card button
This is the button that reads "First card"/"Next card/ "Last card".
The handler for the click is advCardClickAction(), which indirectly increments
this.state.cardIndex. The <div> that is the display area contains an <img>.
<img>s have an src attribute that shows the path to the image to show. The value
of the src attrib of our <img> is:
src={require(`./myComponents/images/${this.playPack[this.state.cardIndex]}`) }
hence clicking advCardClickAction() changes this.state.cardIndex, which changes
the image.

3) The user clicks "Back"
The handler for the click is fn goBackOneCard(), which indirectly decrements
this.state.cardIndex, again changing the image.

4) The rightmost button at the bottom of the display area contains text that
shows the card ordinal number in deck this.playPack. It reflects the value of
this.state.cardNumber, whose value changes when the user clicks the advance-card
button or "Back" button.

5) The first time the User clicks the advance-card button (and only the first
time) the timer will start. advCardClickAction() calls a fn in parent component
<Timer> to start the timer. That fn also changes the text of the timer button to
"Stop timer" (from "StArt timer" ). Clicking the timer button again calls
another fn in parent component <Timer> that stops the timer.

6) The user clicks Reset and that calls a fn of the parent (<Timer>) that sets
timer button text to "Timer", stops the timer and sets the minutes&secs text to
0:0 and sets state properties cardIndex and cardNumber and this.counter back to
their init values


7) The user clicks the "Done" button when he has reached his limit for the
number of cards he is attempting to remember. The click response fn for this
button will:
a)
reset the timer (text + numerals) DONE
reset counters of any kind DONE
reset card shown to "start.svg" DONE

save the time taken

b) reset the adv-card-button text to "First card"  DONE
c) reset the button showing number of cards to blank DONE

d) disable the buttons for adv-card, back, timer and card number

e) save in array usedCards the cards overturned and send usedCards to <App> (via
parent <Timer> via this.props.sendUsedCardsUpTheChain)

e) enable the buttons in the recall area

f) save playPack somewhere (??where??) with a datestamp (date,hr:mins)

g)

*/

class OverturnedCardDisplayArea extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          advanceCardButtonText: "First card",
          currentCard: "start.svg",
          cardIndex: 0, // which position in playPack we are at [0] to [52]
          cardNumber: " ",//ordinal of card (1-52), appears in right-most button
          // numberOfClicks: 0, // mon15feb21: not used!!!
          // playPack: [],
          // secondsElapsed: 0,
          // minutesElapsed: 0
                    }
                        } // end constructor

// Get a shuffled deck from the controller:
componentDidMount() {
this.playPack = myController.someObject.createShuffledDeck()
                     } // end componentDidMount


// ----------   ----------   ----------   ----------   ----------
that = this // why????
// ----------   ----------   ----------   ----------   ----------
usedCards = []
// ----------   ----------   ----------   ----------   ----------
playPack = ["start.svg"] // this is an init value and is essential! This seems
// to happen before componentDidMount()

counter = 0 // used a lot, goes from 0 to 52, increments with every click of
// the advance-card button and decrements with every click of the "Back" button.

// A fn that
// i)    checks whether its the first click of "First card", ie not a click when
// the user had clicked "First card" followed by some number of "Next card"s and
// then "Back" so many times that the advance card button reads "First card"
// again. When that's the case, the stop-start timer button will read "Timer".
// This fn will then get a new shuffled pack from the controller.
// ii)   changes the advance-card button text if need be
// iii)  gets the next card by simply incrementing this.state.cardIndex
// iv)   sets off the timer
// v)    changes the timer button text

//------------
// Increment and decrement this.counter by 1, ensuring that
// the value of this.counter never goes above 52 or below 1:
incrementCounter = () => {
if (this.counter < 52) {
    this.counter = this.counter + 1
                       } // end if
                         } // end incrementCounter

decrementCounter = () => {
if (this.counter > 1) {
        this.counter = this.counter - 1
                      }  // end if
                         } // end decrementCounter
//------------

// A fn to set the value of the counter (always to 0):
setCounter = (value) => {
    this.counter = value
                        } // end setCounter

//------------

// A fn to set this.cardIndex to the value of the counter:
changeCardIndex = () => {
this.setState((state, props) => {
            return {
                    cardIndex: this.counter
                   }
                                }
             ) // end setState
                        } // end changeCardIndex

//------------

// A fn to set this.cardNumber to a given value:
changeCardNumber = (value) => {
this.setState((state, props) => {
            return {
                    cardNumber: value
                    }
                                }
             ) // end setState
                        } // end changeCardNumber


//------------ ------------ ------------ ------------ ------------ ------------
// The next fn fires when user clicks "Back" button. There are two cases:
// i)    cardIndex === 52, ie user clicks while last card is showing
// change advance-card text to "Last card"
// ii)   cardIndex === 51 to 2, ie user clicks while [51] to [1] is showing
// change advance-card text to "Next card"

// Whatever the case the first thing to do is decrement counter and set
// cardIndex and cardNumber to new value of counter. This will automatically
// show the previous card. This fn has no effect when the user clicks "Back"
// and the first card is showing (because the user's clicks on the "Back" button
// must never make the value of counter go < 0:
goBackOneCard = () => {

if (this.counter > 1 ) {
    this.decrementCounter()
    this.changeCardIndex()
    this.changeCardNumber(this.counter)
                        } // end if counter > 1

// Now save overturned cards to array usedCards (remember that slice(a,b) takes
// everthing from the target array from indexes [a] to [b-1] inclusive and
// returns all of those members in a new array):
this.usedCards = this.playPack.slice(1, (this.counter + 1))
// console.log(this.usedCards)
// Now send usedCards to <App>
// NOTE the following line causes <RecallArea> to redraw on each click of the
// "Back" button (because it ultimately changes <App>'s state):
this.props.sendUsedCardsUpTheChain(this.usedCards)


// case 1
// If user clicked "Back" button when card [52] was showing.
// Counter now === 51 (hence previous card is already showing and right-most
// button shows correct number):
if (this.counter === 51) {
    this.setState((state, props) => {
            return {
                    advanceCardButtonText: "Last card"
                    }
                                    }
                 ) // end setState
                         } // end if

// case 2
// If user clicked  "Back" button when card [51] to [2] was showing.
// counter now === 50 to 1:
if (this.counter > 0 && this.counter < 51  ) {
this.changeAdvCardButtonText("Next card")
                                             } // end if
                      } // end goBackOneCard

//------------------

// NOTE what made the following fn so tricky to work out how to write is the
// fact that I am incrementing counter (and hence cardIndex and cardNumber)
// immediately after the click but the actions in the fn necessarily relate to
// states before the click!!! I could have incremented counter, etc after, for
// example, the if statements, which might have made the fn a bit longer but it
// would probably have been less tricky to work out!
// The next fn fires when user clicks advance-card button.
// The first thing it does is increment the counter and set cardIndex and
// cardNumber to its value
// It deals with three cases. The advance-card button before the click reads:
// 1)  "First card", ie it's the first-ever click of the adv-card button and the
//     card displayed BEFORE the click was "CardsAppearHere.svg".
// 2)  "Next card" (because the current card in playPack is [1] to [50] )
// 3)  "Last card" (as current card in playPack is [51] )
// In each case this function will change the value of this.state.cardIndex and
// this.state.cardNumber
// This fn also grabs the overturned cards from playPack and puts them into
// array usedCards, then sends them to <App>:
advCardClickAction = () => {
// Change timer button text to "Stop timer" (by calling a fn of parent component
// <Timer>) and start the timer similarly:
this.props.changeTimerButtonText("Stop timer", "85px")
// Start the timer regardless of what the button reads:
this.props.startTheTimer()
// Now increment the counter then change cardIndex and cardNumber appropriately:
this.incrementCounter()
this.changeCardIndex()
// The value of the src attribute of the <img> that this component renders is
// partly made up of state.cardIndex and hence has now automatically updated.
this.changeCardNumber(this.counter)
// The text in the rightmost button at bottom of overturned card area reflects
// the value of cardNumber, starting off as " ", now reading "1"
// Save overturned cards to array usedCards (remember that slice(a,b) takes
// everthing from the target array from indexes [a] to [b-1] inclusive and
// returns all of those members in a new array):
this.usedCards = this.playPack.slice(1, (this.counter + 1))
// Now send usedCards to <App>
// NOTE the following line causes <RecallArea> to redraw on each click:
this.props.sendUsedCardsUpTheChain(this.usedCards)

// case 1)
// Remember that the value of this.counter has gone up by 1 on click:
if (this.counter === 1) {
// Set the advance-card button text to read "Next card":
this.changeAdvCardButtonText("Next card")
                         }//end if "First card" clicked, cases i)&ii)

// case 2
// When the adv-card button (before the click) reads "Next card", ie card
// showing WAS the one in playPack at index [1] to [49] (ie now changed to the
// one at index [2] to [50] (remember that the counter has already been
// incremented and the card showing has changed):
if (this.counter > 1 && this.counter < 51) {
this.changeAdvCardButtonText("Next card")
                                            } // end if advance-card
                                              // btn reads "Next card"

// case 3:
// If the card now showing is [51] (remember that the counter has already been
// incrmnted and the card showing has changed) set adv-card text to "Last card":
if (this.counter === 51) { //
this.changeAdvCardButtonText("Last card")
                         } // end if cardIndex === 51

// case 4
// When the advance-card button before the click read "Last card", ie card
// showing is now one at index [52] (remember that the counterhas been
// incremented):
if (this.counter === 52) {
this.changeAdvCardButtonText("End")
                          } // end if "Last card"

                    } // end advCardClickAction

//------------------------------------------------------------------------------
// A fn to change the text on the button the user clicks to get the next card
changeAdvCardButtonText = (text) => {
this.setState((state, props) => {
            return {
                    advanceCardButtonText: text
                   }
                                    }
              ) // end setState
                                    } // changeAdvCardButtonText
// ----------   ----------   ----------   ----------   ----------

// A fn that:
// i)    calls fn resetTimer in parent component <Timer> (which zeros the timer)
// ii)   sets state.currentCard === "start.svg"
// iii)  set text of advance-card button to "First card"
// iv)   state.cardIndex === 0
// v)    state.cardNumber === 0
// vi)   set usedCards to [] and send that array to parent <Timer> to send to
//       <App>

resetTimer = () => {
// i):
this.props.resetTimer()
// iii):
this.changeAdvCardButtonText("First card")
// iv) and v):
    this.counter = 0
    this.changeCardIndex()
    this.changeCardNumber(" ")
// ii):
this.setState((state, props) => {
            return {
                    currentCard: "start.svg"
                   }
                                    }
                 ) // end setState
                    } // end resetTimer

//------------------------------------------------------------------------------
// Now the fn that gets a new shuffled deck & resets timer, counter and indexes
newGame = () => {
this.changeAdvCardButtonText("First card")
this.resetTimer()
this.playPack = myController.someObject.createShuffledDeck()
                } // end newGame

//------------------------------------------------------------------------------

// Now the function that responds to the click of the "Done" button. It
// 1) calls resetTimer()
// 2) tells parent <Timer> to tellits parent <App> to show the <RecallCard>s in
// the large brown box:
done = () => {
// 1)
// First reset counters, indexes and timer:
this.resetTimer()
// 2)
// Now show the <RecallCard>s in the large brown box:

             } // end done


// ----------   ----------   ----------   ----------   ----------
render() {
    return (
    <div  > {/* the overall wrapping div */}

<div className = {styles.prettifyOverturnedCardDisplayArea}> {/* where the card appears */}
<img
style={{maxHeight: '100%', maxWidth: '100%'}}
src={require(`./myComponents/images/${this.playPack[this.state.cardIndex]}`) }
alt= "Card appears here"
/>
</div>

<div className = {styles.positionBackButton}>  {/* "Back" button */}
<PurpleButton
    buttonText = "Back"
    clickResponseFunction = {this.goBackOneCard}
    />
</div>

<div className = {styles.positionAdvanceCardButton}>  {/* Card-advance button
    (reads "First card" / etc )
     */}
<PurpleButton
    buttonText = {this.state.advanceCardButtonText}
    clickResponseFunction = {this.advCardClickAction}
    />
</div>

<div className = {styles.positionCardNumberButton}>  {/* card number button */}
<PurpleButton
    buttonText = {this.state.cardNumber}
    width = {"27px"}
    />
</div>

<div className = {styles.positionResetButton}>  {/* Reset button */}
<PurpleButton
    buttonText = "Reset"
    width = {"52px"}
    clickResponseFunction = {this.resetTimer}
    />
</div>


<div className = {styles.positionDoneButton}>  {/* Done button */}
<PurpleButton
    buttonText = "Done"
    width = {"52px"}
    clickResponseFunction = {this.done}
    />
</div>

<div className = {styles.positionNewGameButton}>  {/* New game button */}
<PurpleButton
    buttonText = "New game"
    width = {"87px"}
    clickResponseFunction = {this.newGame}
    />
</div>





</div>
        );
         }
                        } // end class App

export default OverturnedCardDisplayArea;
