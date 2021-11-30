/*
This component is where code makes the recall cards, the number of which depends
on how many cards the user has tried to memorise.
This component also performs the logic that compares the usedCards with the
userAttempt.
*/

// This component rxes this.props.usedCards from <App>, which <App> sets to
// an <App> state property value that is an array containing the cards that the
// user has tried to remember (which may be less than a whole pack).


import React from 'react';
import RecallCard from './RecallCard';
import PurpleButton from './PurpleButton';
import RecallCardNumber from './RecallCardNumber';
import Cross from './Cross' ;
import Tick from './Tick' ;
import SaveModal from './SaveModal';
import FloatingPanelNEW from './FloatingPanelNEW';
import * as myController from './Controller' ;

// CSS classes
import styles from './myCSSfiles/RecallArea.module.css';




class RecallArea extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        dataFromModel: "" ,
        prevAttemptsDataFromModel: "",
        showTicksAndCrosses:  false,
        disabledYesNo:        false,
        showSaveModal:        false,
        pos1:                 0,
        pos2:                 0,
        pos3:                 0,
        pos4:                 0,
        left:                 450, // for floating panel
        top:                  550, // for floating panel
        position:             "absolute",
        showPreviousAttempts: false
                    } ;
                        } // end constructor

// ---------------------------------------------------------------- //
// A var to hold an empty array. componentDidMount sends this to the C (which
// sends it to the M)
emptyArray = [ ]

// a var to hold the data rxed from the Model:
dataFromModel = ""

// Vars that the function calculateCorrectness will use:
numberOfIncorrect = 0
numberOfCorrect   = 0

// Vars that function convertDateObject will use. Function saveAndSendToModel
// calls convertDateObject, which converts a JS Date object into a string of the
// type "16h32 Wed, 18 Jul 2019":
now            = ""
minutesString  = ""
hoursString    = ""
dayString      = ""
dateString     = ""
monthString    = ""
yearString     = ""
timeDateString = ""

// This will be an object literal that will contain info about an attempt:
attempt = {
    now: "",
    name: "",
    email: "",
    date: "",
    usedCards: "",
    userAttempt: "",
    playPack: "",
    timeTaken: "",
    correct: "",
    incorrect: ""
           }

// Thisvar will contain the data that gets sent to the model for storage:
attemptJSONified = ""

// This var contains the usedCards array that this <RecallArea> component rxes
// from <App>
usedCards = this.props.usedCards

// This is an array that hold a list of matches
result = []

// This is an array that will contain objects that represent each card of the
// user's attempt. It will look like this:
// [  {id: 0 , card: CK.svg}
//    {id: 1 , card: H6.svg} ]
userAttemptTemplate = [
{id: 0, suit: "",  number: "", card: ""}, {id:1 , suit:"", number:"", card:""},
{id: 2, suit: "",  number: "", card: ""}, {id:3 , suit: "", number:"", card:""},
{id: 4, suit: "",  number: "", card: ""}, {id:5 , suit: "", number:"", card:""},
{id: 6, suit: "",  number: "", card: ""}, {id:7 , suit: "", number:"", card:""},
{id: 8, suit: "",  number: "", card: ""}, {id:9 , suit: "", number:"", card:""},
{id: 10, suit: "", number: "", card: ""}, {id:11 , suit: "", number:"", card:""},
{id: 12, suit: "", number: "", card: ""}, {id:13 , suit: "", number:"", card:""},
{id: 14, suit: "", number: "", card: ""}, {id:15 , suit: "", number:"", card:""},
{id: 16, suit: "", number: "", card: ""}, {id:17 , suit: "", number:"", card:""},
{id: 18, suit: "", number: "", card: ""}, {id:19 , suit: "", number:"", card:""},
{id: 20, suit: "", number: "", card: ""}, {id:21,  suit: "", number:"", card:""},
{id: 22, suit: "", number: "", card: ""}, {id:23 , suit: "", number:"", card:""},
{id: 24, suit: "", number: "", card: ""}, {id:25 , suit: "", number:"", card:""},
{id: 26, suit: "", number: "", card: ""}, {id:27 , suit: "", number:"", card:""},
{id: 28, suit: "", number: "", card: ""}, {id:29 , suit: "", number:"", card:""},
{id: 30, suit: "", number: "", card: ""}, {id:31 , suit: "", number:"", card:""},
{id: 32, suit: "", number: "", card: ""}, {id:33 , suit: "", number:"", card:""},
{id: 34, suit: "", number: "", card: ""}, {id:35 , suit: "", number:"", card:""},
{id: 36, suit: "", number: "", card: ""}, {id:37 , suit: "", number:"", card:""},
{id: 38, suit: "", number: "", card: ""}, {id:39 , suit: "", number:"", card:""},
{id: 40, suit: "", number: "", card: ""}, {id:41 , suit: "", number:"", card:""},
{id: 42, suit: "", number: "", card: ""}, {id:43 , suit: "", number:"", card:""},
{id: 44, suit: "", number: "", card: ""}, {id:45 , suit: "", number:"", card:""},
{id: 46, suit: "", number: "", card: ""}, {id:47 , suit: "", number:"", card:""},
{id: 48, suit: "", number: "", card: ""}, {id:49 , suit: "", number:"", card:""},
{id: 50, suit: "", number: "", card: ""}, {id:51 , suit: "", number:"", card:""  }
              ] ;

userAttempt = this.userAttemptTemplate ;

// The following four arrays will contain recall cards, of which there will be
// four rows. Of course, not all of these arrays will contain recall cards:
firstRow  = [ ] ;
secondRow = [ ] ;
thirdRow  = [ ] ;
fourthRow = [ ] ;

// This is the var that will hold the jsx that will represent the ticks and
// crosses that will go over the <RecallCard>s after the user clicks the "Check"
// button.
crossesAndTicks = [] ;

// --------------------------------------------------------- //
recallAreaWantsDataFromModel = () => {
    return myController.someObject.demandForDataFromModel()
                                     } // recallAreaWantsDataFromModel

// --------------------------------------------------------- //

// The following function responds to the user clicking the "Show previous
// attempts" button. It toggles the value of state property
// showPreviousAttempts, whose value determines whether or not the pane that
// shows previous attempts appears.
// If the value of that state property is xxx this function gets from the Model
// that data that represents previous attempts. This function then passes the
// data  to <FloatingPanel>, which passes it to <Table>, which displays it.

changeShowPreviousAttempts = () => {
// Toggle the value of the state property showPreviousAttempts
this.setState((state, props) => {
        return {
                showPreviousAttempts: !this.state.showPreviousAttempts
                }
                                }
              ) // end setState
// If the value of this.state.showPreviousAttempts is false get data from the
// Model and pass it to <FloatingPanel>:
if (!this.state.showPreviousAttempts) {
this.dataFromModel = this.recallAreaWantsDataFromModel()
// so now this.dataFromModel looks like this:
// [{… …, date: xxxx, incorrect:3, correct: 12, … … },
//  {… …, date: xxxx, incorrect:2, correct: 10, … … }
// …
// …
// ]
// console.log("User has clicked Show previous attempts button and this.dataFromModel's first obj has date value: " + this.dataFromModel[0].date)

// Now send that data to <FloatingPanel>, which will send it to <Table>, which
// will display it. Do this by first setting a state property to
// this.dataFromModel, which will cause a redraw of <RecallArea> and its
// children. <FloatingPanel> is one of the children and it is given props
// dataFromModel = {this.state.dataFromModel}:
this.setState((state, props) => {
        return {
                dataFromModel: this.dataFromModel
                }
                                }
              ) // end setState
                                      } // end if



                                    } // end changeShowPreviousAttempts


// {/*   {this.props.closeShowRecallArea}    respondToClose  */}
// This function responds to the click of the "Close" button. It:
// 1) calls function closeShowRecallArea of <App> (passed in to this component
// as props)
// 2) sets state property showModal of this current component (ie <RecallArea>)
// to true:
respondToClose = () => {
this.setState((state, props) => {
        return {
                showSaveModal: true
               }
                                }
              ) // end setState
                        } // end respondToClose

// --------------------------------------------------------- //
// Code gives the following two functions as props to <RecallCard> so that when
// code calls makeAllRowsOfCards, which calls makeArow, which renders each
// <RecallCard>, each <RecallCard> has a reference to these functions. Clicking
// the suit pic in a <RecallCard> calls getCardSuit, giving it the two args
// required; clicking the dd list in a <RecallCard> calls getCardNumber, giving
// it three args required. This is how code populates the userAttempt array as
// the user clicks in the suit image and dd list of each <RecallCard>
// cardOrdinal below is the n in nth card.
getCardNumber = (cardSuit, cardNumber, cardOrdinal) => {
this.userAttempt[cardOrdinal].suit   = cardSuit   ;
this.userAttempt[cardOrdinal].number = cardNumber ;
                                                        } // getCardNumber

getCardSuit = (cardSuit, cardOrdinal) => {
this.userAttempt[cardOrdinal].suit   = cardSuit   ;
                                         } // getCardNumber
// --------------------------------------------------------- //

// Now a function that is part of a chain of functions that fire after the user
// clicks the "check" button. This function compares the user's attempts at
// recall with the actual cards in the pack. It populates array result with
// objects each of which shows whether the user's recall of a card was correct
// or not (by setting each object's status property to string 'correct' or
// 'incorrect'):
compare = () => {
// First reset result. This is essential:
this.result = []
for (var i = 0; i < this.props.usedCards.length; i++) {
// If user's attempt matches actual card user tried to memorise:

if (this.props.usedCards[i] === this.userAttempt[i].card ) {
this.result.push({id: i , status: "correct"})
                                                            } // end if
//
if (this.props.usedCards[i] !== this.userAttempt[i].card ) {
this.result.push({id: i , status: "incorrect"})
                                                            } // end if
                                                       } // end for
// so array result now looks, for example, like this:
/*
[       {id: 1 , status: "incorrect"} ,
        {id: 2 , status: "correct"} ,
        … ]
*/

// console.log("Inside compare. result[0].status is: " + this.result[0].status)
// Now call the function that displays crosses and ticks over the <RecallCard>s
// to show how well the user did:
this.showResult()
                } // end compare

// --------------------------------------------------------- //
// The following funtion responds to the user's click of the "Check" button. It
// concats the "cardH" and "6" type property values in each object in array
// userAttempt and puts them in each object's property card (eg as "cardH6"):
check = () => {
// First reset the array userAttempt so that it contains 52 objects that each
// looks like this: {id: 0, suit: "",  number: "", card: ""}:
this.userAttempt = this.userAttemptTemplate
// Now truncate array userAttempt so that it is only as long as array usedCards,
// which holds the cards the user tried to memorise:
this.userAttempt = this.userAttempt.slice(0, this.props.usedCards.length);
// Now set the state property that determines whether the check button is
// disabled or not (here disabling the button now that it has been clicked):
this.setState((state, props) => {
        return {
                disabledYesNo: false
                }
                                }
              ) // end setState

// Now concatenate the suit and number properties of each object in userAttempt
// and put the result in the object's card property:
for (var i = 0; i < this.props.usedCards.length; i++) {
this.userAttempt[i].card = this.userAttempt[i].suit + this.userAttempt[i].number + ".svg"
                                                      } // end for loop
// So now array userAttempt contains objects each of which looks like this:
//  {suit: "cardH" , number: "6" , card: "cardH6"}
this.compare()

              } // end check
// --------------------------------------------------------- //
// The following function displays the result of the user's attempt:
showResult = () =>{
// array result appears to be being populated correctly .
// First remove the existing crosses and ticks. This is essential:
this.crossesAndTicks = []
// Set value of state property showTicksAndCrosses to true:
for (var i = 0; i < this.props.usedCards.length; i++) {
// if (!arrayArg[iArg]) { // if there is no object at this index already
//                      } // end if there is no object at this index already
this.makeCrossesAndTicks(6,-1,13,this.result,i,"40px", `${20 + ((i)*71)}px`)
this.makeCrossesAndTicks(6,12,26,this.result,i,"180px", `${20 + ((i-13)*71)}px`)
this.makeCrossesAndTicks(6,25,39,this.result,i,"320px", `${20 + ((i-26)*71)}px`)
this.makeCrossesAndTicks(6,38,52,this.result,i,"460px", `${20 + ((i-39)*71)}px`)
                                                      } // end for

this.setState((state, props) => {
        return {
                showTicksAndCrosses: true
                }
                                }
             ) // end setState

                  } // end showResult
// --------------------------------------------------------- //
// This function will make a row of crosses and ticks. Remember that it gets
// called in a function that contains a for loop (whose iterating var is
// represented by iArg below).
// arrayArg is array result (which contains objects each with an id property
// and a status property (that has value "correct" or "incorrect" depending on
// whether the user has recalled that particular card correctly or not)):

makeCrossesAndTicks = (zIndexArg, iMin, iMax, arrayArg, iArg, top, left) => {
    if ((iArg > iMin) && (iArg < iMax) ) {
if (arrayArg[iArg].status === "incorrect") {
        this.crossesAndTicks.push(
        [<div style = {{zIndex: zIndexArg , position: "absolute",  top: top, left: left }} >
        <Cross/>
        </div>])
                                            }  // end if status === "incorrect"
if (arrayArg[iArg].status === "correct") {
        this.crossesAndTicks.push(
        [<div style = {{zIndex: zIndexArg , position: "absolute",  top: top, left: left }} >
        <Tick/>
        </div>])
                                          } // end if status === "correct"
                                     } // end if iArg lies between iMin and iMax
                                                    } // end makeCrossesAndTicks

// --------------------------------------------------------- //
// This function will make a row of recall cards when you feed it array row
// (eg this.thirdRow) and other stuff. Remember that this function gets called
// in function makeAllRowsOfCards, which contains a for loop (whose iterating
// var is represented by iArg below).
makeArow = (cardZindex, iMin, iMax, row, iArg, cardTop, cardLeft, numberTop, numberLeft) => {
if (iArg < iMax && iArg > iMin) {
row.push(
    <div>
    <div style={{zIndex: cardZindex , position: "absolute" , top: cardTop , left: cardLeft }}>
        <RecallCard
        getCardNumber = {this.getCardNumber}
        getCardSuit = {this.getCardSuit}
        ordinalNumber = {iArg}
        />
    </div>

    <div style={{zIndex: 0 , position: "absolute" , top: numberTop , left: numberLeft, height: "35px", width: "35px" }}>
    <RecallCardNumber
        numberText = {iArg+1}
    />
    </div>
    </div>
        ) // end push
                } // end if
                                        } // end makeArow

// --------------------------------------------------------- //

// This function makes up to four rows of 13 <RecallCard>s.
makeAllRowsOfCards = () => {
// usedCards is getting here correctly on second set of clicks of "Next card".
// First zero out the arrays representing each row. This takes care of  the case
// in which the user clicks the "Next card" and "Back" buttons repeatedly.
this.firstRow  = []
this.secondRow = []
this.thirdRow  = []
this.fourthRow = []

for (var i = 0 ; i < this.props.usedCards.length ; i++) {

this.makeArow (5, -1, 13, this.firstRow, i, "40px" , `${20 + (i*71)}px` , "-30px" , `${41 + (i*71)}px`) ;

this.makeArow (4, 12, 26, this.secondRow, i, "180px" , `${20 + ((i-13)*71)}px` , "110px" , `${33 + ((i-13)*71)}px` ) ;

this.makeArow (3, 25, 39, this.thirdRow, i, "320px" , `${20 + ((i-26)*71)}px` , "250px" , `${33 + ((i-26)*71)}px` ) ;

this.makeArow (2, 38, 52, this.fourthRow, i, "460px" , `${20 + ((i-39)*71)}px` , "391px" , `${33 + ((i-39)*71)}px` ) ;

                            } // end for loop

return ([this.firstRow, this.secondRow,
        this.thirdRow, this.fourthRow,
        ]);

                           } // end makeAllRowsOfCards

// --------------------------------------------------------- //
// A function that calculates how many objects in array result have status
// property value "incorrect" and how many "correct". Function
// saveAndSendToModel calls this function:

calculateCorrectness = () => {
for (var i = 0; i < this.result.length; i++) {
if (this.result[i].status === "incorrect") {
this.numberOfIncorrect = this.numberOfIncorrect + 1
                                         } // end if
if (this.result[i].status === "correct") {
this.numberOfCorrect = this.numberOfCorrect + 1
                                      } // end if
                                             } // end for
                              } // end calculateCorrectness

// --------------------------------------------------------- //
// What the table displays:
// {obj.date}
// obj.correct}
// <td>{obj.incorrect}</td>
// <td>{obj.total}</td>
// <td>{obj.timeTaken}</td>

/*
attempt = {
    name:   "",
    email:  "",
    date:   "",
    correct: "",
    incorrect: "",
    total:  "",
    usedCards: "",
    userAttempt: "",
    playPack: "",
    timeTaken: ""
           }
*/

// Function to gather info and send it to the model
saveAndSendToModel = () => {
this.calculateCorrectness()
// return([this.numberOfIncorrect, this.numberOfCorrect])
// First populate the object literal that stores attempt data:
this.now                     = new Date()
this.attempt.now             = this.now
this.attempt.date            = this.convertDateObject()
this.attempt.name            = "jjjj"
this.attempt.email           = "xxx@yyy"
this.attempt.usedCards       = this.usedCards
this.attempt.userAttempt     = this.userAttempt
this.attempt.playPack        = this.playPack
this.attempt.timeTaken       = this.props.timeTaken
this.attempt.incorrect       = this.numberOfIncorrect
this.attempt.correct         = this.numberOfCorrect
this.attempt.total           = (this.numberOfCorrect + this.numberOfIncorrect)

// Now JSONify the attempt object literal (for mongoDB):
this.attemptJSONified = JSON.stringify(this.attempt)

// Now send the JSONified attempt object and the attempt object to the Controller (which will send it to the Model):
myController.someObject.rxDataForModel([this.attemptJSONified, this.attempt])

// NOw hide the save modal panel:
this.setState((state, props) => {
        return {
                showSaveModal: false
                }
                                }
             ) // end setState

                            } // end saveAndSendToModel

// --------------------------------------------------------- //

// A function to convert a JS Date object into a string of the type "13/10/19":
// Function saveAndSendToModel will call this function to save the date of the
// attempt:
// Need to create a string like "12.21 Wed 28 Jul 2019"
convertDateObject = () => {

this.minutesString = this.now.getMinutes()
this.hoursString   = this.now.getHours()

this.dayString  = this.now.getDay() // gives "3" for Wednesday
switch (this.dayString) {
    case 0:
this.dayString = "Sunday"
        break;
    case 1:
this.dayString = "Monday"
        break;
    case 2:
this.dayString = "Tuesday"
        break;
    case 3:
this.dayString = "Wednesday"
        break;
    case 4:
this.dayString = "Thursday"
        break;
    case 5:
this.dayString = "Friday"
        break;
    case 6:
this.dayString = "Saturday"
        break;
    default:
this.dayString = "Some day"
        // execute default code block
                        } // end switch

this.dateString  = this.now.getDate() // gives "19"


this.monthString = this.now.getMonth() // gives "6" for July
switch (this.monthString) {
    case 0:
this.monthString = "January"
        break;
    case 1:
this.monthString = "February"
        break;
    case 2:
this.monthString = "March"
        break;
    case 3:
this.monthString = "April"
        break;
    case 4:
this.monthString = "May"
        break;
    case 5:
this.monthString = "June"
        break;
    case 6:
this.monthString = "July"
        break;
    case 7:
this.monthString = "August"
        break;
    case 8:
this.monthString = "September"
        break;
    case 9:
this.monthString = "October"
        break;
    case 10:
this.monthString = "November"
        break;
    case 11:
this.monthString = "December"
        break;
    default:
this.monthString = "Some month"
        // execute default code block
                        } // end switch

this.fullYearString = this.now.getFullYear()

this.timeDateString = this.hoursString + ":" + this.minutesString + ", " + this.dayString + " " + this.dateString + " " + this.monthString + " " + this.fullYearString

return this.timeDateString

                           } // end convertDateObject








////////////////// A section to do with dragging a panel ////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// The following function responds to the onMouseDown of the wrapping div of the
// <FloatingPanel> child component. It has two purposes:
// 1) it adds event listeners to the window object
// 2) it sets state properties that store the clientX and clientY values of the
//    mouse on mousedown

addListenerToWindow = (e) =>{
    window.addEventListener("mousemove", this.movePanel) ;
    window.addEventListener("mouseup",   this.removeEventListenerFromWindow) ;


    e = e || window.event;
        e.preventDefault();

// set the appropriate state property values to clientX and y at mousedown:

    // get the mouse cursor position at startup and set it to state properties:
this.setState({
pos3: e.clientX,
pos4: e.clientY
              })
                          } // end addListenerToWindow

// In reality the following function will remove the event listeners from the
// window object:
removeEventListenerFromWindow = () => {
window.removeEventListener("mousemove", this.movePanel);
window.removeEventListener("mouseup", this.removeEventListenerFromWindow);
                                      }

// In reality the following function will calculate dx and dy and set state
movePanel = (e) => {
    e = e || window.event;
    e.preventDefault(); //
    // calculate pos1 & pos2, ie dx & dy:

// Then set left and top of the div in question like this:
// left = left + pos1
// top  =  top + pos2

this.setState( (prevState) => ({
    // remember that pos1 and pos2 are strings but pos3 and pos4 are numbers!!
        pos1: `${e.clientX - prevState.pos3}px`, // dx, a number -- NOT USED!!
        pos2: `${e.clientY - prevState.pos4}px`, // dy, a number -- NOT USED!!
        pos3: e.clientX, // a number - Reset pos3 to the new current mouse x
        pos4: e.clientY, // a number - Reset pos4 to the new current mouse y
        left: prevState.left + e.clientX - prevState.pos3,
        top:  prevState.top + e.clientY - prevState.pos4
        // in js, adding a string to number produces string (not relevant here!).

                               })
             )  // end call to setState

                   } // end movePanel

//////////////// End of section to do with dragging a panel ///////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


  render() {

    return (
<div className = {styles.recallAreaPrettifying} >
{/* The div above is the recall cards area, where the user indicates his recall
    of each card memorised. Need a max of 52 in four rows of 13: */}

{/*First make the <RecallCard>s. There will be a max of 52 arranged in rows of
    13.  : */}
{this.makeAllRowsOfCards()}

{/*Now a <p> for text that tells the user how many cards they've tried to
    memorise*/}
<p className = {styles.numberOfCardsText} >
You have tried to memorise {this.props.noOfCardsToRecall} cards.
</p>

{/* Now a <p> for text that tells the user how much time they took to memorise
    the cards */}
<p className = {styles.timeTakenText} >
Time taken: {this.props.timeTaken}
</p>

{/* Now a button that the user will click to check how many cards were memorised
     correctly. this button will compare the usedCards
     array with an array of cards rxed from CardMenu*/}
<div className = {styles.positionCheckButton}>
<PurpleButton
buttonText = "Check"
clickResponseFunction = {this.check}
disabledYesNo = {this.state.disabledYesNo}
/>
</div>

{/* Now a button that the user will click to close the <RecallArea>*/}
<div className = {styles.positionCloseButton}>
<PurpleButton
buttonText = "Close/save"
clickResponseFunction = {this.respondToClose}
/>
</div>


{/*Now a block of jsx that code renders conditionally, when the state
    variable showSaveModal is true*/}
<div>
{ this.state.showSaveModal ?
    <SaveModal
    headerText = "Do you want to save your attempt?"
    closeRecallArea = {this.props.closeShowRecallArea}
    saveAndSendToModel = {this.saveAndSendToModel}
    />
    :
    '' }
</div>


{/*Now a block of jsx that code renders conditionally, when the state
    variable showTicksAndCrosses is true*/}
<div>
{ this.state.showTicksAndCrosses ? this.crossesAndTicks.slice(0, this.props.usedCards.length) : '' }
</div>


{/* ------- The floating panel. This panel pops up when the user wants to see
their previous attempts, ie after hitting the "Previous attemps" button. This
component displays a table of previous attempts --- */}
{ this.state.showPreviousAttempts ?
<div
onMouseDown = {this.addListenerToWindow}
style = {{position: this.state.position, left: (this.state.left + "px"), top: (this.state.top + "px") }}
>
<FloatingPanelNEW
    dataFromModel = {this.state.dataFromModel}
/>
</div>
: ""
}

{/* --- Now a button that user clicks to show previous attempts in the floating panel --- */}
<div className = {styles.positionShowPreviousAttemptsButton}>
<PurpleButton
buttonText = "Show/hide previous attempts"
clickResponseFunction = {this.changeShowPreviousAttempts}
/>
</div>




</div>
           );
            } // end render
                                           } // end class def

export default RecallArea;
/*
closeRecallArea = () => {
this.setState((state, props) => {
        return {
                showTicksAndCrosses: false
                }
                                }
              ) // end setState



                         } // end closeRecallArea

*/
/*
*/
