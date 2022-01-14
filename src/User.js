import userRoomData from "../data/sample-room-data";

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.roomsAlreadyBooked = []; //need a method for this
  }

  findBookedRooms = (booking) => {
    if(this.id === booking.userID) {
      this.roomsAlreadyBooked.push(booking)
    } else {
      return `You haven't booked any rooms, yet! Get your vacation started with Overlook!`
    }
  }

  getTotalSpentOnRooms = (userRoomData) => {
    let totalSpent = this.roomsAlreadyBooked.reduce((acc, userRoom) => {
      userRoomData.forEach(randomRoom => {
        console.log("from user", userRoom);
        console.log("from data", randomRoom)
        if(userRoom.roomNumber === randomRoom.number) {
          acc += randomRoom.costPerNight;
        }
      })
      return acc
    }, 0)
    return totalSpent
  }
}


export default User;

