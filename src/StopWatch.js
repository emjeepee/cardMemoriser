// This component renders two things:
// 1) the brown rectangle, which contains the timer text that shows mins:secs
// 2) the stop-start timer button below the brown rectangle.

// This component has one member function

// This component has state!
// Update to this component, thurs11feb21:
// I have decided to cahnge the way this component works. Previously clicking
// the button triggered a fn in this component, which triggered a fn in parent
// <App>, which change an <App> state property called secondsElapsed. The value
// of that state property got sent to this component (<StopWatch>) as a props
// and hence the timer text changed every second. Instead I've decided to do
// everything inhouse, so to speak, ie all in this component. The idea is to
// improve reusability. With the parent component <App> doing stuff for this
// component, this component relies on the parent, which ensures it is not
// reusable!!!
// -----------------------------------------------------------------------------

import React from 'react';
// CSS classes come from StopWatch.module.css:
import styles from './myCSSfiles/StopWatch.module.css';
import PurpleButton from './PurpleButton.js';

class StopWatch extends React.Component {

// This component has state!
constructor(props) {
    super(props)
    this.state = {
        buttonText: "Timer" ,
        secondsElapsed: 0

                 }
                    } // end constructor

/* ------------  ---------- Timer functions and vars  ------------- --------- */


// ********************************

// fns that return no of seconds, no of minutes that have elapsed:
getSeconds = () => {
return ('0' + this.state.secondsElapsed % 60).slice(-2)
                   } // end getSeconds

getMinutes = () => {
return Math.floor(this.state.secondsElapsed / 60)
                   } // end getSeconds

// ********************************

// This function runs when the user clicks the button that says "Timer" / "Start
// timer" / "Stop timer"
myXStopStartTimerFunction = () => {
// If the button says "Start timer", start the timer and change the text of the
// button to "Stop timer".

if (this.state.textForTimerButton === "Start timer") {
// this.props.stopStartTimer(false)
                                                      }

// If the button says "Stop timer", send a message upstream to <App> to stop
// the timer. No need to send a message upstream to change the text of the
// button to "Start timer" as that is done at the <App> end.
if (this.state.textForTimerButton === "Stop timer")  {
// this.props.stopStartTimer(true)
                                                     } // end if
                                 } // end myStopStartTimerFunction

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







render() {
    return (
<div>

{/*------- -------- -------- --------- -------- -------- -------- ------ ----*/}

    {/*Text for mins and secs, brown box and container div */}
    <div className = {styles.surroundingDivOfTimer}> {/* surrounding div */}
    <div className = {styles.containingDivOfTimer}>  {/* brown box */}
    <p className = {styles.counterText}>    {/* mins & secs text  */}
        {this.props.minutes}m:{this.props.seconds}s
    </p>
</div>                                               {/* end brown box */}
</div>                                               {/* end surrounding div */}

{/*------- -------- -------- --------- -------- -------- -------- ------ ----*/}

{/* Button two -- which stops/starts the timer. Clicking this button causes
    <StopWatch> fn myStopStartTimerFunction to run. That fn calls the <App> fn
    of the same name (it can do this because <StopWatch> has a prop whose value
   <App> sets to that <App> fn. That <App> fn calls setInterval to change a
   state property every 1000ms. <App> code sets a <StopWatch> prop called
   seconds (called below) to that state property (called secondsElapsed).
    */}
<div  className = {styles.positionStopButton}>  {/* enclosing div */}
<PurpleButton
buttonText = {this.state.buttonText}
clickResponseFunction = {this.myStopStartTimerFunction}
/>
</div>                                          {/* end enclosing div */}

{/*------- -------- -------- --------- -------- -------- -------- ------ ----*/}


</div>
            ); // end return
            } // end render
                                           } // end class def

export default StopWatch;

/*
setButtonText = () => {
if (this.props.textForTimerButton === "Stop timer") {
this.props.setButtonText("Start timer")
                                                    } // end if

if (this.props.textForTimerButton === "Start timer") {
this.props.setButtonText("Stop timer")
                                                     } // end if
                       } // end setButtonText
*/

/*   OLD:
// This fn fires when the user clicks the Stop/Start button of the timer.
// This function has to first determine the button's current purpose, ie whether
// the button reads "Start timer" or "Stop timer":
myStopStartTimerFunction = () => {
// If the button says "Start timer", send a message upstream to <App> to start
// the timer. No need to send a message upstream to change the text of the
// button to "Stop timer" as that is done at the <App> end.
// Component App sets this.prop.stopStartTimer to App function
// myStopStartTimerFunction
if (this.props.textForTimerButton === "Start timer") {
this.props.stopStartTimer(false)
                                                      }

// If the button says "Stop timer", send a message upstream to <App> to stop
// the timer. No need to send a message upstream to change the text of the
// button to "Start timer" as that is done at the <App> end.
if (this.props.textForTimerButton === "Stop timer")  {
this.props.stopStartTimer(true)
                                                     } // end if
                                 } // end myStopStartTimerFunction
*/
