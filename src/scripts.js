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
const findRoomButton = document.getElementById('findARoom')
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
let bookings;
let rooms;
let bookingsData;
let roomsData;
let singleUser;

//FUNCTIONS

function getData() {
  return Promise.all([fetchApiData('customers'), fetchApiData('rooms'), fetchApiData('bookings')]);
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}

const pageLoad = () => {
  getData()
  .then((data) => {
    singleUser = data[0].customers[0]
    user = new User(singleUser)
    
    roomsData = data[1].rooms
    
    bookingsData = data[2].bookings
    
    displayUserDashBoard(user, roomsData, bookingsData);
  })
}

const displayUserDashBoard = (user, rooms, bookings) => {
  totalSpentLine.innerText = "";
  userDashboard.innerHTML = "";
  user.findBookedRooms(bookings)
  user.getTotalSpentOnRooms(rooms);
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

const displayAvailableRooms = (event) => {
  event.preventDefault();
  showAvailableRoomsView();
  let betterDate = dateInput.value.split('-').join('/')
  user.findBookingsByDate(betterDate, bookingsData)
  user.findAvailableRooms(roomsData)
  console.log("here", user.availableRooms)
  availableRoomsView.innerHTML = ``;
  user.availableRooms.forEach(availableRoom => {
    availableRoomsView.innerHTML +=
    `<section>
    <p>Room Number: ${availableRoom.number}</p>
    <p>Room Type: ${availableRoom.roomType}</p>
    <p>Has a bidet: ${availableRoom.bidet}</p>
    <p>Bed size: ${availableRoom.bedSize}</p>
    <p>Number of beds: ${availableRoom.numBeds}</p>
    <p>Cost per night: ${availableRoom.costPerNight}</p>
    </section>`
  })
}



//HELPER FUNCTIONS





//EXECUTION FUNCTIONS
// sortTags() {
//   const result = cookbook.recipesCollection.reduce((acc, elem) => {
//     elem.tags.forEach(tag => {
//       if (!acc.includes(tag)) {
//         acc.push(tag)
//       }
//     })
//     return acc
//   }, [])
//   return result
// },

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


const show = (elements) => {
  elements.forEach(element => element.classList.remove('hidden'));
}

const hide = (elements) => {
  elements.forEach(element => element.classList.add('hidden'));
}
                      
                      
                      
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
  show([navBar, availableRoomsView]);
  hide([loginView, userDashboard, filteredResultsView, userCheckInView, bookedRoomView]);
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

window.addEventListener('load', pageLoad);
findRoomButton.addEventListener('click', showUserCheckInView)
checkInButton.addEventListener('click', (event) => {
  displayAvailableRooms(event)
});

