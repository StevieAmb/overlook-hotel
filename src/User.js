import userRoomData from "../data/sample-room-data";

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.roomsAlreadyBooked = []; //need a method for this
    this.totalSpent = 0;
    this.availableBookings = [];
  }

  findBookedRooms = (bookings) => {
    bookings.forEach(booking => {
      if(this.id === booking.userID) {
        this.roomsAlreadyBooked.push(booking)
      }
    })
    return `You haven't booked any rooms, yet! Get your vacation started with Overlook!`
  }

  getTotalSpentOnRooms = (userRoomData) => {
    let totalUserSpent = this.roomsAlreadyBooked.reduce((acc, userRoom) => {
      userRoomData.forEach(randomRoom => {
        if(userRoom.roomNumber === randomRoom.number) {
          console.log("a sign", randomRoom.costPerNight);
          console.log("a user room", userRoom);
          acc += randomRoom.costPerNight
        }
      })
      console.log(acc);
      return acc
    }, 0)
    this.totalSpent = totalUserSpent;
  }

  findBookingsByDate = (date, bookings) => {
  bookings.forEach(booking => {
    if(booking.date !== date) {
      this.availableBookings.push(booking);
    }
  })
  }
}



//PSEUDOCODE
//Method One ()
// the user is going to put in a date (year - month - day)
// based on the date that the user puts in
// it has to check against all of the bookings - Filter 
// and then pull out the bookings that are available for that date

// Method Two ()
// From the list of bookings that are availble for that day (an array),
// We are going to take in the roomsData as a parameter, 
// and then we are going to have the other available booking
// array in the method , and then if the room number of the booking 
// matches the room numbers of the room Data being typed in - filter ,
// then push out the available rooms





export default User;

