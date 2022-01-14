import Booking from '../src/Booking';
import userBookingData from '../data/sample-booking-data';
import chai from 'chai';
const expect = chai.expect;

describe('User', () => {
  let booking;
  beforeEach(() => {
    user = new Booking()
  });

    it('Should be a function', () => {
      expect(Booking).to.be.a('function');
    });

    it('Should be an instance of User', () => {
      expect(booking).to.be.an.instanceOf(Booking);
    });

    it('Should have an ID', () => {
      expect(booking.id).to.equal(userBookingData[0].id);
    });

    it('Should have a user ID', () => {
      expect(booking.userID).to.equal(userBookingData[0].userID);
    });

    it('Should have a date', () => )

  })