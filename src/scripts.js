// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import { fetchApiData, fetchSingleUser, postBooking } from './apiCalls';

import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import Room from './Room';
import User from './User';
import Booking from './Booking';

//QUERY SELECTORS

//BUTTONS
const homeButton = document.getElementById('homeButton');
const loginButton = document.getElementById('loginButton');
const checkInButton = document.getElementById('checkInButton')
const filterRoomsButton = document.getElementById('filterByRoomType');
let domButtons;

//USER INPUTS
const usernameInput = document.getElementById('userName');
const passwordInput = document.getElementById('password');
const dateInput = document.getElementById('checkInCalendar')
const selectedtRoomTypeDropdown = document.getElementById('roomTypeSelection')


//VIEWS
const loginView = document.getElementById('loginPageView')
const userDashboard = document.getElementById('userDashboard');
const userCheckInView = document.getElementById('userCheckIn');
const availableRoomsView = document.getElementById('availableRoomsView');
const bookedRoomView = document.getElementById('bookedRoomView');
const navBar = document.getElementById('navBar');

//RANDOM QUERIES
const totalSpentLine = document.getElementById('totalSpent');
const errorHandlingLine = document.getElementById('handleMyError')

//CLASS INSTANTIATIONS
let user;
let bookingsData;
let roomsData;
let singleUser;


//FUNCTIONS

function getData(userID) {
  return Promise.all([fetchSingleUser(userID), fetchApiData('rooms'), fetchApiData('bookings')])
}

//on click
const loginUser = (event) => {
  event.preventDefault();
  let username = usernameInput.value
  let userID = username.substring(8)
  if(userID > 0 && userID < 51 && passwordInput.value === 'overlook2021') {
  getData(userID)
  .then(data => { 
    [singleUser, roomsData, bookingsData] = [data[0], data[1].rooms, data[2].bookings]
    user = new User(singleUser)
    console.log(user);
      showUserDashboard();
      console.log('rooms', roomsData)
      displayUserDashBoard(user, roomsData, bookingsData)
    });
  }
}


const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}

// //You are going to change this function to fire on click of login button
// const pageLoad = () => {
//   getData()
//   .then((data) => {
//     singleUser = data[0].customers[0]
//     user = new User(singleUser)
    
//     roomsData = data[1].rooms
    
//     bookingsData = data[2].bookings
    
//     displayUserDashBoard(user, roomsData, bookingsData);
//   })
// }




const displayUserDashBoard = (user, rooms, bookings) => {
  totalSpentLine.innerText = "";
  userDashboard.innerHTML = "";
  user.findBookedRooms(bookings)
  user.getTotalSpentOnRooms(rooms);
  user.roomsAlreadyBooked.forEach(booking => {
    totalSpentLine.innerText = `So far, you have spent $${user.totalSpent}! Thank you for trusting OverLook!`;
    userDashboard.innerHTML += `
    <section class="card-border">
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
  availableRoomsView.innerHTML = ``;
  if(user.availableRooms.length > 0) {
    user.availableRooms.forEach(availableRoom => {
      availableRoomsView.innerHTML +=
      `<section class="card-border" id="${availableRoom.number}">
      <p>Room Number: ${availableRoom.number}</p>
      <p>Room Type: ${availableRoom.roomType}</p>
      <p>Has a bidet: ${availableRoom.bidet}</p>
      <p>Bed size: ${availableRoom.bedSize}</p>
      <p>Number of beds: ${availableRoom.numBeds}</p>
      <p>Cost per night: ${availableRoom.costPerNight}</p>
      <button class="book-room">Book This Room</button>
      </section>`
    })
  } else {
    availableRoomsView.innerHTML = `
    <p>Sorry, so sorry for the inconvenience! I beg of you, forgive us and
    try your search again!</p>`
  }
  domButtons = document.querySelectorAll('.book-room')
  clickBookButton(domButtons);
}


const displayFilteredRooms = (event) => {
  event.preventDefault();
  showBookingRoomView();
  let wantedRooms = user.filterAvailableRooms(selectedtRoomTypeDropdown.value)
  bookedRoomView.innerHTML = ``;
  if(wantedRooms.length > 0) {
    wantedRooms.forEach(wantedRoom => {
      bookedRoomView.innerHTML += `
      <section class="card-border" id="${wantedRoom.number}">
        <p>Room Number: ${wantedRoom.number}</p>
        <p>Room Type: ${wantedRoom.roomType}</p>
        <p>Has a bidet: ${wantedRoom.bidet}</p>
        <p>Bed size: ${wantedRoom.bedSize}</p>
        <p>Number of beds: ${wantedRoom.numBeds}</p>
        <p>Cost per night: ${wantedRoom.costPerNight}</p>
        <button class="book-room">Book This Room</button>
      </section>`
    })
  } else {
    let message = user.filterAvailableRooms(selectedtRoomTypeDropdown.value)
    console.log(message)
    bookedRoomView.innerHTML = `
    <p>${message}</p>`
  }
  domButtons = document.querySelectorAll('.book-room')
  clickBookButton(domButtons);
}

const checkIfWorks = (event) => {
  if(event.target.classList.contains('book-room')) {
    console.log('howdydoo!')
    let goodDate = dateInput.value.split('-').join('/')
    let post = {
      userID: user.id,
      date: goodDate,
      roomNumber: parseInt(event.target.parentNode.id)
    }
    console.log(post);
    postBooking(post)
  }
}

const errorHandling = (response) => {
  if(!response.ok) {
    return errorHandlingLine.innerText = `Sorry for the inconvenience! Please try again!`
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



//VIEWS 
const showUserDashboard = () => {
  show([userCheckInView, navBar, userDashboard])
  hide([availableRoomsView, bookedRoomView, loginView])
}

const showLoginPageView = () => {
  show([loginView]);
  hide([userDashboard, navBar, availableRoomsView, userCheckInView, bookedRoomView]);
}

const showAvailableRoomsView = () => {
  show([navBar, availableRoomsView, homeButton, filterRoomsButton, selectedtRoomTypeDropdown]);
  hide([loginView, userDashboard, userCheckInView, bookedRoomView]);
}

const showUserCheckInView = () => {
  show([navBar, userCheckInView]);
  hide([loginView, availableRoomsView, userDashboard, bookedRoomView]);
}

const showBookingRoomView = () => {
  show([navBar, bookedRoomView])
  hide([loginView, availableRoomsView, userDashboard, userCheckInView]);
}


// console.log('This is the JavaScript entry file - your code begins here.');

// window.addEventListener('load', pageLoad);
checkInButton.addEventListener('click', (event) => {
  displayAvailableRooms(event)
});
loginButton.addEventListener('click', (e) => {
  loginUser(e)
})
filterRoomsButton.addEventListener('click', displayFilteredRooms)
// homeButton.addEventListener('click', )

const clickBookButton = (domButtons) => {
   domButtons.forEach(button => {
          button.addEventListener('click', (e) => {
       checkIfWorks(e)
     })
   })
 }

 export { errorHandling }