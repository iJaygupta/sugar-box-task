exports.ajvErrors = function (error, callback) {
    errorField = error[0].schemaPath;
    errorField = errorField.split("/");
    errorField = errorField[errorField.length - 2];
    var errMsg = errorField + " " + error[0].message;
    return callback(errMsg);
};