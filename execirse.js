const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const collection = require('./schema')
const securityDB = require('./security')
const flash = require('express-flash')
const jwt = require('jsonwebtoken');


router.use(flash());


router.get('/', (req,res) =>{

    res.redirect('about')
});


 router.get('/About', (req,res) => {
     res.render('about')
});

router.get('/Resume', (req,res) => {
    res.render('resume')
});

router.get('/Contact', (req,res)=>{
    res.render('contact')
})

router.get('/View', (req,res)=>{
    res.render('database')
})

router.get('/Logins', (req,res)=>{
    res.render('logins')
})

router.post('/Form', (req,res) => {

    const constructor = new collection({
        
        name: req.body.name,
        surname: req.body.surname,
        message: req.body.message,
        email: req.body.email,
        subject: req.body.subject
       
    })

    if(!constructor.name || !constructor.surname || !constructor.message || !constructor.email || !constructor.subject){

       return res.status(400).json({msg: 'Please fill all fields'})
    }

    constructor.save()
    .then( result => {
        res.status(200).redirect('about')
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});




router.get('/Inbox',(req,res) => {

    const results = collection.find().lean()
    .exec()
    .then(results => {

        res.status(200).render('allinboxe', {
            inbox: results
        })
    }
    )
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;