/*
This component provides a number for each card in the recall area.
*/

import React from 'react';
import styles from './myCSSfiles/RecallCardNumber.module.css';


class RecallCardNumber extends React.Component {


render() {

    return (

<p className = {styles.prettifyNumber}
>
{this.props.numberText}
</p>

            ); // end return
         } // end render

} // end class RecallCardNumber

export default RecallCardNumber

/*
style =  {{ position: "absolute" , top: this.props.top , left:  this.props.left + "px" }}

*/
