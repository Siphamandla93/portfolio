const express = require('express');
const mongoose = require('mongoose');

const mongoClient = 'mongodb+srv://Siphamandla_Mpalala:0748565458s@cluster0.tbmbb.mongodb.net/myFirstDatabase?retryWrites=true';

const connectPoint = async() => {

    await mongoose.connect(mongoClient, {useNewUrlParser: true, useUnifiedTopology: true})
    console.log('Our DB is connected');
 
 };

 module.exports = connectPoint;