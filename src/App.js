import React from 'react';
import ShowCard from './ShowCard.js'; // The place where successive cards appear
import PurpleButton from './PurpleButton.js'; // used in various places
import StopWatch from './StopWatch.js'; // evident
import RecallAreaNEW from './RecallAreaNEW.js'; // User picks cards in recall
import * as myController from './Controller' ; // Contains logic (fns)

// CSS:
import styles from './myCSSfiles/App.module.css';

// -------- // -------- // -------- // -------- // -------- // -------- // ---//

class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        //       -------------
        showRecallArea: false,
        nextCard: "start.svg",
        nextCardButtonText: "First card",
        //       -------------
        timerButtonText: "Timer" ,
        startTheTimer: false,
        //       -------------
        secondsElapsed: 0,
        minutes: 0,
        seconds: 0,
        //       -------------
        numberOfClicks: 0,
        //       -------------
        usedCards: [ ]
        //       -------------
                    } ;
                         } // end constructor

// ---------------------------------------------------------------- //
// a var to hold an empty array. componentDidMount sends this to the C, which
// sends it to the M as an init value for what gets stored in localStorage:
emptyArray = [] ;

// A counter to keeep track of the number of cards turned:
nextCardCounter = 0 ;

testArray = [ ] ;

// Array containing the strings representing the svgs that represent all cards:
playPack = [ ] ;


recallReturnFromController = []  ;

//
returnFromController = []  ;

//
resetReturnFromController = [] ;

secondsElapsed = 0 ;
nextCard = "start.svg"
nextCardButtonText = "First card"
startTheTimer = false
numberOfClicks = 0
timerButtonText = ""
minutes: 0
seconds: 0
// ---------------------------------------------------------------- //

// for the setInterval function. You have to set a var to setInterval to be able
// to use clearInterval():
x = null

// ---------------------------------------------------------------- //


// This component does the following in this order:
// 1) sends an empty array to the M
// 2) Makes a shuffled deck and puts it in a property in the controller
// 3)


componentDidMount = () => {
// send an empty array to C, which sends it to M as an init value for what gets
// stored in localStorage as previous attempt data:
myController.someObject.rxDataForModel(this.emptyArray)

// First create a new shuffled deck of cards and put it in array this.playPack
// in the Controller:
myController.someObject.createShuffledDeck()
                          } // end componentDidMount

// ---------------------------------------------------------------- //

// A fn that makes recall area show/disappear
closeShowRecallArea = () => {
this.setState((state, props) => {
        return {
                showRecallArea: false
                }
                                }
             ) // end setState
                             } // end closeShowRecallArea

// ---------------------------------------------------------------- //

// fns that return no of seconds, no of minutes that have elapsed:
getSeconds = () => {
return ('0' + this.state.secondsElapsed % 60).slice(-2)
                   } // end getSeconds

getMinutes = () => {
return Math.floor(this.state.secondsElapsed / 60)
                   } // end getSeconds

// ---------------------------------------------------------------- //

// The following functions respond to the user's click of the "First card" /
// "Back" / "Next card" buttons. Clicking either button calls this.nextCardPlease
// with argument true or false:
back = () => {
this.nextCardPlease(false)
             } // end back

forward = () => {
// First a counter to record the number of cards turned. It starts off === 0
this.nextCardCounter = this.nextCardCounter + 1
this.nextCardPlease(true)
                 } // end forward

// ---------------------------------------------------------------- //

// fn to respond to the user's click of the "Next card" button:
nextCardPlease = (forwardBackward) => {
// Get the Controller to shuffle the deck and return stuff such as the next
// card. Also start the timer if this fn is responding to first ever click of
// button (ie button that reads "First card"):
this.returnFromController = myController.someObject.nextCardPlease(forwardBackward)

// Remember that myController.someObject.nextCardPlease() returns
// [ this.startTheTimer ,       -- set to true
//   this.nextCard,             -- set to, eg, "cardCK.svg" (king of clubs)
//   this.nextCardButtonText,   -- set to "Next card" / "Last card" / "******"
//   this.numberOfClicks,       -- set to card ordinal number
//   this.timerButtonText       -- set to "Timer"/"Start timer"/"Stop timer"
//   forwardBackward            -- came from back or forward function
// Set some class vars to what the Controller returned:
this.startTheTimer      = this.returnFromController[0]
this.nextCard           = this.returnFromController[1]
this.nextCardButtonText = this.returnFromController[2]
this.numberOfClicks     = this.returnFromController[3]
this.timerButtonText    = this.returnFromController[4]

// Set state's nextCard property to the next card. This causes the <App> to
// redraw and the <ShowCard>'s showNextCardPlease prop to update, making
// <ShowCard> redraw too:
this.setState((state, props) => {
        return {
                nextCard: this.nextCard ,
                nextCardButtonText: this.nextCardButtonText
                }
                                }
             ) // end setState

// If the user has clicked on the "Next card" button for the first time – ie
// numberOfClicks === 1 – and numberOfClicks === 1 ONLY after the user has
// clicked the "Next card" button (ie NOT clicked the "Back" button):
// if (forwardBackward && this.nextCardCounter === 1)     {
// var that = this  // ??? why???

// ***************
// thurs11feb21: we now want setButtonText() to be a fn in <StopWatch>.
// We now also want the timer start code to be in a fn in <StopWatch>.
// We need to change an <App> state property. A <StopWatch> prop has been set to
// this state property. <StopWatch> class def code reacts to the value of this
// prop.

// Change text of the timer button:
/*
this.setButtonText("Stop timer") ;
// Start timer.
// setInterval() is a built-in js fn that takes two args, a function and an
// interval in milliseconds after which the fn is called repeatedly. You have to
// set a var to the return value to be able to use clearInterval(), which stops
// setInterval(). So the following code redraws the app every second:
this.x = setInterval(function()      {
    that.setState((state, props) => {
            return { secondsElapsed: that.state.secondsElapsed + 1 }
                                    }
                 ) // end setState
                                     } // end anon function
, 1000 ) // end setInterval
                                     } // end if
*/
// ***************


                         } //end nextCardPlease

// ---------------------------------------------------------------- //

// Code calls the following function in response to the user's click of a) the
// timer button, which is a child of <StopWatch>, and b) the recall button. App
// code has assigned <StopWatch> a prop that is a reference to this function
// (hence when the user clicks that button that is part of <StopWAtch> this fn
// fires). If arg "veracity" is false the timer starts. If true the timer stops:
myStopStartTimerFunction = (veracity) => {
var that = this ;  // ???? why ????
// If the user clicks the button while the button text says "Stop timer" stop
// the timer and change the text on the button to "Start timer":
if (veracity) {
// The ID value returned by setInterval() is used as param for clearInterval().
clearInterval(this.x)
this.setButtonText("Start timer")
               } // end if
// If the user clicks the button while the button text says "Start timer" start
// the timer again (DON'T RESET IT!) and change button text to "Stop timer":
if(!veracity) {
// setInterval() calls a fn (1st arg) every interval in millisecs (2nd arg).
this.x = setInterval(function()     {
    that.setState((state, props) => {
            return { secondsElapsed: that.state.secondsElapsed + 1 }
                                    }
                 ) // end setState
                                    } // end anon function
, 1000              ) // end setInterval

this.setButtonText("Stop timer")
                } // end if veracity === false, ie user clicked "Start timer"
                                          } // end stopStartTimerFunction

// ---------------------------------------------------------------- //

// A function to change the text of the button for stopping/starting the timer
// (that button is a child of <StopWatch>):
setButtonText = (timerBText) => {
    this.setState((state, props) => {
            return { timerButtonText: timerBText }
                                    }
                 ) // end setState
                                    } // end setButtonText

// ---------------------------------------------------------------- //

// Code calls the following when the user clicks "Reset-shuffle" button:
reset = () => {

this.resetReturnFromController = myController.someObject.reset()
// The function above returns this array of reset values:
//      [this.usedCards, this.numberOfClicks, this.nextCardButtonText,
//      this.nextCard, this.startTheTimer, this.timerButtonText,
//      this.showRecallArea, this.secondsElapsed, this.minutes, this.seconds ]

// Stop the timer:
this.myStopStartTimerFunction(true) ;
// Reset state's
// 1) timer button text,
// 2) next-card button text
// 3) numberOfClicks
// 4) nextCard
// 5) startTheTimer
// 6) secondsElaspsed -- resets the timer to 0m:0s
// 7) nextCardButtonText
// 8) Get new pack and reshuffle it
this.setState((state, props) => {
        return {         usedCards: this.resetReturnFromController[0],
                    numberOfClicks: this.resetReturnFromController[1],
                nextCardButtonText: this.resetReturnFromController[2] ,
                          nextCard: this.resetReturnFromController[3],
                     startTheTimer: this.resetReturnFromController[4],
                   timerButtonText: this.resetReturnFromController[5] ,
                    showRecallArea: this.resetReturnFromController[6],
                    secondsElapsed: this.resetReturnFromController[7],
                           minutes: this.resetReturnFromController[8],
                           seconds: this.resetReturnFromController[9]
                                }
                                }
             ) // end setState()
// Reset nextCardCounter to 0:
this.nextCardCounter = 0
               } // end reset

// ---------------------------------------------------------------- //

// The function that the "Recall" button calls.
// myController.someObject.recall() returns usedCards, which is an array
// that contains the cards that the user has overturned to try to memorise:
recall = () => {
// Turn off the stop watch:
this.myStopStartTimerFunction(true) ;
// Get usedCards:
this.recallReturnFromController = myController.someObject.recall()
// Change the value of state properties only if the user has tried to memorise
// at least one card. Change:
// 1) showRecallArea -- determines whether recall area should be shown.
// 2) usedCards -- an array containing all the cards the user tried to memorise.
// This array gets sent to <RecallArea>:
if (this.nextCardCounter > 0) {
this.setState((state, props) => {
        return { showRecallArea: true,
                 usedCards: this.recallReturnFromController
                }
                                } // end setState
              ) // end setState()
                               }//end if user tried to memorise > 0 cards
               } // end recall

// ---------------------------------------------------------------- //

render() {
    return (
<div>

{/*Thin vertical line */}
{/* This visually separates the <StopWatch> component from the <PurpleButton>s
    that are immediate children of the <App> component */}
<div className = {styles.verticalLineOne} >
</div>

{/* ------ --------- -------- --------- -------- --------- -------- -------- */}

{/* <StopWatch>  */}
{/* This component comprises a start-stop timer button, timer text and a
    surrounding brown rectangle (a div, brown backgrnd colour )*/}
<div className = {styles.stopWatchPosition} >
<StopWatch
minutes             = {this.getMinutes()}
seconds             = {this.getSeconds()}
stopStartTimer      = {this.myStopStartTimerFunction}
setButtonText       = {this.setButtonText}
textForTimerButton  = {this.state.timerButtonText}
/>
</div>

{/* ------ --------- -------- --------- -------- --------- -------- -------- */}
{/* ------ --------- -------- --------- -------- --------- -------- -------- */}

{/* <ShowCard> */}
{/* Now the <ShowCard> component, the area that displays the .svg file of the
    next card. */}
<div className = {styles.positionShowCard}>
<ShowCard
showNextCardPlease = {this.state.nextCard}
/>
</div>

{/* ------ --------- -------- --------- -------- --------- -------- -------- */}

{/* A button */}
{/* Now a button that the user clicks to show the next card. This button
    also starts the timer (on it first click only), so ultimately it triggers a
    function in the <StopWatch> component. */}
<div className = {styles.changeCardButtonPosition}>
<PurpleButton
buttonText = {this.state.nextCardButtonText}
clickResponseFunction = {this.forward}
/>
</div>

{/* ------ --------- -------- --------- -------- --------- -------- -------- */}

{/* Buttons */}

{/* Button to "reshuffle" pack and start again. THIS MAY NOT BE NECESSARY!*/}
<div className = {styles.resetButtonPosition}>
<PurpleButton
buttonText = "New pack"
clickResponseFunction = {this.reset}
/>
</div>

{/* Button to go back one card */}
<div className = {styles.backButtonPosition}>
<PurpleButton
buttonText = "Back"
clickResponseFunction = {this.back}
/>
</div>


{/* ------ --------- -------- --------- -------- --------- -------- -------- */}

{/* Recall button */}
{/* Now a button that the user clicks to bring up the large area to the right of
    the buttons where the user tries to recall memorised cards. */}
<div className = {styles.finishedButtonPosition}>
<PurpleButton
buttonText = "Recall"
clickResponseFunction = {this.recall}
/>
</div>

{/* ------ --------- -------- --------- -------- --------- -------- -------- */}

{/*Now the <Recall> area. Code shows this area only when user clicks "Recall"
    button. The "Recall" button's onClick handler changes
    this.state.showRecallArea to true (as well as doing other things) */}
<div>
{
    (this.state.showRecallArea) ?
(   <div className = {styles.recallAreaPositioningOnly}>
    <RecallAreaNEW
    noOfCardsToRecall = {this.recallReturnFromController.length}
    timeTaken = {this.getMinutes() +"m "+ this.getSeconds() + "s"}
    usedCards = {this.state.usedCards}
    closeShowRecallArea = {this.closeShowRecallArea}
    />
    </div>
) : ' '
}
</div>





{/* Now a test button
<div className = {styles.testButtonPosition}>
<PurpleButton
buttonText = "Test button"
clickResponseFunction = {this.createShuffledDeck}
/>
</div>
*/}




</div>
        );
}
                                    } // end definition of class App
export default App;
