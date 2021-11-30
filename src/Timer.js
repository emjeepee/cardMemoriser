// This component renders:
// 1) the brown rectangle, which contains the timer text that shows mins:secs
// 2) the stop-start timer button below the brown rectangle
// 3) Child component <OverturnedCardDisplayArea>

// This component has state!
// Update to this component, thurs11feb21:
// This component brings into one what was <StopWatch>, <ShowCard> and a
// couple of buttons. The idea was that a button in <StopWatch> triggered a
// fn in <App> to get the timer to start/stop, making the component not that
// re-usable.
// I have decided to change the way this component works. Previously clicking
// the button triggered a fn in this component, which triggered a fn in parent
// <App>, which change an <App> state property called secondsElapsed. The value
// of that state property got sent to this component (<StopWatch>) as a props
// and hence the timer text changed every second. Instead I've decided to do
// everything inhouse, so to speak, ie all in this component. The idea is to
// improve reusability. With the parent component <App> doing stuff for this
// component, this component relies on the parent, which ensures it is not
// reusable!!!
// Clicking the start/stop button causes  <StopWatch> fn
// myStopStartTimerFunction to run.
// That fn calls the <App> fn of the same name (it can do this because
// <StopWatch> has a prop whose value <App> sets to that <App> fn. That <App>
// fn calls setInterval to change a state property every 1000ms. <App> code sets
// a <StopWatch> prop called seconds (called below) to that state
// property (called secondsElapsed).



// -----------------------------------------------------------------------------

import React from 'react';
// CSS classes come from StopWatch.module.css:
import styles from './myCSSfiles/Timer.module.css';
import PurpleButton from './PurpleButton.js';
import OverturnedCardDisplayArea from './OverturnedCardDisplayArea.js';



class Timer extends React.Component {

// This component has state!
constructor(props) {
    super(props)
    this.state = {
        nextCardButtonText: "First card" ,
        textForTimerButton: "Timer" ,
        timerButtonWidth: "50px",
        secondsElapsed: 0,
        minutesElapsed: 0,
        isTimerRunning: false,
        textForTestButton: "Test",
        testText: "This is a test"
                 }
                    } // end constructor

/* --- --- --- ---  ---------- first some vars  -- ---- ---- --- -- --- -- -- */
// for the setInterval function. You have to set a var to setInterval to be able
// to use clearInterval():
x = null
that = this ;  // ???? why ???? needed for setInterval but idk why!!!
secondsOnly = 0
minutesOnly = 0


/* ------------  ---------- Timer functions and vars  ------------- --------- */
// ********************************

// a fn to set the text on the stop/start timer buttonand the corresponding
// width of the button:
setStopStartButtonText = (text, width) => {
    this.setState((state, props) => {
            return {
                    textForTimerButton: text,
                    timerButtonWidth: width
                    }
                                    }
                 ) // end setState
                                    } // end setStopStartButtonText

// ********************************
//----------------
// A fn used in startTimer to change state properties secondsElapsed and
// minutesElapsed ti this.seconds and this.minutes, respectively:
setStateSecsMinsElapsed = () => {
this.setState((state, props) => {
    return { secondsElapsed: this.secondsOnly,
             minutesElapsed: this.minutesOnly  }
                                }
              ) // end setState
                                } // end setStateSecsMinsElapsed
// thus25feb21 -- DON'T USE THESE:
// Two fns used in startTimer:
setStateSecondsProperty = () => {
this.setState((state, props) => {
    return { secondsElapsed: this.secondsOnly }
                                }
              ) // end setState
                                } // end setStateSecondsProperty

setStateMinutesProperty = () => {
this.setState((state, props) => {
    return { minutesElapsed: this.minutesOnly }
                                }
              ) // end setState
                                } // end setStateMinutesProperty

// ********************************
// This function starts/stops the timer depending on the text on the start/stop
// timer button. This fn fires in response to a click of the timer button.
myStopStartTimerFunction  = () => {
// If the stop/start timer button text read "Stop timer" stop the timer:
if ( this.state.textForTimerButton === "Stop timer") {
this.stopTimer()
                                                      } // end if
// If the stop/start timer button text read "Start timer" start the timer:
if ( this.state.textForTimerButton === "Start timer") {
this.startTheTimer()
                                                      } // end if

                                   } // end myStopStartTimerFunction

// ********************************
// This function starts the timer when the user
// i)   clicks the advance card button when for the first ever time it says
// "First card"
// ii)  clicks the timer button when it reads "Start timer":
// Fn to start the timer
startTheTimer = () => {
// Only do anything if the timer is not running:
if (this.state.isTimerRunning === false) {
// Change the state proerty that let's us know if the timer is running:
    this.setState((state, props) => {
            return {
                    isTimerRunning: true
                    }
                                    }
                 ) // end setState
// Change the text of the timer button:
this.setStopStartButtonText("Stop timer", "85px")
// Tick seconds/minutes:
// NOTE: the anon fn that is the 1st arg to setInterval() HAS to be an arrow fn
// otherwise compiles says: TypeError: this.setStateSecondsProperty is not a
// function. Work out why!!!
this.x = setInterval(() => {
// increment the seconds counter
this.secondsOnly = this.secondsOnly + 1
if (this.secondsOnly === 60) {
// reset seconds counter:
this.secondsOnly = 0
// increment minutes counter:
this.minutesOnly = this.minutesOnly + 1
                              } // end if whole minute

// whatever the case update the state object's secondElapsed and minutesElapsed
// properties:
this.setStateSecsMinsElapsed()
                                 } // end anon function
                    , 1000 ) // end setInterval
                                        } // end if timer is already running
                     } // end startTimer

//-------------------

// Fn to stop the timer
stopTimer = () => {
// Ony do anything if the timer is running:
if (this.state.isTimerRunning === true) {
// First change state property that tells us if timer sis running or not:
    this.setState((state, props) => {
            return {
                    isTimerRunning: false
                    }
                                    }
                 ) // end setState
// Change the text of the timer button:
this.setStopStartButtonText("Start timer", "90px")
// stop the timer:
clearInterval(this.x)
                                        } // end if timer is running
                  } // end stopTimer

//----------------

// Fn to reset the timer. The Reset button (part of component
// OverturnedCardDisplayArea) calls this fn:
resetTimer = () => {
// stop the timer and change the timer button text to "Start timer":
// clearInterval(this.x)
this.stopTimer()
this.setStopStartButtonText("Timer", "50px")
// Set timer display text to "0m:0s":
this.secondsOnly = 0
this.minutesOnly = 0
// Now set state.secondsElapsed = this.secondsOnly and
// state.minutesElapsed = this.minutesOnly:
this.setStateSecsMinsElapsed()
                   } // end resetTimer

//----------------
// Now an fn that will rx array usedCards and send it to parent <App>
sendUsedCardsUpTheChain = (usedCardsArray) => {
    this.props.sendUsedCardsUpTheChain(usedCardsArray)
                                              } // end sendUsedCardsUpTheChain

render() {
    return (
<div>
{/*------- -------- -------- --------- -------- -------- -------- ------ ----*/}

{/* The area where an overturned card will appear */}
<div className = {styles.positionOverturnedCardArea}>
< OverturnedCardDisplayArea
textForTimerButton = {this.state.textForTimerButton}
startTheTimer = {this.startTheTimer}
changeTimerButtonText = {this.setStopStartButtonText}
resetTimer = {this.resetTimer}
sendUsedCardsUpTheChain = {this.sendUsedCardsUpTheChain}
/>
</div>

{/*------- -------- -------- --------- -------- -------- -------- ------ ----*/}
{/* The timer text, the pink box surrounding it, the start/stop button
    (which reads "Timer"/"Start timer"/"Stop timer") */}
    {/* the wrapping div */}

    <div className = {styles.prettifyingBrownBox}>  {/* brown box */}
    </div>                                               {/* end brown box */}
    <p className = {styles.counterText}>    {/* mins & secs text  */}
        {this.state.minutesElapsed}m:{this.state.secondsElapsed}s
    </p>

{/* Button that stops/starts the timer. Remember that the text on it changes
    with each click (from  "Timer" to "Start timer" to "Stop timer") */}
<div className = {styles.positionStopStartButton}>
<PurpleButton
buttonText = {this.state.textForTimerButton}
clickResponseFunction = {this.myStopStartTimerFunction}
width = {this.state.timerButtonWidth}
/>
</div>


{/* Test button */}
<div className = {styles.positionTestButton}>
<PurpleButton
buttonText = {this.state.textForTestButton}
clickResponseFunction = {this.myTestFunction}
/>
</div>



{/*------- -------- -------- --------- -------- -------- -------- ------ ----*/}

</div>
            ); // end return
            } // end render
                                           } // end class def


export default Timer;

// stuff:
// setStateSecondsProperty
