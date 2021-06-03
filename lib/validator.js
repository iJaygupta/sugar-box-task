const Ajv = require("ajv");
const ajv = new Ajv();
const utils = require("../lib/utils");

exports.validateAjv = (schema) => {
    return function (request, response, next) {
        var validate = ajv.compile(schema);
        if (validate(request.body)) {
            next();
        } else {
            utils.ajvErrors(validate.errors, function (errMsg) {
                var output = {
                    "status": "failure",
                    "reason": errMsg
                }
                response.status(400).json(output);
            })
        }
    }
}