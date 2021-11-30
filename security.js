const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')



const security = new Schema({

    password:{
        type:String, 
        required: true
    },
    email_login: {
        type:String,
        required: true
    }
    
});



let securityDB = mongoose.model('admin', security);



module.exports = securityDB;