import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppNEW from './AppNEW';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( <AppNEW /> , document.getElementById('root')  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


/*
NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE

// !!!!! Removing the <React.StrictMode> tags from around the <App />  tag cured
// the problem of a child rendering twice !!!! This is what it used to look
// like:

<React.StrictMode>
  <App />
</React.StrictMode>,
NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE
*/
