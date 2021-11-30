// Part of the structure of this app:
// <App>
//      <RecallAreaNEW>
//             <RecallCard>
//                  <CardMenu>

// This component and its child, <CardMenu>, send data up the chain to this
// component's parent <RecallArea>. That data is card number(/pic) and suit.

// This component is a card-shaped rectangle where the user states what he
// thinks the card number and suit is for the card in question.
// This component contains a square consisting of four smaller squares, each
// showing an image of a suit.
// The user clicks one of these squares to indicate that he thinks the nth card
// was of that suit. That square becomes opaque & the other three squares fade.
// Each suit square's click response is the same fn. That fn
// i)  sets a state property to true to indicate which suit the user has chosen.
//     eg selectClubsSuit: true
//     The style for the suit square depends on this value. If true, the suit
//     square becomes opaque; false => faded
// ii) calls a function in parent component <RecallArea>, feeding it the suit of
//     the card in question and the ordinal number of the card

// This component has a child component, <CardMenu>), which provdes a
// dd list where the user selects a card number (ie
// 1-King). The click response fn of the dd is an fn in the parent that sets the
// appropritate value of a property in the appropriate object in userAttempt to
// the card number.
//
// The <RecallArea> component calls this component (a number of times equal to
// the number of cards the user has tried to memorise).
//

import React from 'react';
import CardMenu from './CardMenu';
import styles from './myCSSfiles/recallCard.module.css';


//class RecallCard extends React.Component {
class RecallCard extends React.PureComponent {

    constructor(props) {
      super(props);

      this.state = {

        suit: null,

        selectClubsSuit:    false,
        selectDiamondsSuit: false,
        selectHeartsSuit:   false,
        selectSpadesSuit:   false,

        styleForOpaqueIMG: {
        position: "absolute",
        top: "-2px",
        left: "3px",
        maxWidth: '120%' ,
        maxHeight: '120%' ,
        opacity: "1"
                            },

        styleForFadedIMG: {
        position: "absolute",
        top: "-2px",
        left: "3px",
        maxWidth: '120%' ,
        maxHeight: '120%' ,
        opacity: "0.2"
                          },
                    } ; // end state

                        } // end constructor


                        //----------------//
//----------------////----------------////----------------////----------------//
// The following lifecycle method ensures that code only re-renders a
// <RecallCard> is it rxes a new state property

//----------------------------------------------------------------------------//
// Now a function to respond to a click of any of the suit squares.
// This fn changes a state property value to true/false. The style of the <img>
// that contains the suit image depends on this state property's value. If it's
// false the style makes the <img>'s opacity 0.2; if true, 1.0.
// This fn sets values of the appropriate member of the
// userAttempt array (that is part of the xxx) via the function in
// this.props.getCardSuit. (???? what ?????)
// Arg 'suit' is a string such as "cardH" for the Hearts suit.
selectSuit = (suit, clubsVeracity, diamondsVeracity, heartsVeracity, spadesVeracity ) => {
this.props.getCardSuit(suit, this.props.ordinalNumber)
this.setState((state, props) => {
    return {
        selectClubsSuit: clubsVeracity,
        selectDiamondsSuit: diamondsVeracity,
        selectHeartsSuit: heartsVeracity,
        selectSpadesSuit: spadesVeracity,
        suit: suit
            }
                                }
             ) // end setState
                    } // end selectSuit


//----------------------------------------------------------------------------//
// <CardMenu> has a ref to <RecallArea>'s getCardNumber (via this component)
// <RecallCard> (this component) has a ref to <RecallArea>'s getCardSuit
// This is how <CardMenu> sends user choice of card number(/pic) to <RecallArea>
// and how <RecallCard> (this component) sends user choice of suit to
// <RecallArea>

// Now a fn to which code gives child <CardMenu> a reference. <CardMenu> sends
// the user selection of card number(/pic) to this component via the following
// fn. This component then sends that number(/pic) plus the ordinal number of
// the card to parent <RecallArea>. Arg numberOrPic is a string:
getCardNumber = (numberOrPic) => {
this.props.getCardNumber(numberOrPic, this.props.ordinalNumber)
                                 } // end getCardNumber

//----------------------------------------------------------------------------//



  render() {

return (

<div>

{/* First a div that will be the bounding rectangle.  */}
    <div className = {styles.recallCard} >

{/* Now four divs, each a square that displays an <img> for a suit.
    Clicking on each <img> toggles its opacity from 1 to 0.2. When an <img>
    goes opaque the other three <img>s fade*/}

{/* Clubs */}
<div className = {styles.clubs}>

<img
    style={this.state.selectClubsSuit ? this.state.styleForOpaqueIMG : this.state.styleForFadedIMG}
    src={require(`./myComponents/images/pickSuitC.svg` ) }
    alt= "Clubs"
    onClick = {() => this.selectSuit("cardC", true, false, false, false)}
/>
</div>

{/* Diamonds */}
<div className = {styles.diamonds}>
<img
    style={this.state.selectDiamondsSuit ? this.state.styleForOpaqueIMG : this.state.styleForFadedIMG}
    src={require(`./myComponents/images/pickSuitD.svg` ) }
    alt= "Diamonds"
    onClick = {() => this.selectSuit("cardD", false, true, false, false)}
/>
</div>

{/* Hearts */}
<div className = {styles.hearts}  >
<img
    style={this.state.selectHeartsSuit ? this.state.styleForOpaqueIMG : this.state.styleForFadedIMG}
    src={require(`./myComponents/images/pickSuitH.svg` ) }
    alt= "Hearts"
    onClick = {() => this.selectSuit("cardH", false, false, true, false )}
/>
</div>

{/* Spades */}
<div className = {styles.spades}  >
<img
    style={this.state.selectSpadesSuit ? this.state.styleForOpaqueIMG : this.state.styleForFadedIMG}
    src={require(`./myComponents/images/pickSuitS.svg` ) }
    alt= "Spades"
    onClick = {() => this.selectSuit("cardS", false, false, false, true)}

/>
</div>


{/* Now the DD list where the user picks the card. The dd list component here
    rxes as props a reference to a function in parent <RecallArea>. The dd list
    sends the card number(/pic) up the chain to <RecallArea> via this fn */}
<div className = {styles.positioningDDlist} >
<CardMenu
getCardNumber = {this.getCardNumber}
/>
</div>


</div> {/* end bounding rectangle <div> */}

</div>

           );
            } // end render
                                           } // end class def

export default RecallCard;

/* NOTE this does not work:
onClick = {this.selectSuit("cardH")} ,
you HAVE to do the following when passing an arg to the click event handler:
onClick = {() => this.selectSuit("cardH")}
*/
