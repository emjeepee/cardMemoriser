/*
Explanation
===========
To follow …

*/

//////////-----------//////////-----------//////////-----------//////////-------
import * as myController from './Controller' ;

var someObject = {

// ----------- -------------- ------------- ------------ --------- ------//

// ----------- -------------- ------------- ------------ --------- ------//

JSONifiedArray: [ ],

parsedArray: [ ],

timerButtonText: "Timer", // don't know what this is for!!

// ----------- -------------- ------------- ------------ --------- ------//
// localStorage.removeItem('myDatakey');

// Function rxDataFromController calls the following function, which
putStuffIntoStorage: function (arrayOfThings) {
// This function will behave differently depending on whether it's startup time or normal operation.
// If startup time:
if (arrayOfThings.length === 0) {
    this.parsedArray.push(arrayOfThings)
    this.JSONifiedArray = JSON.stringify(this.parsedArray)
    localStorage.setItem('previousAttempts', this.JSONifiedArray)
                                } // end if
// If normal operation:
if (arrayOfThings.length > 0) {
// Grab the JSONofied attempt object and put it into storage
    this.parsedArray.push(arrayOfThings[1])
    this.JSONifiedArray = JSON.stringify(this.parsedArray)
    localStorage.setItem('previousAttempts', this.JSONifiedArray)
                               } // end if
                                     } , // end putStuffIntoStorage

// The Controller sends the following function data the nature of which
// depends on whether the app has just started up (ie is going through
// initialisation) or whether it is undergoing normal operation.
// During startup the Controller sends an empty array.
// In normal operation the Controller sends an array of two objects: a JSONified
// attempt and attempt -- [this.attemptJSONified, this.attempt].
// The JSONified data goes into localStorage and to the express backend.
// This
// function checks to see whether anything under the key exists in localStorage.
// If so, it will be an array, in which case this function recovers the
// JSONified array, parses it (unJSONifies it), adds userAttempt to it,
// JSONifies the amended array and puts it back into localStorage:
rxDataFromController: function (data) {
console.log("Model here. Have rxed: " + data)
// determine whether it's startup or normal operation:
if (!data.length) {  // NOTE if (data === []) { etc -- doesn't work!!!
console.log("It's startup time!")
// If it's startup time:
this.parsedArray = data
this.JSONifiedArray = JSON.stringify(this.parsedArray)
localStorage.setItem('previousAttempts', this.JSONifiedArray)
} // end if

if (data.length > 0) {
console.log("We're in normal operation!")
// If it's normal operation:
this.parsedArray = []
// Get existing array stored under key 'previousAttempts' and parse it:
this.JSONifiedArray = localStorage.getItem('previousAttempts')
this.parsedArray = JSON.parse(this.JSONifiedArray)
this.parsedArray.push(data[1])
this.JSONifiedArray = JSON.stringify(this.parsedArray)
localStorage.setItem('previousAttempts', this.JSONifiedArray)
// console.log("this.parsedArray.length = " + this.parsedArray.length )
/*
// Add rxed object to it then JSONify it:
this.parsedArray.push(data[1])
this.JSONifiedArray = JSON.stringify(this.parsedArray)
// Put the amended and JSONified array into localStorage:
localStorage.setItem('previousAttempts', this.JSONifiedArray)
*/
                     } // end if

// console.log("Model here. Out of localStorage comes: " + (JSON.parse(localStorage.getItem('previousAttempts'))).incorrect )

                                       }, // end rxDataFromController


// --------- --------- --------- --------- ---------- --------- -------- //

// The following function gets the previous attempt data from localStorage and
// does a JSON.parse() on it before returning it. The Controller calls this
// function:
sendPrevAttemptDataToController: function (data) {
this.JSONifiedArray = localStorage.getItem('previousAttempts')
console.log("M here. this.JSONifiedArray taken out of storage is:" + this.JSONifiedArray)
this.parsedArray = JSON.parse(this.JSONifiedArray)
return this.parsedArray
                                                  } // end sendPrevAttemptDataToController

// --------- --------- --------- --------- ---------- --------- -------- //
                } // end someObject


//---------

export  { someObject }
