const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const config = require('./_config/database');

mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
	console.log("Database => " + config.database);
})

mongoose.connection.on('error', (err) =>{
	console.log("Database error => " + err);
})

app.use(cors());

app.use(require("./_config/corsheaders"));

app.use(bodyParser.json({limit: '5mb'}));

app.use(express.static(path.join(__dirname + "public")));

app.use(passport.initialize());
app.use(passport.session());

require('./_config/passport')(passport)

const users = require('./_routes/users');

app.use('/users', users);

app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, () => {
	console.log("Listening on port 3000");
});