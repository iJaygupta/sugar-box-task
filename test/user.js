process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Register User', function () {
    it(`should return location list on /api/location/${process.env.id} GET`, function (done) {
        chai.request(server)
            .post(`/api/v1/user/register`)
            .send({
                "name": "Andrei Dieu",
                "email": "andrei@gmail.com",
                "password": "1234",
                "addressLine": "128 A new pot",
                "city": "Virginia",
                "state": "Chula Vista",
                "zipCode": "32432",
                "phoneNo": "9876539832"
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});
