import User from '../src/User';
import userData from '../data/sample-user-data';
import chai from 'chai';
const expect = chai.expect;

describe('User', () => {
  let user;
  beforeEach(() => {
    user = new User(userData[0])
  });

    it('Should be a function', () => {
      expect(User).to.be.a('function');
    });

    it('Should be an instance of User', () => {
      expect(user).to.be.an.instanceOf(User);
    });

    it('User should have an id', () => {
      expect(user.id).to.equal(1);
    });

    it('User should have a name', () => {
      expect(user.name).to.equal("Leatha Ullrich")
    });



  })
    