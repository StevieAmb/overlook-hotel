import { fetchApiData, fetchSingleUser, postBookings } from "./apiCalls";
import { clickBookButton } from "./scripts";
import User from "./User";

//BUTTONS
const filterRoomsButton = document.getElementById('filterByRoomType');
let domButtons;

//USER INPUTS
const selectedtRoomTypeDropdown = document.getElementById('roomTypeSelection');
const dateInput = document.getElementById('checkInCalendar');
const usernameInput = document.getElementById('userName');
const passwordInput = document.getElementById('password');

//VIEWS
const loginView = document.getElementById('loginPageView')
const userDashboard = document.getElementById('userDashboard');
const userCheckInView = document.getElementById('userCheckIn');
const availableRoomsView = document.getElementById('availableRoomsView');
const bookedRoomView = document.getElementById('bookedRoomView');
const navBar = document.getElementById('navBar');

//RANDOM QUERIES
const totalSpentLine = document.getElementById('totalSpent');

let user;
let bookingsData;
let roomsData;
let singleUser;



let domUpdates = {

//DISPLAY FUNCTIONS
getData(userID) {
  return Promise.all([fetchSingleUser(userID), fetchApiData('rooms'), fetchApiData('bookings')])
},

loginUser(event) {
  event.preventDefault();
  let userID = domUpdates.getLoginUserID(usernameInput)
  if(userID > 0 && userID < 51 && passwordInput.value === 'overlook2021') {
  domUpdates.getData(userID)
  .then(data => { 
    [singleUser, roomsData, bookingsData] = [data[0], data[1].rooms, data[2].bookings]
    user = new User(singleUser)
    console.log(user);
      domUpdates.showUserDashboard();
      domUpdates.displayUserDashBoard(user, roomsData, bookingsData)
    });
  }
},

getLoginUserID(input) {
  let username = input.value
  let userID = username.substring(8)
  return userID;
},

displayUserDashBoard(user, rooms, bookings) {
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
  },

displayAvailableRooms() {
  domUpdates.showAvailableRoomsView();
  let betterDate = dateInput.value.split('-').join('/')
  user.findBookingsByDate(betterDate, bookingsData)
  user.findAvailableRooms(roomsData)
  availableRoomsView.innerHTML = ``;
  if(user.availableRooms && user.availableRooms.length > 0) {
    user.availableRooms.forEach(availableRoom => {
      availableRoomsView.innerHTML +=
      `<section class="card-border" id="${availableRoom.number}">
      <p>Room Number: ${availableRoom.number}</p> <p>Room Type: ${availableRoom.roomType}</p>
      <p>Has a bidet: ${availableRoom.bidet}</p> <p>Bed size: ${availableRoom.bedSize}</p>
      <p>Number of beds: ${availableRoom.numBeds}</p> <p>Cost per night: ${availableRoom.costPerNight}</p>
      <button class="book-room">Book This Room</button>
      </section>`
  })
} 
    if (!user.availableRooms || user.availableRooms.length === 0) {
    availableRoomsView.innerHTML = `
    <p>Sorry, so sorry for the inconvenience! I beg of you, forgive us and try your search again!</p>`
  }
    domButtons = document.querySelectorAll('.book-room')
    clickBookButton(domButtons);
},


  //HELPER FUNCTIONS
  show(elements) {
    elements.forEach(element => element.classList.remove('hidden'));
  },
  
  hide(elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },
  
  //VIEWS 
  showUserDashboard() {
    domUpdates.show([userCheckInView, navBar, userDashboard])
    domUpdates.hide([availableRoomsView, bookedRoomView, loginView])
  },
  
  showAvailableRoomsView() {
    domUpdates.show([navBar, availableRoomsView, homeButton, filterRoomsButton, selectedtRoomTypeDropdown]);
    domUpdates.hide([loginView, userDashboard, userCheckInView, bookedRoomView]);
  },
  
  showBookingRoomView() {
    domUpdates.show([navBar, bookedRoomView])
    domUpdates.hide([loginView, availableRoomsView, userDashboard, userCheckInView]);
  }
};

//EVENT LISTENERS
checkInButton.addEventListener('click', (event) => {
  domUpdates.displayAvailableRooms(user, event)
})

loginButton.addEventListener('click', (e) => {
  domUpdates.loginUser(e)
})

export default domUpdates;

