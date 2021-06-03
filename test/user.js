process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Register User Case-1', function () {
    it(`should return success on /api/v1/user/register POST`, function (done) {
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
                res.should.have.status(201);
                res.body.should.have.property('error', false);
                res.body.should.have.property('data');
                done();
            });
    });
});


describe('Register User Case-2', function () {
    it(`should return bad request on /api/v1/user/register POST`, function (done) {
        chai.request(server)
            .post(`/api/v1/user/register`)
            .send({
                "name": "",
                "email": "andrei@gmail.com",
                "password": "1234",
                "addressLine": "128 A new pot",
                "city": "Virginia",
                "state": "Chula Vista",
                "zipCode": "32432",
                "phoneNo": "9876539832"
            })
            .end(function (err, res) {
                res.should.have.status(400);
                done();
            });
    });
});

describe('Register User Case-3', function () {
    it(`should return bad request on /api/v1/user/register POST`, function (done) {
        chai.request(server)
            .post(`/api/v1/user/register`)
            .send({
                "name": "Andrei Dieu",
                "password": "1234",
                "addressLine": "128 A new pot",
                "city": "Virginia",
                "state": "Chula Vista",
                "zipCode": "32432",
                "phoneNo": "9876539832"
            })
            .end(function (err, res) {
                res.should.have.status(400);
                done();
            });
    });
});

describe('Log In Case-1', function () {
    it(`should return success with token and userdetail on /api/v1/user/login POST`, function (done) {
        chai.request(server)
            .post(`/api/v1/user/login`)
            .send({
                "email": "andrei@gmail.com",
                "password": "1234"
            })
            .end(function (err, res) {
                process.env.token = res.body && res.body.data && res.body.data.token ? res.body.data.token : ``;
                process.env.id = res.body && res.body.data && res.body.data.user ? res.body.data.user._id : ``;
                res.should.have.status(200);
                res.body.should.have.property('error', false);
                res.body.should.have.property('data');
                done();
            });
    });
});


describe('Log In Case-2', function () {
    it(`should return bad request on /api/v1/user/login POST`, function (done) {
        chai.request(server)
            .post(`/api/v1/user/login`)
            .send({
                "zipCode": "32432",
                "phoneNo": "9876539832"
            })
            .end(function (err, res) {
                res.should.have.status(400);
                done();
            });
    });
});

describe('Log In Case-3', function () {
    it(`should return bad request on /api/v1/user/login POST`, function (done) {
        chai.request(server)
            .post(`/api/v1/user/login`)
            .send({
                "email": "andrei@gmail.com",
                "password": "",
            })
            .end(function (err, res) {
                res.should.have.status(400);
                done();
            });
    });
});


describe('List User Case-1', function () {
    it(`should return success with user list /api/v1/user/list GET`, function (done) {
        chai.request(server)
            .get(`/api/v1/user/list`)
            .set(`Authorization`, process.env.token)
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('error', false);
                res.body.should.have.property('data');
                done();
            });
    });
});


describe('List User Case-2', function () {
    it(`should return unauthorized on /api/v1/user/list GET`, function (done) {
        chai.request(server)
            .get(`/api/v1/user/list`)
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });
});


describe('Get A User Case-1', function () {
    it(`should return success with userdetail on /api/v1/user/id POST`, function (done) {
        chai.request(server)
            .get(`/api/v1/user/${process.env.id}`)
            .set(`Authorization`, process.env.token)
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('error', false);
                res.body.should.have.property('data');
                done();
            });
    });
});

describe('Get A User Case-2', function () {
    it(`should return unauthorized on /api/v1/user/id POST`, function (done) {
        chai.request(server)
            .get(`/api/v1/user/${process.env.id}`)
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });
});


describe('Update A User Case-1', function () {
    it(`should return success on /api/v1/user/id PUT`, function (done) {
        chai.request(server)
            .put(`/api/v1/user/${process.env.id}`)
            .set(`Authorization`, process.env.token)
            .send({
                "name": "Jay Cutler",
                "state": "Alpino"
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('error', false);
                res.body.should.have.property('data');
                done();
            });
    });
});


describe('Update A User Case-2', function () {
    it(`should return unauthorized on /api/v1/user/id PUT`, function (done) {
        chai.request(server)
            .put(`/api/v1/user/${process.env.id}`)
            .send({
                "name": "Jay Cutler",
                "state": "Alpino"
            })
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });
});


describe('Update A User Case-3', function () {
    it(`should return bad request on /api/v1/user/id PUT`, function (done) {
        chai.request(server)
            .put(`/api/v1/user/${process.env.id}`)
            .set(`Authorization`, process.env.token)
            .send({
                "password": "fakepassword"
            })
            .end(function (err, res) {
                res.should.have.status(400);
                done();
            });
    });
});

describe('Delete A User Case-1', function () {
    it(`should return bad request on /api/v1/user/id DELETE`, function (done) {
        chai.request(server)
            .delete(`/api/v1/user/${process.env.id}`)
            .set(`Authorization`, process.env.token)
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('error', false);
                res.body.should.have.property('data');
                done();
            });
    });
});


describe('Delete A User Case-1', function () {
    it(`should return bad request on /api/v1/user/id DELETE`, function (done) {
        chai.request(server)
            .delete(`/api/v1/user/${process.env.id}`)
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });
});