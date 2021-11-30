// The parent of this component, whatever that parent is, will set, through
// props:
// 1) the text that will appear in the button -- {this.props.buttonText}
// 2) the onClick handler
// So a parent will call this component like this:
// <PurpleButton
// buttonText = "Text specific to parent's need"
// clickResponseFunction = refToFunxOfParent'sChoice()
// />

// The app will use this button in various places, each time with a different
// text and onClick function.

// NOTE IMPORTANT!!!!
// A parent that uses this current component in a form and sets the
// typeAttribute props property value to "submit" makes the button reset
// the whole component tree (certainly in Chrome)!!! even though it is supposed
// to send data to the server. sat21March20 Look into this!!!
// NOTE

// CSS classes
// ===========
// Class myCommonToAllButtons is for prettifying only.


import React from 'react';
import styles from './myCSSfiles/purpleButton.module.css';

class PurpleButton extends React.Component {

numberOfClicks = 0 ;


  render() {

    return (
    <button
        className = {styles.myCommonToAllButtons}
        onClick = {this.props.clickResponseFunction}
        type = {this.props.typeAttribute}
        disabled = { this.props.disabledYesNo}
        style={{width: this.props.width}}
    >
    {this.props.buttonText}
    </button>
           );
            } // end render
                                           } // end class def

export default PurpleButton;
