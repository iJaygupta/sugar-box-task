module.exports = {

    registerUser: {
        properties: {
            name: { type: ["string"], minLength: 4 },
            email: { type: ["string"], minLength: 1 },
            password: { type: ["string"], minLength: 1 },
            addressLine: { type: ["string"], minLength: 1 },
            city: { type: ["string"], minLength: 1 },
            state: { type: ["string"], minLength: 1 },
            zipCode: { type: ["string"], minLength: 4 },
            phoneNo: { type: ["string"], minLength: 10, maxLength: 10 },
        },
        type: "object",
        required: ["name", "email", "password"],
        additionalProperties: false,
    },

    logIn: {
        properties: {
            email: { type: ["string"], minLength: 1 },
            password: { type: ["string"], minLength: 1 },
        },
        type: "object",
        required: ["email", "password"],
        additionalProperties: false,
    },

    updateUser: {
        properties: {
            name: { type: ["string"], minLength: 4 },
            addressLine: { type: ["string"], minLength: 1 },
            city: { type: ["string"], minLength: 1 },
            state: { type: ["string"], minLength: 1 },
            zipCode: { type: ["string"], minLength: 4 },
            phoneNo: { type: ["string"], minLength: 10, maxLength: 10 },
        },
        type: "object",
        additionalProperties: false,
    },


};