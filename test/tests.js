const chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised).should();

const User = require('../models/users');

describe('Users model tests', () => {
    // Given an email address, do we get a user object in return?
    it('should be a valid user object', async () => {
        const userInstance = new User(null, null, null, 'x', null);
        const theUser = await userInstance.getUserByEmail();
        console.log("the user is: ", theUser)
        expect(theUser).to.be.an('object');
    });

    it('should NOT be undefined', async () => {
        const userInstance = new User(null, null, null, 'x', null);
        const theUser = await userInstance.getUserByEmail();
        console.log("theUser.id: ", theUser.id);
        expect(theUser.id).to.not.be.an('undefined');
    });

    it('should get a list of all users', async () => {
        const allUsers = await User.getAllUsers();
        console.log("allUsers: ", allUsers);
        expect(allUsers).to.not.be.an('undefined');
    })

    it('Check that a user is an object', async () => {
        const userInstance = new User(null, null, null, 'x', null);
        const theUser = await userInstance.getUserByEmail();
        console.log("the user is: ", theUser)
        expect(theUser).to.be.an('object');
    })

});