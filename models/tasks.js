const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskSchema = new Schema({

});

exports.Task = mongoose.model('task', taskSchema);
