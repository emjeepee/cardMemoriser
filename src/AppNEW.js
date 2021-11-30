import React from 'react';
// import ShowCard from './ShowCard.js'; // The place where successive cards appear
import PurpleButton from './PurpleButton.js'; // used in various places
import Timer from './Timer.js'; // evident
import RecallAreaNEW from './RecallAreaNEW.js'; // User picks cards in recall
import * as myController from './Controller' ; // Contains logic (fns)

// CSS:
import styles from './myCSSfiles/App.module.css';

// -------- // -------- // -------- // -------- // -------- // -------- // ---//

class AppNEW extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        //       -------------
        showRecallArea: true,
        //       -------------
        // secondsElapsed: 0,
        // minutes: 0,
        // seconds: 0,
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

recallReturnFromController = []  ;

returnFromController = []  ;

resetReturnFromController = [] ;
/*
secondsElapsed = 0 ;
nextCard = "start.svg"
nextCardButtonText = "First card"
startTheTimer = false
numberOfClicks = 0
timerButtonText = ""
minutes: 0
seconds: 0
*/
// ---------------------------------------------------------------- //

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
// myController.someObject.createShuffledDeck()
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
// Now a fn that code calls at the end of a chain after user clicks the "Done"
// button. That button is in <OverturnedCardsDisplayArea>, which is the child of
// <Timer>, which is the child of <App> (this ie component). The click response
// of that button calls a fn in <Timer>. That fn calls the following fn. In the
// process code sends array usedCards to the following fn:
receiveUsedCards = (usedCards) => {
// console.log("<App> here. usedCards contains: " + usedCards)
// NOTE : the following setState is causing <RecallArea> to redraw every time
// this fn (receiveUsedCards) is called, which is on every click of the
// advance-card button (because every time youchange the state of a parent it
// redraws itself and its children):
    this.setState((state, props) => {
            return {
                    usedCards: usedCards
                    }
                                    }
                 ) // end setState

                                  } // receiveUsedCards

// ---------------------------------------------------------------- //

/*
// fri12feb21: change this fn:
// The function that the "Recall" button calls.
// myController.someObject.recall() returns usedCards, which is an array
// that contains the cards that the user has tried to memorise:
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
*/
// ---------------------------------------------------------------- //

render() {
    return (
<div>


{/* ------ --------- -------- --------- -------- --------- -------- -------- */}

{/* <Timer>  */}
{/* This component comprises a start-stop timer button, numerals (text) for the
    minutes and seconds and a surrounding rectangle (a div )*/}
<div className = {styles.timerPosition} >
<Timer
sendUsedCardsUpTheChain = {this.receiveUsedCards}
/>
</div>

{/* <RecallAreaNEW> component */}
{/* This is where the user sees rectangles, one each for the cards he has tried
    to memorise. This whole area appears after the user clicks button ?????
    This component will only show when <App>'s state.showRecallArea is true --
    wed24feb21: at the moment it's always set to true */}

<div  className = {styles.recallAreaPositioningOnly}>
{
    this.state.showRecallArea ?
(   <div>
    <RecallAreaNEW
    noOfCardsToRecall = {this.recallReturnFromController.length}
    usedCards = {this.state.usedCards}
    closeShowRecallArea = {this.closeShowRecallArea}
    />
    </div>
) : ' '
}
</div>

{/* ------ Button that shows/hides the recallArea -------- */}
{/* ------ --------- -------- --------- -------- --------- -------- -------- */}
<PurpleButton>

</PurpleButton>



{/* ------ --------- -------- --------- -------- --------- -------- -------- */}


</div>
        );
} // end render function
                                    } // end definition of class App
export default AppNEW;







///////////////////////
// NO LONGER NEEDED //
///////////////////////
