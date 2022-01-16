import userData from '../data/sample-user-data';
import userRoomData from '../data/sample-room-data';
import userBookingData from '../data/sample-booking-data';
import Booking from '../src/Booking';
import User from '../src/User';
import chai from 'chai';
import userBookingDdata from '../data/sample-booking-data';
const expect = chai.expect;

describe('User', () => {
  let user1;
  let user2;
  
  beforeEach(() => {
    user1 = new User(userData[3])
    user2 = new User(userData[0])
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

      user1.getTotalSpentOnRooms(userRoomData);
      expect(user1.totalSpent).to.equal(836.58)
    });

    it('Should tell what has been booked on the date you have selected', () => {
      user1.findBookingsByDate("2022/02/16", userBookingDdata)

      expect(user1.unavailableRooms[0]).to.equal(userBookingData[2])
      expect(user1.unavailableRooms[1]).to.equal(userBookingDdata[4])
    })

    it('Should tell you available rooms based on the date', () => {
      user1.findBookingsByDate("2022/02/16", userBookingData)
      user1.findAvailableRooms(userRoomData);

      expect(user1.availableRooms[0]).to.equal(userRoomData[0]);
      expect(user1.availableRooms[1]).to.equal(userRoomData[1]);
      expect(user1.availableRooms[2]).to.equal(userRoomData[3]);
      expect(user1.availableRooms[3]).to.equal(userRoomData[5]);

    })

  })
    