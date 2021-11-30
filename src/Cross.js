// NOTE IMPORTANT!!!!
//
// CSS classes
// ===========
//


import React from 'react';
import styles from './myCSSfiles/Cross.module.css';

class Cross extends React.Component {




  render() {

    return (
    <div>

{/*First one paralellogram*/}
{/*Then the other*/}
<div className = {styles.crossDiagonalTwo}>
</div>
<div className = {styles.crossDiagonalOne}>
</div>


    </div>

           );
            } // end render
                                           } // end class def

export default Cross;
