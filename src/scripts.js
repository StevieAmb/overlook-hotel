// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import { fetchApiData } from './apiCalls';

import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import Room from './Room';
import User from './User';
import Booking from './Booking';

//QUERY SELECTORS

//BUTTONS
const homeButton = document.getElementById('homeButton');
const seeMyDashBoardButton = document.getElementById('seeUserDash');
const roomTypeDropdownButton = document.getElementById('dropDownButton');
const loginButton = document.getElementById('loginButton');
const bookARoomButton = document.getElementById('bookARoom')
const checkInButton = document.getElementById('checkInButton')

//USER INPUTS
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('loginButton');
const dateInput = document.getElementById('checkInCalendar')


//VIEWS
const loginView = document.getElementById('loginPageView')
const userDashboard = document.getElementById('userDashboard');
const userCheckInView = document.getElementById('userCheckIn');
const availableRoomsView = document.getElementById('availableRoomsView');
const filteredResultsView = document.getElementById('filteredResultsView');
const bookedRoomView = document.getElementById('bookedRoomView');
const navBar = document.getElementById('navBar');

//RANDOM QUERIES
const totalSpentLine = document.getElementById('totalSpent');

//CLASS INSTANTIATIONS
let user;
let randomUser
let booking;
let room;

//FUNCTIONS

function getData() {
  return Promise.all([fetchApiData('customers'), fetchApiData('rooms'), fetchApiData('bookings')]);
}
const show = (elements) => {
  elements.forEach(element => element.classList.remove('hidden'));
}

const hide = (elements) => {
  elements.forEach(element => element.classList.add('hidden'));
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}

const loadPage = () => {
  getData()
  .then((data) => {
    //USER
    user = new User(data[0].customers[0]);
    user.findBookedRooms(data[2].bookings)
    user.getTotalSpentOnRooms(data[1].rooms)
    
    displayUserDashBoard(user)

    console.log("$$$", user.totalSpent);
    //BOOKINGS
    booking = new Booking(data[2].bookings)
  })
  showUserDashBoardView();
  displayUserDashBoard();
}

const displayUserDashBoard = (user) => {
  totalSpentLine.innerText = "";
  userDashboard.innerHTML = "";
  console.log(user.totalSpent);
  user.roomsAlreadyBooked.forEach(booking => {
    totalSpentLine.innerText = `So far, you have spent $${user.totalSpent}! Thank you for trusting OverLook!`;
    userDashboard.innerHTML += `
    <section>
    <p>Date: ${booking.date}</p>
    <p>Id Number: ${booking.userID}</p>
    <p>Room Number: ${booking.roomNumber}</p>
    </section>`
  })
}


//HELPER FUNCTIONS
const showCalendarValue = (event) => {
  event.preventDefault();
  console.log(dateInput.value)
}




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
// const displayUserDashBoard = () => {
//   showUserDashBoardView();
//   user.findBookedRooms(booking)
// }

// PSEUDOCODE

// // //the user 1, has to match the booking by user ID in order to display
// for each of the total booking data, if the user.id matched booking.userID,
// then, display the booking. 





//VIEWS 
const showUserDashBoardView = () => {
  show([userDashboard, seeMyDashBoardButton]);
  hide([loginView, availableRoomsView, filteredResultsView, bookedRoomView, userCheckInView]);
}

const showLoginPageView = () => {
  show([loginView]);
  hide([userDashboard, navBar, availableRoomsView, filteredResultsView, userCheckInView, bookedRoomView]);
}

const showAvailableRoomsView = () => {
  show([navBar, userDashboard]);
  hide([loginView, availableRoomsView, filteredResultsView, userCheckInView, bookedRoomView]);
}

const showFilteredRoomsView = () => {
  show([navBar, filteredResultsView])
  hide([loginView, availableRoomsView, userDashboard, userCheckInView, bookedRoomView])
}

const showUserCheckInView = () => {
  show([navBar,, userCheckInView]);
  hide([loginView, availableRoomsView, userDashboard, userCheckInView, filteredResultsView]);
}

const showBookingRoomView = () => {
  show([navBar, bookedRoomView])
  hide([loginView, availableRoomsView, userDashboard, userCheckInView, filteredResultsView]);
}


// console.log('This is the JavaScript entry file - your code begins here.');

seeMyDashBoardButton.addEventListener('click', loadPage);
bookARoomButton.addEventListener('click', showUserCheckInView);
checkInButton.addEventListener('click', showCalendarValue)

