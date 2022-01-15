// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './apiCalls';

import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

//QUERY SELECTORS


//FUNCTIONS

const getData = () => {
    return Promise.all([fetchApiData('ingredients'), fetchApiData('recipes'), fetchApiData('users')])
  };




//EXECUTION FUNCTIONS



//DISPLAY FUNCTIONS


//HELPER FUNCTIONS


//VIEWS 


console.log('This is the JavaScript entry file - your code begins here.');

