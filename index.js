const express = require('express');
const app = express();
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const session =require('express-session');
const flash = require('express-flash')
const mongoose = require('mongoose');

const router = require('./execirse');
const PORT = process.env.PORT || 3009

const connectPoint = require('./mongooseClient')



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: true
  }))

app.use(express.json());

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
 app.use('/Inbox', router)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});