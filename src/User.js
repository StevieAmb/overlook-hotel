import userRoomData from "../data/sample-room-data";

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.roomsAlreadyBooked = []; //need a method for this
    this.totalSpent = 0;
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
}




export default User;

