const express = require('express');
const app = express();
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const session =require('express-session');
const flash = require('express-flash')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const securityDB = require('./security')
var cookieParser = require('cookie-parser')

const router = require('./execirse');
const PORT = process.env.PORT || 3009

const connectPoint = require('./mongooseClient')



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
  }))

app.use(express.json());
app.use(cookieParser())

app.use(express.static('public'));
app.use(express.static('views/images'));

app.use(session({
  secret: "keyboard cat",
  cookie: {
      maxAge: 60000 * 30
  }
}));

app.use(flash());


connectPoint()

app.use('/', router);
app.use('/About', router);
app.use('/Resume', router);
app.use('/Contact', router);
app.use('/View', router);
app.use('/Form', router);
app.use('/Inbox', router);
app.use('/Logins', router);
app.use('/register', router);
 
router.post('/signin', (req,res) => {

  const user = {
      username: 'siphamandla',
      email:'mpalalasiphamandla@gmail.com'
  }

  let username = req.body.username;
  let email = req.body.email;

  if(!username || !email){

   req.flash('error', 'Please add all fields')
   res.redirect('/Logins')
  }
  else if(username !== user.username || email !== user.email){

      res.status(400).json({
          msg: 'Credentials do not match'
      })
  }
  else(
      res.status(200).redirect('/Inbox')
  )
});


app.listen(PORT, () => {
    console.log(`App is listining`)
}); 