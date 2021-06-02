const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'sugarbox';
const dbUser = process.env.DB_USER || '';
const dbPass = process.env.DB_PASS || '';
const dbCred =
    dbUser.length > 0 || dbPass.length > 0 ? `${dbUser}:${dbPass}@` : '';

const dbUrl =
    process.env.DB_URL || `mongodb://${dbCred}${dbHost}:${dbPort}/${dbName}`;

module.exports = {

    port: process.env.PORT || 8000,

    jwtSecretKey: process.env.JWT_SECRET_KEY || 'YWRtaW46cjNAY3RpMG4=',

    expiresIn: 3600,

    mongodbServerUrl: dbUrl

};