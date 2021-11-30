// This component creates a div containing an image, the src attribute of which
// changes as the user clicks the "Next card" button. This is where each
// overturned card appears.

import React from 'react';
import styles from './myCSSfiles/ShowCard.module.css';


class ShowCard extends React.Component {


render() {

    return (

    <div >

<div className = {styles.prettifyShowCard}>
<img
style={{maxHeight: '100%', maxWidth: '100%'}}
src={require(`./myComponents/images/${this.props.showNextCardPlease}` ) }
alt= "Card appears here"
/>
</div>

    </div>

            ); // end return

          } // end render

                                        } // end class ShowCard

export default ShowCard
