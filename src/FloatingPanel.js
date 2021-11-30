// This component is a panel that the user can drag and drop. It shows previous
// user attempts in a <Table> component. There are also components for a
// background panel and a header+header text.
// The <Table> component rxes as props an array of objects that each shows a
// previous attempt.


import React from 'react';
// The following css file is the main one:
import styles from './myCSSfiles/FloatingPanel.module.css';
import Table from './Table';

class FloatingPanel extends React.Component {
// <div className = {styles.testPanel} >
// <div>


 render() {
          return (
<div>


{/*First the panel itself*/}
<div className = {styles.backgroundPanel} >

{/*the header*/}
<div className = {styles.panelHeader} >
<p className = {styles.panelHeaderText}> Previous attempts </p>
</div>


{/*the table of previous attempts. It gets its props value from parent
    <FloatingPanel> (ie this current component)*/}
<div className = {styles.tableStyle}>
<Table
dataFromModel = {this.props.dataFromModel}
/>
</div>

</div>


</div>

                 );
             }
                                             } // end class description
export default FloatingPanel;
/*
*/
