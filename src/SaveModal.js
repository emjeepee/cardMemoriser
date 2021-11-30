// This component contains a "yes" button and a "No" button. when the user clicks
// "Yes" code calls a function in <RecallArea> that gathers info and sends it to
// the model.


import React from 'react';
import styles from './myCSSfiles/SaveModal.module.css';
import PurpleButton from './PurpleButton.js';
// import * as myController from './Controller' ;


class SaveModal extends React.Component {




  render() {

    return (
<div>

<div
className = {styles.positionAndPrettifySaveModalBox}
>

<div className = {styles.positionAndPrettifyHeaderDiv}></div>
<p className ={styles.positionAndPrettifyHeaderText}>{this.props.headerText}</p>

{/*This panel asks user whether he wants to save his attenpt. This button says
    "Yes" */}
<div className = {styles.positionYesButton}>
    <PurpleButton
    buttonText = "Yes"
    clickResponseFunction = {this.props.saveAndSendToModel}
    />
</div>

{/*This panel asks user whether he wants to save his attenpt. This button says
    "No" */}
<div className = {styles.positionNoButton}>
    <PurpleButton
    buttonText = "No"
    clickResponseFunction = {this.props.closeRecallArea}
    />
</div>


</div>

</div>
           );
            } // end render
                                           } // end class def

export default SaveModal;
// clickResponseFunction = {this.respondToClose}
