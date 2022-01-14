import Room from '../src/Room';
import userRoomData from '../data/sample-room-data';
import chai from 'chai';
const expect = chai.expect;

describe('Room', () => {
  let room;

  beforeEach(() => {
    room = new Room(userRoomData[0]);
  });

    it('Should be a function', () => {
      expect(Room).to.be.a('function');
    });

    it('Should be an instance of Room', () => {
      expect(room).to.be.an.instanceOf(Room);
    });

    it('Should have a room number', () => {
      expect(room.number).to.equal(1);
    });

    it('Should have a room type', () => {
      expect(room.roomType).to.equal('residential suite');
    });

    it('Should be able to check if there is a bidet', () => {
      expect(room.bidet).to.equal(true);
    });

    it('Should be able to display the bedsize', () => {
      expect(room.bedSize).to.equal('queen');
    });

    it('Should tell us the number of bed in the room', () => {
      expect(room.numBeds).to.equal(1);
    });

    it('Should tell us the cost per night of booking the room', () => {
      expect(room.costPerNight).to.equal(358.40);
    })



  })