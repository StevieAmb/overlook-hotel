import userRoomData from "../data/sample-room-data";

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.roomsAlreadyBooked = []; //need a method for this
    this.totalSpent = 0;
    this.unavailableRooms = [];
    this.availableRooms;
    this.wantedRooms = [];
    this.message;
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
          acc += randomRoom.costPerNight
        }
      })
      return acc
    }, 0)
    this.totalSpent = totalUserSpent;
  }


  findBookingsByDate = (date, bookings) => {
    this.unavailableRooms = bookings.filter(booking => booking.date === date) 
  }



  findAvailableRooms = (roomData) => {
    let unavailableRoomNumbers = this.unavailableRooms.map(unavailableRoom => unavailableRoom.roomNumber);
    let userAvailable = roomData.reduce((acc, room) => {
      if(!unavailableRoomNumbers.includes(room.number)) {
        acc.push(room)
      }
      return acc;
    }, [])
    this.availableRooms = userAvailable;
  }

  filterAvailableRooms = (desiredRoomType) => {
    let wantedRooms = this.availableRooms.filter(availableRoom => {
      if(availableRoom.roomType === desiredRoomType) {
        return availableRoom;
      } 
    })
      this.wantedRooms = wantedRooms;
  }

  throwError = () => {
    let desired = this.wantedRooms;
    if(desired.length === 0) {
       this.message = `I am SO SORRY! Please forgive me! I beg your pardon, and I promise if you pick another room, you can have one a tiny home. On me.`
    }
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
// array in the method , and then if the room number of the booking does NOT
// match the room numbers of the room Data being typed in - filter ,
// then push out the available rooms, because the rooms I have in my booking are NOT available





export default User;

