var jwt = require('jsonwebtoken');
const config = require("./server")


exports.generateAuthToken = function (payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, config.jwtSecretKey, { expiresIn: config.expiresIn }, function (err, token) {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    })
}

exports.verifyAuthToken = function (request, response, next) {
    let token = request.headers['authorization'];
    jwt.verify(token, config.jwtSecretKey, function (err, data) {
        if (err && err.name === 'TokenExpiredError')
            return response.status(401).send({ error: true, code: 'TokenExpiredError', message: 'The token has been expired.' })

        if (err && err.name != 'TokenExpiredError')
            return response.status(401).send({ error: true, message: 'Unauthorized Access.' })
        request.headers.payload = data;
        next();
    })
}