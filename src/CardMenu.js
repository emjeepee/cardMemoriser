// NOTE NOTE NOTE  see important note near bottom!!!
// (you cannot use onClick = {this.setSelectedCard(thing)}
// above. if you do React says, in effect, you have created an infinite loop!)
// NOTE NOTE NOTE


/*
This component shows only a menu of buttons, each representing a menu option (a
card). The user clicks on a menu and the card number(/pic) only (eg "K") gets
sent up the chain to the parent (<RecallCard>).
Function sendCardDetailsUpChain responds to the user's selection of a menu
option and sends the card number(/pic) to <RecallCard>

*/

import React from 'react';
import styles from './myCSSfiles/CardMenu.module.css';


class CardMenu extends React.Component {

    constructor(props) {
       super(props);

this.state = {
  selectedCard: "Card?" ,
  display: false,

// Each of the 13 css styles below (styles.menuOne to styles.menuKing) differs
// from the other 12 only in the value for its 'top' css attribute. :
  arrayOfDDlistOptionStyles: [
  { id: 0,   code: "1",   card: "1" ,      CSSclass: `${styles.menuOne}`   },
  { id: 1,   code: "2",   card: "2" ,      CSSclass: `${styles.menuTwo}`   },
  { id: 2,   code: "3",   card: "3" ,      CSSclass: `${styles.menuThree}` },
  { id: 3,   code: "4",   card: "4" ,      CSSclass: `${styles.menuFour}`  },
  { id: 4,   code: "5",   card: "5" ,      CSSclass: `${styles.menuFive}`  },
  { id: 5,   code: "6",   card: "6" ,      CSSclass: `${styles.menuSix}`   },
  { id: 6,   code: "7",   card: "7" ,      CSSclass: `${styles.menuSeven}` },
  { id: 7,   code: "8",   card: "8" ,      CSSclass: `${styles.menuEight}` },
  { id: 8,   code: "9",   card: "9" ,      CSSclass: `${styles.menuNine}`  },
  { id: 9,   code: "10",  card: "10" ,     CSSclass: `${styles.menuTen}`   },
  { id: 10,  code: "J",   card: "Jack" ,   CSSclass: `${styles.menuJack}`  },
  { id: 11,  code: "Q",   card: "Queen" ,  CSSclass: `${styles.menuQueen}` },
  { id: 12,  code: "K",   card: "King" ,   CSSclass: `${styles.menuKing}`  }
                  ]
              } // end state
                      } // end constructor
// ---------------------------------------------- //
// setSelectedCard() responds to user's click of menu option in dd list of cards
// and calls the following fn, which sends the card's details incl number (eg 3,
// Jack, 7) up the chain to <RecallArea>.
// this.props.ordinalNumber is the n in nth card memorised.
// The arg 'selected' is ultimately an obj from arrayOfDDlistOptionStyles, hence
// selected.code is the card number/pic (eg "J", "7" or "K" --see array above).

sendCardDetailsUpChain = (selected) => {
this.props.getCardNumber(selected.code) // selected.code is a string
                                        } // end sendCardDetailsUpChain

// ---------------------------------------------- //
// This fn responds to the click of the dd list header (just a button that
// reads "Card?"). This fn toggles the value of this.state.display, which starts
// off as false
makeDDlistVisible = () => {
    this.setState(prevState => ({
        display: !prevState.display
                }))
                          } // end makeInvisible

// ---------------------------------------------- //
// This fn takes as argument an object of the form
//  { id: 10, code: "J", card: "Jack" , CSSclass: `${styles.menuJack}` }.
// This fn responds to the click of a menu option from the dd list for cards.
setSelectedCard = (selected) => {
this.sendCardDetailsUpChain(selected) ;
this.setState({
                    display: false,
                    selectedCard: selected.card
                    })// end setState
                                } // end setSelectedCard

// ---------------------------------------------- //

render() {

return <div>
{/* Above is all-enclosing rectangle for the header and menu  */}
{/* Below is the dropdown list header (a rectangle that says "Card?"). When the
 user clicks on it the value of the display state property toggles*/}
<div className = {`${styles.ddListHeaderPositionAndPrettify}`}
onClick = {this.makeDDlistVisible}
style = {{ zIndex: 1}}
>
{/* Below is text that will hold the name of the card selected by the user from
    the ddlist */}
<p className = {`${styles.ddListHeaderText}`}>
    {this.state.selectedCard}
</p>
</div>
{/* The dd list */}
{/*Below is a div that encloses the dd list menu. It dis/appears depending on
    the value of this.state.display, which toggles when the user clicks the menu
    header (a box that reads "Card?") */}
<div
style = {{ display: this.state.display ? "block" : "none" }}
>
{/*Menu options follow*/}
{/*Remember: id below is 0 indexed and this.state.arrayOfDDlistOptionStyles is
    an array*/}
{/* map below churns out 13 buttons, each with different value for css attrib
    top and the first 10 buttons having a different width to the last three
    (which are for cards J, Q and K), each button also having different text
    ("1" to "King")
    Code gives each menu option (1 to King) two CSS styles:
    i) `${thing.CSSclass}`, which positions the menu option and
    ii) either ${styles.commonToAllNumberMenusInDDlist}` or
        `${styles.commonToAllPictureMenusInDDlist}`, which
    NOTE: there's redundancy here!!! shorten!!
        */}

{
this.state.arrayOfDDlistOptionStyles.map(thing =>
    <button className = { (thing.id < 10) ? `${thing.CSSclass} ${styles.commonToAllNumberMenusInDDlist}` :
    `${thing.CSSclass} ${styles.commonToAllPictureMenusInDDlist} `
                        }
    key = {thing.id}
    onClick = {() => this.setSelectedCard(thing)}
    >
    <p className = {`${styles.cardTextNumbers}`} >{thing.card} </p>
    </button>
                                        ) // end map function
// NOTE NOTE NOTE  you cannot use onClick = {this.setSelectedCard(thing)}
// above. if you do React says, in effect, you have created an infinite loop!
//  NOTE NOTE NOTE
}
</div>

</div>


         } // end render

} // end class CardMenu

export default CardMenu
