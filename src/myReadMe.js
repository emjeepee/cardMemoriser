/*

Where to begin
==============
1) in Terminal cd to either dir cardmemoriser or its parent myRememberCardsApp
(can't remember which! - just drag each folder to the terminal after the cd
command and try opening app in browser each time!)
2) enter " npm start  "
3) in browser go to http://localhost:3000
4) where is it stipulated that the local host server outputs stuff on port 3000?


HOW THIS APP WORKS
==================
1) Structure of component tree:
   ===========================
<App> --

        <Timer>
            <PurpleButton> click to start/stop timer
            <OverturnedCard> displays the card to remember
                    <PurpleButton> "First card"/"Next card"/ "Last card"/ "****"
                    click to change card
                    <PurpleButton> "Back". click to go back one card
                    <PurpleButton> "Reset" button. click to reset app

        <PurpleButton> "Reset" button. click to show <RecallArea>
        <RecallArea> --
            The is the big area to the right that appears only when
            the user clicks on button recall
            <Check> button, user clicks to check cards memorised
                        <>
                        <>
                        <>
                        <>


2) Operation of the <Timer> component
   ======================================
i)  user clicks start/stop button (a child of <Timer>), which has
event handler myStopStartTimerFunction, a member fn of <Timer>
ii) myStopStartTimerFunction checks the text of the button, which <Timer>
sets as a props of start/stop button <PurpleButton>.
iii) if the text of the button === "Start timer" myStopStartTimerFunction
runs with arg false. The fn calls setInterval and changes the text on the
button to "Stop timer". setInterval increments <Timer> state property
secondsElapsed every 1000ms.
    if the text of the button === "Stop timer" myStopStartTimerFunction calls
    with arg true. This fn stops the timer (by using clearInterval) and
    changes the text on the button to "Start timer".
iv) <Timer> member function getSeconds reads changing state property
secondsElapsed and returns it
<Timer> member function getMinutes reads changing state property
secondsElapsed, calculates minutes elapsed and returns that
<Timer> uses this.props.seconds and this.props.minutes in a <p> so that the
timer displays seconds and minutes as they mount

3) Operation of "Back" button
This button is a child of <OverturnedCard>. click calls <OverturnedCard> member
fn nextCardPlease with arg false. nextCardPlease calls Controller method
nextCardPlease with arg false. That Controller function decrements
Controller.someObject.numberOfClicks and …

--- fri12feb2021 description accurate up to here ---

4) Operation of the "Next card" button
This button is a child of <App>. The click handler is function forward, which
increments this.nextCardCounter and calls this.nextCardPlease(true).
this.nextCardPlease calls myController.someObject.nextCardPlease(true), which
has a newly shuffled deck of cards available in array playPack (which code
created on startup of the app and which code creates anew when the user hits
the "Reset" button) and from it gets the next card and puts it in <App>
non-state var nextCard, which it returns in the following array:
// [ this.startTheTimer ,      -- set to true
//   this.nextCard,            -- set to, for example, "cardCK.svg"
//   this.nextCardButtonText,  -- set to "Next card" / "Last card" / "******"
//   this.numberOfClicks,      -- set to this.numberOfClicks +1
//   this.timerButtonText      -- set to "Timer"
//   forwardBackward  ]        -- came from back or forward function (here true)

Code sets <App> (non-state) properties of the same names to these.
Code then sets state properties
nextCard: this.nextCard , and
nextCardButtonText: this.nextCardButtonText,
which causes a re-render of <App>

<App> child <ShowCard> rxes props showNextCardPlease = {this.state.nextCard},
and <ShowCard> shows the next card.

this.nextCardPlease(true) also starts the timer if this.nextCardCounter === 1.
When the user clicks the "Next card" button or the "Back" button, code
increments this.nextCardCounter, so the timer only starts if the user has
clicked upwards from 0 clicks to 1 click (and not down from n clicks to 1
click).

myController.someObject.nextCardPlease(true) gets the next card from array
playPack, which is a Controller member and is a shuffled dexk of cards. <App>'s
componentDidMount function calls myController.someObject.createShuffledDeck(),
which puts a newly shuffled deck of cards into Controller member playPack.
(Remember that Controller contains someObject, which is an object literal).



5) Operation of the "Recall" button
This button is a <PurpleButton> component and a child of <App>.
The clickResponseFunction of this button is <App>'s' recall(), which turns off
the stop
watch and gets from the Controller array usedCards (an array of the cards the
user has tried to memorise). recall() also sets <App> state
properties showRecallArea to true and usedCards to the array usedCards (rxed
from the Controller). The state change makes <App> re-render and causes
<RecallArea> to be shown (as showing it depends on the value of state property
showRecallArea). <App> gives <RecallArea> props usedCards =
{this.state.usedCards}, so <RecallArea> has access to an array of the cards that
the user has seen.


6) Operation of <RecallArea>
<App> gives <RecallArea> props usedCards = {this.state.usedCards}, ie an
array of all the cards the user has looked at in the pack.

When <App> causes <RecallArea> to render, the  <RecallArea> render function
contains {this.makeAllRowsOfCards()}. Function makeAllRowsOfCards calls function
makeArow four times, each time to make a row of 13 <RecallCard>s, which it puts
into arrays. makeAllRowsOfCards contains a for loop inside which it calls
makeArow, the args it passes to makeArow depepnding on the iteration var i.
Function makeAllRowsOfCards then returns those arrays:
return ([this.firstRow, this.secondRow, this.thirdRow, this.fourthRow]);
If the user has not looked at all 52 cards in the deck some of those arrays may
be empty. But each array contains members each of which is jsx for a
<RecallCard> component, including details about positioning.
A <RecallCard> is a "card" where the user indicates what he thinks the memorised
card in question is.
makeAllRowsOfCards knows how many to make because it rxed usedCards from <App>.
usedCards always contains the cards the user has seen, even if the user clicks
the "Recall" button and goes back to clicking "Next card" or "Back" some number
of times. When the user clicks the "Recall" button again code updates usedCards
and sends it to <RecallArea>.

i) Operation of the "Check" button
Each <RecallCard> that this.makeAllRowsOfCards creates has a reference to
<RecallArea> functions getCard and getSuit, which the user triggers by selecting
the suit and card number in each <RecallCard>.
<RecallArea> has a non-state propery called userAttempt, an array of 52 objects,
each of which has properties suit and number. Clicking on a suit in a
<RecallCard> calls <RecallArea>'s getSuit, which sets the suit property of one
of those objects to the suit the user picked in the <RecallCard>. The object's
number property is similarly set to the <RecallCard>'s card number. So the array
userAttempt ends up looking like this:
[
{id: 0, suit: "spades",  number: "3", card: ""},
{id: 1, suit: "hearts",  number:"6", card:""},
{id: 2, suit: "hearts",  number: "Jack", card: ""},
{id:3 , suit: "clubs",   number:"King", card:""},
…
…
]

The "Check" button has a click response Check(), which concats the suit and
number properties of each object in userAttempt and puts the result in the card
property, so when the user clicks the button, userAttempt looks like this:
[
{id: 0, suit: "spades",  number: "3", card: "spades3.svg"},
…
…
{id: n, suit: "hearts",  number: "7", card: "hearts7.svg"}
]

where n = the number of cards the user has tried to recall.
So now userAttempt and usedCards have the same number of objects, ie n.

Check() then calls compare(), which compares a member in usedCards with the
corresponding member in userAttempt. Where they agree compare() puts an object
in <RecallArea> non-state property array result with property status set to
"correct". Where they disagree the object's status property is set to
"incorrect". So array result looks like:

[       {id: 1 , status: "incorrect"} ,
        {id: 2 , status: "correct"} ,
        …
        …
]

So array result has n members.

Compare() then calls ShowResult, which looks at array result. Where the function
sees an object in array result that has status property value "incorrect", it
draws a red cross. Where it sees an object with status property value "correct",
it draws a green tick.
ShowResult does this by calling makeCrossesAndTicks for each row of
crosses/ticks.

If while <RecallArea> is still visible the user then continues to click the
"Next card" or "Back" button the following happens:
1) causes <App> state property usedCards to be updated, hence
2) triggers a re-render of <App> and hence <RecallArea>, which means <RecallArea>
gets sent usedCards anew.
3) need to get array result in <RecallArea> to reflect usedCards in
<RecallArea> (ie the number of objects in array result must be the same as the
number in usedCards



7) Operation of "Close/save" button (a child of <RecallArea> )
=====================================
Clicking this button should:
i)     stop the timer
ii)    clear the <RecallArea>
iii)   clear the <RecallArea> arrays result, userAttempt and
iv)     gather this info and put it into an object to send to the Model (via the
Controller)
a) datestamp -- use JS date object
b) cards memorised -- from array userAttempt
c) cards overturned -- from array usedCards
c) time taken -- from timer

Note that the user will recover this info by clicking the "Show previous attempts" button.

8) Operation of "Show previous attempts" button (a child of <RecallArea> )
=====================================
Clicking this button should:
i)    get data concerning previous attempts from the Model
ii)   cause code to send that data to <Table>.
<FloatingPanel> is a child of <RecallArea>
<Table> is a child of <FloatingPanel>
iii)
Clicking this button calls function changeShowPreviousAttempts of <RecallArea>.
That function toggles state property showPreviousAttempts, which starts off as
false. Also if showPreviousAttempts is false this function changes state
property


Remember that the user attempt data goes into localStorage in this form:
[
    { … … … date: xxxxxx, incorrect: 2, correct: 12 … … … },
    { … … … date: xxxxxx, incorrect: 2, correct: 12 … … … },
    …
    …
]

*/

/*
1- princess Di
2 - Noah
3 - ma
4 - Ra
5 - law
6 - jaw
7 - key
8 - fa (dolphin)
9 - bee
10 - Daz
11 - tit (blue tit)
12 - tin (Sprite) or tan (Bob Downe)
13 - dam
14 - door
15 - dill or dal
16 - Dodge (Ram)
17 - Duke (of Edinburgh)
18 - Daffy (Duck)
19 - Dubya (Bush) or dab (glass thing)
20 - Nose
21 - Nude
22 - Naan
23 - Neem
24 - Noor
25 - Nail
26 - Gnash
27 - Nuke
28 - knife
29 - Nib
30 - Moss
31 - Mad (Alfred E Neumann)
32 - Mane (of lion)
33 - Mime
34 - Mare
35 - Mole
36 - Mash (Alan Alda)
37 - Mike (sound transducer)
38 - Muff (yes, that!)
39 - Map
40 - Rice
41 - Rat
42 - Rain
43 - Ram (the animal)
44 - Rear (part of female anatomy)
45 - Rail
46 - Ridge
47 - Rake
48 - Reef
49 - Rope
50 - Lace
51 - Light
52 - Alan (Partridge)

clubs
====
1 - cat
2 - cane
3 - cam
4 - car
5 - cala (lily)
6 - cage
7 - cake
8 - coffee
9 - cab
10 - case
J11 - cadet
Q12 - cotton
K13 - club

diamonds
========
1 - dad
2 - don (Corleone)
3 - dime
4 - deer
5 - dial (old telephone)
6 - dosh
7 - ditch
8 - dove
9 - dobby (from telly)
10 - dice
J11 - deadwood
Q12 - deaden
K13 - diamond


hearts
====
1 - hat
2 - hen
3 - ham
4 - hare
5 - hail
6 - hedge
7 - hatch
8 - hive
9 - heeb
10 - hose
J11 - hooded
Q12 - heathen
K13 - heart

spades
====
1 - sad (emoji)
2 - san
3 - sam (missile)
4 - sari
5 - sail
6 - sash
7 - sack
8 - safe
9 - saab
10 - seas
J11 - suited
Q12 - satan
K13 - spade

*/
































//
