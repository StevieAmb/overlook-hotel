// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import { fetchApiData, fetchSingleUser, postBooking } from './apiCalls';
import domUpdates from './domUpdates';
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import User from './User';

//QUERY SELECTORS

//BUTTONS
const homeButton = document.getElementById('homeButton');
const loginButton = document.getElementById('loginButton');
const checkInButton = document.getElementById('checkInButton')
const filterRoomsButton = document.getElementById('filterByRoomType');
const loginView = document.getElementById('loginPageView')
let domButtons;

//USER INPUT
const usernameInput = document.getElementById('userName');
const passwordInput = document.getElementById('password');
const dateInput = document.getElementById('checkInCalendar');
const selectedtRoomTypeDropdown = document.getElementById('roomTypeSelection');



//VIEWS
// const loginView = document.getElementById('loginPageView')
const userDashboard = document.getElementById('userDashboard');
const userCheckInView = document.getElementById('userCheckIn');
const availableRoomsView = document.getElementById('availableRoomsView');
const bookedRoomView = document.getElementById('bookedRoomView');
const navBar = document.getElementById('navBar');
const thankYouScreen = document.getElementById('thankYouScreen');

//RANDOM QUERIES
const totalSpentLine = document.getElementById('totalSpent');
const errorHandlingLine = document.getElementById('handleMyError')

//CLASS INSTANTIATIONS
let user;
let bookingsData;
let roomsData;
let singleUser;


//FUNCTIONS

//HELPER FUNCTIONS

function getData(userID) {
  return Promise.all([fetchSingleUser(userID), fetchApiData('rooms'), fetchApiData('bookings')])
}

// on click
const getLoginUserID = (input) => {
  let username = input.value
  let userID = username.substring(8)
  return userID;
}

const loginUser = (event) => {
  event.preventDefault();
  let userID = getLoginUserID(usernameInput)
  if(userID > 0 && userID < 51 && passwordInput.value === 'overlook2021') {
  getData(userID)
  .then(data => { 
    [singleUser, roomsData, bookingsData] = [data[0], data[1].rooms, data[2].bookings]
    user = new User(singleUser)
    console.log(user);
      domUpdates.showUserDashboard();
      gatherUserDashBoard(user, bookingsData, roomsData)
    });
  }
}


const gatherAvailableRooms = (event) => {
  event.preventDefault();
  domUpdates.showAvailableRoomsView();
  let betterDate = dateInput.value.split('-').join('/')
  user.findBookingsByDate(betterDate, bookingsData)
  user.findAvailableRooms(roomsData)
  if(user.availableRooms && user.availableRooms.length > 0) {
    domUpdates.displayAvailableRooms()
  } else if (!user.availableRooms || user.availableRooms.length === 0) {
    user.throwError();
    domUpdates.displayAvailableRooms();
  }

}

const gatherUserDashBoard = (user, bookings, rooms) => {
  user.findBookedRooms(bookings)
  user.getTotalSpentOnRooms(rooms);
  domUpdates.displayUserDashBoard(user)
}

const filterRooms = (event) => {
    event.preventDefault();
    domUpdates.showBookingRoomView();
    user.filterAvailableRooms(selectedtRoomTypeDropdown.value)
    if(user.wantedRooms && user.wantedRooms.length > 0) {
      domUpdates.displayFilteredRooms(event)
    } else if (!user.wantedRooms || user.wantedRooms.length === 0) {
      user.throwError();
      domUpdates.displayFilteredRooms();
    }
}




const postUserBooking = (event) => {
  if(event.target.classList.contains('book-room')) {
    let goodDate = dateInput.value.split('-').join('/')
    let post = {
      userID: user.id,
      date: goodDate,
      roomNumber: parseInt(event.target.parentNode.id)
    }
    postBooking(post)
    domUpdates.showThankYouScreen()
  }
}


const postErrorHandling = (response) => {
  if(!response.ok) {
    throw new Error("I'm SO sorry this has happened like this. Have you tried turning off and turning it on again?")
  } else {
    return response.json();
  }
}


const show = (elements) => {
  elements.forEach(element => element.classList.remove('hidden'));
}

const hide = (elements) => {
  elements.forEach(element => element.classList.add('hidden'));
}
//EVENT LISTENERS

homeButton.addEventListener('click', domUpdates.showUserDashboard)

loginButton.addEventListener('click', (e) => {
  loginUser(e)
})

checkInButton.addEventListener('click', (e) => {
  gatherAvailableRooms(e)
})

filterRoomsButton.addEventListener('click', (e) => {
  filterRooms(e)
})

const clickBookButton = (domButtons) => {
   domButtons.forEach(button => {
          button.addEventListener('click', (e) => {
       postUserBooking(e)
     })
   })
 }

 export { 
  clickBookButton, 
  homeButton, 
  loginButton, 
  user, 
  bookingsData, 
  roomsData, 
  filterRoomsButton, 
  loginView, 
  navBar, 
  userDashboard, 
  availableRoomsView, 
  bookedRoomView, 
  selectedtRoomTypeDropdown, 
  postErrorHandling,
  show, 
  hide 
}