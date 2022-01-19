import { fetchApiData, fetchSingleUser, postBookings } from "./apiCalls";
import { 
  clickBookButton, 
  selectedtRoomTypeDropdown, 
  homeButton, 
  loginButton, 
  user, 
  bookingsData, 
  show,
  hide,
  roomsData, 
  filterRoomsButton, 
  loginView, 
  navBar, 
  userDashboard, 
  availableRoomsView, 
  bookedRoomView, 
} from "./scripts";
import User from "./User";

//BUTTONS
let domButtons;

//VIEWS
const userCheckInView = document.getElementById('userCheckIn');
const thankYouScreen = document.getElementById('thankYouScreen');


//RANDOM QUERIES
const totalSpentLine = document.getElementById('totalSpent');
const messagesToUser = document.getElementById('messagesToUser');
const errorHandlingLine = document.getElementById('handleMyError')



let domUpdates = {
displayUserDashBoard(user) {
    totalSpentLine.innerText = "";
    userDashboard.innerHTML = "";
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
  availableRoomsView.innerHTML = ``;
    user.availableRooms.forEach(availableRoom => {
      availableRoomsView.innerHTML +=
      `<section class="card-border" id="${availableRoom.number}">
      <p>Room Number: ${availableRoom.number}</p> <p>Room Type: ${availableRoom.roomType}</p>
      <p>Has a bidet: ${availableRoom.bidet}</p> <p>Bed size: ${availableRoom.bedSize}</p>
      <p>Number of beds: ${availableRoom.numBeds}</p> <p>Cost per night: ${availableRoom.costPerNight}</p>
      <button class="book-room">Book This Room</button>
      </section>`
  })
    if (!user.availableRooms || user.availableRooms.length === 0) {
    availableRoomsView.innerHTML = `
    <p>${user.message}</p>`
  }
    domButtons = document.querySelectorAll('.book-room')
    clickBookButton(domButtons);
},

getErrorHandling(error) {
  errorHandlingLine.innerText = `Sorry about the ${error.message}. Don't forget to try again!`
},


displayFilteredRooms(event) {
  bookedRoomView.innerHTML = ``;
    user.wantedRooms.forEach(wantedRoom => {
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
    if(!user.wantedRooms || user.wantedRooms.length === 0) {
      user.throwError()
      bookedRoomView.innerHTML = `
      <p>${user.message}</p>`
    }
    domButtons = document.querySelectorAll('.book-room')
    clickBookButton(domButtons);
  },

  
  //VIEWS 
  showUserDashboard() {
    show([userCheckInView, navBar, userDashboard, messagesToUser])
    hide([availableRoomsView, bookedRoomView, loginView, thankYouScreen, homeButton])
  },
  
  showAvailableRoomsView() {
    show([navBar, availableRoomsView, homeButton, filterRoomsButton, selectedtRoomTypeDropdown]);
    hide([loginView, userDashboard, thankYouScreen, userCheckInView, bookedRoomView, messagesToUser]);
  },
  
  showBookingRoomView() {
    show([navBar, bookedRoomView])
    hide([loginView, availableRoomsView, thankYouScreen, messagesToUser, userDashboard, userCheckInView]);
  },

  showThankYouScreen() {
    show([navBar, homeButton, thankYouScreen]);
    hide([loginView, userDashboard, userCheckInView, filterRoomsButton, selectedtRoomTypeDropdown, bookedRoomView, availableRoomsView, messagesToUser]);
  }
};



//EVENT LISTENERS
// checkInButton.addEventListener('click', (event) => {
//   domUpdates.displayAvailableRooms(user, event)
// })


export default domUpdates;

