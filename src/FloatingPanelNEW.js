// This component is a panel that the user can drag and drop. It shows previous
// user attempts in a <Table> component. There are also components for a
// background panel and a header+header text.
// The <Table> component rxes as props an array of objects that each shows a
// previous attempt.


import React from 'react';
// The following css file is the main one:
import styles from './myCSSfiles/FloatingPanelNEW.module.css';
import Table from './Table';

class FloatingPanelNEW extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        pos1:                 0,
        pos2:                 0,
        pos3:                 0,
        pos4:                 0,
        left:                 450, // for floating panel
        top:                  550, // for floating panel
        position:             "absolute"
                    } ;
                        } // end constructor

////////////////// A section to do with dragging a panel ////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// The following function responds to the onMouseDown of the wrapping div of the
// <FloatingPanel> child component. It has two purposes:
// 1) it adds event listeners to the window object
// 2) it sets state properties that store the clientX and clientY values of the
//    mouse on mousedown

addListenerToWindow = (e) =>{
    window.addEventListener("mousemove", this.movePanel) ;
    window.addEventListener("mouseup",   this.removeEventListenerFromWindow) ;


    e = e || window.event;
        e.preventDefault();

// set the appropriate state property values to clientX and y at mousedown:

    // get the mouse cursor position at startup and set it to state properties:
this.setState({
pos3: e.clientX,
pos4: e.clientY
              })
                          } // end addListenerToWindow

// In reality the following function will remove the event listeners from the
// window object:
removeEventListenerFromWindow = () => {
window.removeEventListener("mousemove", this.movePanel);
window.removeEventListener("mouseup", this.removeEventListenerFromWindow);
                                      }

// In reality the following function will calculate dx and dy and set state
movePanel = (e) => {
    e = e || window.event;
    e.preventDefault(); //
    // calculate pos1 & pos2, ie dx & dy:

// Then set left and top of the div in question like this:
// left = left + pos1
// top  =  top + pos2

this.setState( (prevState) => ({
    // remember that pos1 and pos2 are strings but pos3 and pos4 are numbers!!
        pos1: `${e.clientX - prevState.pos3}px`, // dx, a number -- NOT USED!!
        pos2: `${e.clientY - prevState.pos4}px`, // dy, a number -- NOT USED!!
        pos3: e.clientX, // a number - Reset pos3 to the new current mouse x
        pos4: e.clientY, // a number - Reset pos4 to the new current mouse y
        left: prevState.left + e.clientX - prevState.pos3,
        top:  prevState.top + e.clientY - prevState.pos4
        // in js, adding a string to number produces string (not relevant here!).

                               })
             )  // end call to setState

                   } // end movePanel

//////////////// End of section to do with dragging a panel ///////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////












 render() {
          return (
<div>


{/*First the panel itself*/}
<div className = {styles.backgroundPanel}
    onMouseDown = {this.addListenerToWindow}
    style = {{position: this.state.position, left: (this.state.left + "px"), top: (this.state.top + "px") }}
>

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
export default FloatingPanelNEW;
/*
*/
