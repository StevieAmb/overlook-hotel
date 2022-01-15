import userData from '../data/sample-user-data';
import userRoomData from '../data/sample-room-data';
import userBookingData from '../data/sample-booking-data';
import Booking from '../src/Booking';
import User from '../src/User';
import chai from 'chai';
const expect = chai.expect;

describe('User', () => {
  let user1;
  let user2;
  let booking1;
  let booking2;
  let booking3;
  
  beforeEach(() => {
    user1 = new User(userData[3])
    user2 = new User(userData[0])
    console.log(user1)
    booking1 = new Booking(userBookingData[2])
    booking2 = new Booking(userBookingData[5])
    booking3 = new Booking(userBookingData[1])
  });

    it('Should be a function', () => {
      expect(User).to.be.a('function');
    });

    it('Should be an instance of User', () => {
      expect(user1).to.be.an.instanceOf(User);
    });

    it('User should have an id', () => {
      expect(user1.id).to.equal(userData[3].id);
    });

    it('User should have a name', () => {
      expect(user1.name).to.equal(userData[3].name)
    });

    it('Should have a list of all the bookings the user has made', () => {
      user1.findBookedRooms(userBookingData);
  
      expect(user1.roomsAlreadyBooked.length).to.equal(2)
    });

    it('Should inspire the user to book a room if they have not booked any', () => {
      let message = user2.findBookedRooms(userBookingData)
  
      expect(message).to.equal(`You haven't booked any rooms, yet! Get your vacation started with Overlook!`)
    });

    it('Should tell you how much a user has spent on all their bookings so far', () => {
      user1.findBookedRooms(userBookingData);

      let total = user1.getTotalSpentOnRooms(userRoomData);
      expect(total).to.equal(836.58)
    });

  })
    