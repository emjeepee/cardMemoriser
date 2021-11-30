/*
Structure
---------
<App>
    <RecallArea>
        <RecallCard>
            <CardMenu>

This component serves two purposes:
1) To display <RecallCard>s, in which the user indicates his guess for a card
recall
2) To check whether each attempt is correct or not and put a large red X or a
large green tick over each <RecallCard> to show which ones were correct guesses
and which were not

This component has children <RecallCard>s, each of which has child <CardMenu>.
Code passes references to this component's getCardNumber and getCardSuit
functions to <RecallCard>, which passes the reference to getCardNumber (only) to
<CardMenu>. These are the paths by which code sends card number(/pic) and card
suit to this component.
A <RecallCard> is a card-shaped rectangle that in its top four fifths or so
contains four squares in a square. Each small square is clickable and contains a
picture of a suit. Below the four suit squares is a dd list that the user clicks
on to select the number of the card (1 to K) that he thinks is there.

This component calls a number of <RecallCard>s equal to the number of cards the
user tried to memorise.

Functioning
===========
1) componentDidMount fills array userAttempt with 52 objs empty of data. Each
obj will hold data that represents the user's attempt at a recall of a card (the
data being the n in "nth card", suit and card number (1 to K))
2) Parent <App> sends this component an array containing objs each representing
the actual cards the user overturned. This array goes into this.usedCards
3) Code creates <RecallCard>s equal in number to the number of cards overturned.
A <RecallCard> is where the user selects suit and number of card in his attempt
to recall a card
4) User clicks in appropriate areas of each <RecallCard> to indicate what he
thinks that card was. That data (n in "nth card", suit and card number (1 to K))
goes into the appropriate obj in array userAttempt
5) When user clicks the "Check" button code compares the actual cards the user
tried to memorise (in array usedCards) with those the user thinks he overturned
(in array userAttempt).
When the cards are the same code pushes an object into array result. That object
has a "status" property set to "correct". When the cards don't match (ie the
user's guess was wrong) code pushes an obj into array result with status
property set to "incorrect".
Code fills array crossesAndTicks with member arrays, each containing the jsx for
either one cross or one tick.
In the return statement of the render() function code conditionally renders the
contents of array crossesAndTicks if state.showTicksAndCrosses === true.
Ba da bing ba da boom!

*/

// <App> gives this component this.props.usedCards, which <App> sets to an
// <App> state property value that is an array containing the cards that the
// user has overturned. There may be less than 52 cards in this.props.usedCards
// (because the user may have stopped overturning cards after, say, 17 cards).

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
import styles from './myCSSfiles/RecallAreaNEW.module.css';

class RecallAreaNEW extends React.Component {

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
// First a fn in componentDidMount to fill array userAttempt with 52 objects of
// key-value pairs where there are no values to the properties of those 52
// objects. Each object at indexes [1] to [52] represents a card that shows the
// user's attempt to recall an actual card he overturned. Code will later give
// those object properties values. componentDidMount() makes userAttempt look
// like this:
// [
// {id: 0, date: null},
// {id: 1, suit: "",  number: "", card: ""},   etc,  etc,
// {id: 52, suit: "",  number: "", card: ""} -- ie objs contain no data
// ]
componentDidMount() {
this.userAttempt = this.makeArrayUserAttempt()
                    } // end componentDidMount
// ---------------------------------------------------------------- //
// A var to hold an empty array.
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

// This is an array that code fills with objects that each have a property
// "status". Code sets that property to "Correct" or "Incorrect" depending on
// whether a comparison between the user's guess and the actual card overtuned
// matches or not:
result = []

// ---------------------------------------------------------------- //
// componentDidMount calls the following fn to fill array userAttempt with
// objects. Each object represent a card that the user tried to memorise:
makeArrayUserAttempt = () => {
this.anArray = new Array()
// Create an object at indx[0] to hold info about the user's attempt as a whole:
this.anArray.push( {id: 0, date: null} )
// The next line means value of property id will represent "n" in "nth card":
for (var i = 1; i < 53; i++) {
this.anArray.push( {id: i, suit: "",  number: "", card: ""} )
                              } // end for loop
return this.anArray
// this.anArray now contains 52 objects that look like this:
// {id: 29, suit: "",  number: "", card: ""} -- ie contain no data
                                } // end makeArrayUserAttempt


// componentDidMount has set the following array to return value of
// makeArrayUserAttempt() (see immediately above). This array contains
// 52 objects that contain no data and look like this:
// {id: 0, date: null} ,
// {id: 1, suit: "",  number: "", card: ""} … , … , …
// {id: 51, suit: "",  number: "", card: ""}
userAttempt = []
// ---------------------------------------------------------------- //

// The following four arrays will contain <RecallCard>s, of which there will be
// four rows. Of course, not all of these arrays will contain recall cards
// (because the user may have tried to remeber less than 52 cards):
firstRow  = [ ] ;
secondRow = [ ] ;
thirdRow  = [ ] ;
fourthRow = [ ] ;

// This array holds member arrays. Each member will contain the jsx for a cross
// or a tick that will go over a <RecallCard> after the user clicks the "Check"
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

//---------------------------------------------------------------//

// {/*   {this.props.closeShowRecallArea}    respondToClose  */}

// This function responds to the click of the "Close" button. It:
// 1) calls function closeShowRecallArea of <App> (passed in to this component
// as props)
// 2) sets state property showModal to true:
respondToClose = () => {
this.setState((state, props) => {
        return {
                showSaveModal: true
               }
                                }
              ) // end setState
                        } // end respondToClose

// --------------------------------------------------------- //
// At launch of this app this.userAttempt contains 52 objects, each representing
// a card. If the user has tried to memorise, say, only 20 cards the
// <RecallArea> will show 20 <RecallCard>s. Each <RecallCard> is a card-shaped
// rectangle where the user tells the app:
// "I think this -cardOrdinal-th card was the -cardNumber- of -cardSuit-".
// The user does this by clicking one of four suit squares and selecting a card
// number from a dd list (of 13 options, 1 , 2, etc to Q, K).
// Code needs to populate the relevant members of array this.userAttempt with
// values for what the user thinks the card in question's number and suit is.
// Code gives the following two functions as props to <RecallCard>. <RecallCard>
// Then gives its child <CardMenu> one of them as props.
// When code calls makeAllRowsOfCards, which calls makeArow, which renders each
// <RecallCard>, each <RecallCard> has a reference to these functions. Clicking
// the suit pic in a <RecallCard> calls getCardSuit, giving it the two args
// required; clicking the dd list of <CardMenu> calls getCardNumber, giving
// it the args required. This is how code populates the userAttempt array as
// the user clicks in the suit image and dd list of each <RecallCard>.
// cardOrdinal below is the n in "nth card".
// Remember that array userAttempt starts off containing 52 objects, like this:
// [ {id: 0, date: null,}
//   {id: 1,  suit: "",  number: "", card: ""}, etc
//   {id: 52, suit: "",  number: "", card: ""} ] -- ie with no data in them.
// So arg cardOrdinal below must be 1-52:
getCardNumber = (cardNumber, cardOrdinal) => {
this.userAttempt[cardOrdinal].number = cardNumber ;
                                             } // end getCardNumber

getCardSuit = (cardSuit, cardOrdinal) => {
this.userAttempt[cardOrdinal].suit   = cardSuit   ;
                                         } // end getCardSuit
// --------------------------------------------------------- //

// The following funtion responds to the user's click of the "Check" button. It
// concats the "cardH" and "6" property values in each object in array
// userAttempt and puts them in each object's property "card" (eg as "cardH6"):
check = () => {
// Remember that userAttempt starts off containing 53 objects and looks like
// this:
// [
// {id: 0, date: null},
// {id: 1, suit: "",  number: "", card: ""},   etc,  etc,
// {id: 52, suit: "",  number: "", card: ""} -- ie objs contain no data
// ]
// Now truncate array userAttempt so that it is only as long as array usedCards
// (which holds the cards the user actually overturned and tried to memorise):
this.userAttempt = this.userAttempt.slice(0, (this.props.usedCards.length+1));
// Now set the state property that determines whether the check button is
// disabled or not (here disabling the button now that it has been clicked):
this.setState((state, props) => {
        return {
                disabledYesNo: false
                }
                                }
              ) // end setState

// Now concatenate the suit and number properties of each object in userAttempt
// and put the result in the object's "card" property:

for (var i = 1; i < (this.props.usedCards.length + 1) ; i++) {
this.userAttempt[i].card = this.userAttempt[i].suit + this.userAttempt[i].number + ".svg"
                                                             } // end for loop

// So now array userAttempt contains objects each of which looks like this:
// [
// {id: 0, date: null},
// {id: 1, suit: "cardH" , number: "7" , card: "cardH7"},
// {id: 2, suit: "cardD" , number: "3" , card: "cardD3"},
// etc, etc
// ]

//

// Now call fn compare(), which will populate array result so that it ends up
// looking like this:
/*
[
    {id: 1 , status: "incorrect"} ,
    {id: 2 , status: "correct"} ,
    etc
]
*/
// Where each object in array shows whether the user's memorisation attempt
// for a card was correct or not (so in example above the user failed to get
// card 1 right but succeeded in the case of card 2)
// compare() also calls showResult(), which looks at array result to find out
// which <RecallCard>s should have a red cross and which a green tick. It then
// draws those crosses and ticks.
this.compare()

              } // end check

// --------------------------------------------------------- //

// Now a function that is part of a chain of functions that fire after the user
// clicks the "check" button. This fn
// i)   compares each user-attempt card to each actual card overturned
// ii)  puts into array result objects each of which shows whether the user's
//      recall of a card was right or not (by setting each obj's 'status'
//      property to 'correct' or 'incorrect').
// Remember that userAttempt looks like this:
// [
// {id: 0, date: null},
// {id: 1, suit: "cardH" , number: "7" , card: "cardH7"},
// {id: 2, suit: "cardD" , number: "3" , card: "cardD3"},
// etc, etc
// ]
// whereas this.props.usedCards looks like this:
// [
// {id: 0, suit: "cardH" , number: "7" , card: "cardH7"},
// {id: 1, suit: "cardD" , number: "3" , card: "cardD3"},
// etc, etc
// ]

compare = () => {
// First reset result. This is essential:
console.log( "<RecallArea> here. this.props.usedCards.length is " + this.props.usedCards.length )
this.result = []
for (var i = 0; i < this.props.usedCards.length; i++) {
// If user's attempt matches actual card overturned (remember that userAttempt
// contains at indexes [1] to [52] objects that represent cards ):
if (this.props.usedCards[i] === this.userAttempt[i+1].card ) {
this.result.push({id: i , status: "correct"})
                                                            } // end if
//
if (this.props.usedCards[i] !== this.userAttempt[i+1].card ) {
this.result.push({id: i , status: "incorrect"})
                                                            } // end if
                                                       } // end for
// So now array result will look something like this:
/*
[
    {id: 1 , status: "incorrect"} ,
    {id: 2 , status: "correct"} ,
    etc
]
*/
// console.log("<RecallArea> here. result has " + this.result.length + " members" )
// console.log("<RecallArea> here. status of result[0],[1] is: " +
// this.result[0].status + " and " + this.result[1].status)
// Now call the function that displays crosses and ticks over the <RecallCard>s
// to show how well the user did:
this.showResult()
                } // end compare

// --------------------------------------------------------- //

// Fn check() calls compare(), which calls the following fn, which displays the
// result of the user's attempt because it fills array crossesAndTicks with
// member arrays, each containing the jsx for either one cross or one tick:
showResult = () =>{
// First remove the existing crosses and ticks. This is essential:
this.crossesAndTicks = []
// Call fn makeCrossesAndTicks four times max (for four rows max). That fn will
// fill array this.crossesAndTicks with member arrays each containing jsx for a
// cross or a tick:
for (var i = 0; i < this.props.usedCards.length; i++) {
this.makeCrossesAndTicks(6,-1,13,this.result,i,"40px", `${20 + ((i)*71)}px`)
this.makeCrossesAndTicks(6,12,26,this.result,i,"180px", `${20 + ((i-13)*71)}px`)
this.makeCrossesAndTicks(6,25,39,this.result,i,"320px", `${20 + ((i-26)*71)}px`)
this.makeCrossesAndTicks(6,38,52,this.result,i,"460px", `${20 + ((i-39)*71)}px`)
                                                      } // end for
// Set value of state property showTicksAndCrosses to true:
this.setState((state, props) => {
        return {
                showTicksAndCrosses: true
               }
                                }
             ) // end setState
                  } // end showResult
// --------------------------------------------------------- //

// The following fn will put a big red semi-opaque cross or a green tick over
// each <RecallCard> depending on whether the user recalled it correctly or not. /
// It fills array this.crossesAndTicks with member arrays, each of which
// contains the jsx for a cross or a tick.
// Fn showResult() calls this fn in a for loop.
// zIndex = what you'd expect
// iArg = iterating var of calling fn's for loop
// arrayArg = array result (which contains objects each with an id property
// and a status property that has value "correct" / "incorrect" depending on
// whether the user has recalled that particular card correctly or not)):
// iMin, iMax = for row 1 = -1 and 13, row 2 = 12,26, row3 = 25,39, row 4= 38,52
// top, left = coords for the cross/tick
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
// This function will make a row of <RecallCard>s when you feed it empty array
// row (eg this.thirdRow) and other stuff. Remember that this function gets
// called in function makeAllRowsOfCards, which contains a loop (whose iterating
// var is represented by iArg below). makeAllRowsOfCards gets called every time
// this component redraws
// xxxxxxxxxxxxxxxx
makeArow = (cardZindex, iMin, iMax, row, iArg, cardTop, cardLeft, numberTop, numberLeft) => {
if (iArg < iMax && iArg > iMin) { // eg for row 1, if iArg < 13 && > -1.
// row below is empty array representing nth row of max 13 cards, where n =1-4.
// I have used ordinalNumber = {iArg + 1} below because the cards in array
// userAttempt are at indexes 1-52 (at index[0] is an obj that contains data
// about date) and the loop in which code calls this fn goes from i=0 to i=51.
row.push(
    <div>
    <div style={{zIndex: cardZindex , position: "absolute" , top: cardTop, left: cardLeft }}>
        <RecallCard
        getCardNumber = {this.getCardNumber}
        getCardSuit = {this.getCardSuit}
        ordinalNumber = {iArg + 1}
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

// This function makes up to four rows of up to 13 <RecallCard>s. So if the user
// tried to memorise only 29 cards this function would make two complete rows of
// 13 cards and one row of 3 cards:
makeAllRowsOfCards = () => {
// usedCards is a props that this component gets from parent <App>. It's an
// array that contains the actual cards the user turned over in the memorisation
// attempt.

// First zero out the arrays representing each row. This takes care of the case
// in which the user clicks the "Next card" and "Back" buttons repeatedly. ???
// still necesssary???
this.firstRow  = []
this.secondRow = []
this.thirdRow  = []
this.fourthRow = []
// Remember that array usedCards always has one card in it ("start.svg"), hence
// to avoid drawing a <RecallCard> corresponsing to that card use
// (this.props.usedCards.length - 1) in the loop below:
for (var i = 0 ; i < (this.props.usedCards.length) ; i++) {

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










  render() {

    return (
<div className = {styles.recallAreaPrettifying} >
{/* The div above is the recall cards area, where the user indicates his recall
    of each card memorised. Need a max of 52 in four rows of 13: */}

{/*First make the <RecallCard>s. There will be a max of 52 arranged in rows of
    13.  Note that this function gets called when code draws/redraws this
    component, ie on change of state or parent state  */}
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
     correctly. clicking this button will make a fn compare the usedCards
     array with the cards in array userAttempt
 */}
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


{   /*Now a block of jsx that code renders conditionally, when the state
    variable showSaveModal is true. This is a panel that appears after the user
    has clicked the Close button and allows the user to save his memorisation
    attempt */}
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
    variable showTicksAndCrosses is true. NOTE the slice() method below seems
    unnecessary as this.crossesAndTicks will only ever contain the right
    number of crosses/ticks*/}
<div>
{ this.state.showTicksAndCrosses ? this.crossesAndTicks.slice(0, this.props.usedCards.length) : '' }
</div>


{/* ------- The floating panel. This panel pops up when the user wants to see
their previous attempts, ie after hitting the "Previous attemps" button. This
component displays a table of previous attempts --- */}
{ this.state.showPreviousAttempts ?
<div>
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

export default RecallAreaNEW;
/* */
/* */
