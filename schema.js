const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({

    name: String,
    surname:String,
    email: String,
    subject: String,
    message: String


});

let collection = mongoose.model('clients', clientSchema);

module.exports = collection;