const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    addressLine: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    phoneNo: { type: String }
}, {
    timestamps: true
});


exports.User = mongoose.model('user', userSchema);