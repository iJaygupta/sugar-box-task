const app = require("./app");
const http = require("http").Server(app);
const mongo = require("./lib/dbConfig");


const PORT = process.env.PORT || 8000;

http.listen(PORT, function () {
    console.log(`Express server running on port ${PORT}`);
})


mongo.connectWithRetry()
