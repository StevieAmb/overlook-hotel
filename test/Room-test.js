import Room from '../src/Room';
import userRoomData from '../data/sample-room-data';
import chai from 'chai';
const expect = chai.expect;

describe('User', () => {
  let room;

  beforeEach(() => {
    room = new Room(userRoomData[0]);
  });

    it('Should be a function', () => {
      expect(Room).to.be.a('function');
    });

    it('Should be an instance of User', () => {
      expect(room).to.be.an.instanceOf(Room);
    });

    it('Should have a room number', () => {
      
    })



  })