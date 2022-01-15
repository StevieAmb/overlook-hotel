// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './apiCalls';

import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

//QUERY SELECTORS

//BUTTONS
const homeButton = document.getElementById('homeButton');
const seeMyDashBoard = document.getElementById('seeUserDash');
const roomTypeDropdownButton = document.getElementById('dropDownButton');
const loginButton = document.getElementById('');

//USER INPUTS
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('loginButton');


//VIEWS
const loginView = document.getElementById('loginPageView')
const userDashboard = document.getElementById('userDashboard');
const userCheckIn = document.getElementById('userCheckIn');
const availableRoomsView = document.getElementById('availableRoomsView');
const filteredResultsView = document.getElementById('filteredResultsView');
const bookedRoomView = document.getElementById('bookedRoomView');
const navBar = document.getElementById('navBar');


//FUNCTIONS

function getData() {
  return Promise.all([fetchApiData('ingredients'), fetchApiData('recipes'), fetchApiData('users')]);
}

const loadPage = () = {
  getData()

}


//HELPER FUNCTIONS

const show = (elements) => {
  elements.forEach(element => element.classList.remove('hidden'));
},

const hide = (elements) => {
  elements.forEach(element => element.classList.add('hidden'));
},

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
},



//EXECUTION FUNCTIONS
// showDropDown() {
//   myDropdown.innerHTML = ``
//   myDropdown.classList.toggle("show");
//   let allTags = domUpdates.sortTags();
//   allTags.forEach((tag) => {
//     myDropdown.insertAdjacentHTML('afterBegin', `<a class ="${tag}" href="#${tag}">${tag.toUpperCase()}</a>`)
//   })
// },

// searchByTags(event) {
//   event.preventDefault();
//   let findTags = domUpdates.sortTags();
//   findTags.forEach((tag) => {
//     if (event.target.className === tag) {
//       domUpdates.showRecipeSearchResults();
//       let searchedRecipeTag = cookbook.storeByTag(tag);
      
//       recipeResultsView.innerHTML = ``
//       searchedRecipeTag.forEach((elem) => {
//         recipeResultsView.insertAdjacentHTML('afterBegin',
//         `<article class="result-card" id="${elem.id}">
//         <img class="result-image" alt="${elem.name}" src="${elem.image}" tabindex= "0">
//         <h2>${elem.name}</h2>
//         </article>`)
//       })
//     }
//   })
// },



//DISPLAY FUNCTIONS






//VIEWS 
const showUserDashBoardView = () => {
  show([userDashboard]);
  hide([]);
}

const showLoginPageView = () => {
  show([]);
  hide([]);
}

const showAvailableRoomsView = () => {
  show([]);
  hide([]);
}

const showFilteredRoomsView = () => {
  show([])
  hide([])
}

const showUserCheckInView = () => {
  show([]);
  hide([]);
}


console.log('This is the JavaScript entry file - your code begins here.');

