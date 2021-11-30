// This component rxes as props an arraythat contains objects that represent all
/// of the previous attempts



import React from 'react';
// The following css file is the main one:
import styles from './myCSSfiles/Table.module.css';


class Table extends React.PureComponent {




render() {
          return (
<div>

<table style= {{ width: "100%"}}>
{/*First the table heads*/}
<thead>
<tr>
<th rowSpan = "2">Time and date</th>
<th background = {require(`./myComponents/images/cross.svg` ) }>



</th>
<th background = {require(`./myComponents/images/tick.svg` ) }>
</th>
<th>Total</th>
<th>Time taken</th>
</tr>
</thead>

{/* Now the table body. Remember that <Table> rxes from parent <FloatingPanel>
    this.props.dataFromModel, which is an array that looks like this:
 [{… …, date: xxxx, incorrect:3, correct: 12, … … },
  {… …, date: xxxx, incorrect:2, correct: 10, … … }
   …
   …
  ]
*/}

{/* Only render the table if there is stuff to go into the rows. This component
    rxes array this.props.dataFromModel (which came from the Model via <RecallArea> and <FloatingPanel>). Use a ternary operator to test if that array has members. If yes create rows of the table for each member of the array. If no, render "" */}
<tbody>
{  this.props.dataFromModel.length ?
    (this.props.dataFromModel).map(obj=>{


if ((obj.id % 2) === 0) {
return (
    <tr className = {styles.backGroundOne}>
    <td>{obj.date}</td>
    <td>{obj.incorrect}</td>
    <td>{obj.correct}</td>
    <td>{obj.total}</td>
    <td>{obj.timeTaken}</td>
    </tr>
)
                        } // end if
if ((obj.id % 2) !== 0) {
return (
    <tr className = {styles.backGroundTwo}>
    <td>{obj.date}</td>
    <td>{obj.incorrect}</td>
    <td>{obj.correct}</td>
    <td>{obj.total}</td>
    <td>{obj.timeTaken}</td>
    </tr>
        ) // end return
                        } // end if

}  // end function inside map function
) // end map function
: //
" " // end ternary operation
}


</tbody>

</table>

</div>

                 );
             }
                                             } // end class description
export default Table;
/*
*/
