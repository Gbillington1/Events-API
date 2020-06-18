const express = require('express');
const app = express();
const port = parseInt(process.env.EXPOSED_PORT);
const fs = require('fs');
const { Client } = require('pg');
const cookieParser = require('cookie-parser');
const users = require('./models/users');
const events = require('./models/events');
const rsvps = require('./models/rsvps');

// validate data
function validate(data) {
    var isErr = false;
    var keys = Object.keys(data)
    var values = Object.values(data);
    for (var i = 0; i < values.length; i++) {
        if (typeof values[i] == typeof undefined || values[i] == "") {
            isErr = true;
        }
    }
    return isErr;
}

// use cookie-parsing middleware
app.use(cookieParser());

// is this middleware?
app.use(express.urlencoded({ extended: true }));

//connect to DB 
const client = new Client({
    connectionString: "postgres://root:pass@postgres:5432/events"
});

client
    .connect()
    .then(() => console.log('connected'))
    .catch(err => console.error('error', err.stack));

//serve html homepage
app.get('/', function (req, res) {
    fs.readFile("./index.html", function (err, data) {
        if (err) {
            res.writeHead(404);
            res.write("Not found");
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    });
});

app.get('/user/:username', function (req, res) {
    fs.readFile('./userIndex.html', function (err, data) {
        if (err) {
            res.writeHead(404);
            res.write("Not found");
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    })
})

app.get('/getUser', function(req, res) {
    // req.params was empty, why does req.query work?
    users.retrieve(client, req.query.userId).then(function (rows) {

        var data = users.format(rows[0]);
        
        res.send(data)

    }).catch(err => {console.error(err)})
})

// receive post request to /postUser endpoint
app.post('/postUser', function (req, res, next) {
    // validate data
    if (validate(req.body)) {
        var err = new Error('Invalid input from /postUser');
        next(err);
    } else {
        // add data from form to userData obj
        var userData = req.body;

        // add userData to DB
        users.create(client, userData)
        
        // tests function to check if addUser is working correctly
        // returns users table => sends it to frontend
        users.all(client).then(function (rows) {

            var data = users.format(rows[rows.length - 1]);

            res.cookie('userId', data.userId);
            res.cookie('usename', data.username);
            res.send(data);

        }).catch(err => {console.error(err)})
    }

})

app.get('/getEvents', function (req, res) {
    events.upcoming(client).then(function (rows) {
         if (rows.length > 0) {
             res.send(rows)
         } else {
             res.end();
         }
        // var data = users.format(row[0]);
        // console.log(rows[0].date, rows[0].time)

    }).catch(err => {console.error(err)})
})

// reveive post request to /addEvent endpoint
app.post('/postEvent', function (req, res, next) {
    // data is invalid
    if (validate(req.body)) {
        var err = new Error('Invalid input from /postEvent')
        next(err);
        // data is validated
    } else {
        // form eventData with data form frontend
        var eventData = req.body;
        // add event to DB
        events.create(client, eventData);

        // get event from DB and send it to frontend
        events.all(client).then(function (rows, error) {
            if (typeof error !== "undefined") {
                res.send({ 'error': true });

                return;
            }

            res.send(rows[rows.length - 1]);
        }).catch(err => {console.error(err)})
    }
});

// error handling
app.use(function (err, req, res, next) {
    // bad request err
    res.status(400);
    console.error(err)
    res.send(err);
})

// listen for connection on localhost
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
