// This is part of the cardmemoriser app
/*
<ShowCard> is where the app displays the next card when the user clicks the
button "Next card" (which is a <PurpleButton> component).

There will be six <PurpleButton>s:
1) "Next card"
2) "Pause"
3) "Finished"
4) "Show times"
5) "Reshuffle and reset"
6) "Accuracy" (at the bottom of the <RecallArea>)

When the user has flipped the 51st card, the "Next card" button must read
"Last card"

A timer has to show to the left of the buttons. Preferences will allow the user
to hide the timer. The timer stops when the user clicks a button entitled
"Finished".

A "Pause" button will pause the process.

A third button entitle "Show times" will present a graph of the historic times
the user has taken to complete the task.

User should be able to select the number of cards on which to practise.

A large area to the right of <ShowCard> appears when the user hits the "Finished"
button. This area, called <RecallArea> will have four rows of 13 rectangles.
Each rectangle will represent the nth card and will allow the user to select
the suit and the number of the card. A button labelled "Accuracy" will show
crosses on all incorrect cards and display in a div the percentage accuracy of
recall.

operation
=========
One of the children of this component is <StopWatch>, which has three children:
1) A <PurpleButton> for starting the stopwatch
Clicking this button triggers a function in <StopWatch> to start the stopwatch
2) A <PurpleButton> for stopping the stopwatch
Clicking this button triggers a function in <StopWatch> to stop the stopwatch
3) A <p> that contains the text for the timer itself.

One child of this component is <ShowCard>, which has two children:
1) an enclosing div
2) an <img> . Code changes the src attribute of this child to show different
images. It does this by:
The user clicks button "Next card" (a <PurpleButton> child of <App>), whose
click handler randomly selects one of 52 strings, each string representing a
card. The handler stores the string in state and passes it as props to the
<ShowCard> child of <App>. <ShowCard> sets it <img> child's src attrib to the
string (thus changing the card shown).
Clicking the "Next card" button also has to start the timer in the <StopWatch>
child of <App>.

*/

// NOTE var myBusinessLogic = require('./myBusinessLogic') NOTE NOTE NOTE NOTE
// NOTE or myController = require('./Controller')  NOTE NOTE NOTE NOTE
