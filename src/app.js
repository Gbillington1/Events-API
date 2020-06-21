const express = require('express');
const app = express();
const port = parseInt(process.env.EXPOSED_PORT);
const fs = require('fs');
const { Client } = require('pg');
const cookieParser = require('cookie-parser');
const users = require('./models/users');
const events = require('./models/events');
const rsvps = require('./models/rsvps');
const apiError = require("./errors/apiError");
let isDbUp = false;

// use cookie-parsing middleware
app.use(cookieParser());

// is this middleware?
app.use(express.urlencoded({ extended: true }));

// validate data
app.use(function (req, res, next) {
    var data;
    switch (req.method) {
        case "GET":
            data = req.query
            break;

        default:
            data = req.body;
            break;
    }
    var values = Object.values(data);
    for (var i = 0; i < values.length; i++) {
        if (typeof values[i] == typeof undefined || values[i] == "") {
            var err = new apiError(701, "Invalid request params");
            next(err);
            return;
        }
    }
    next();
})

//connect to DB 
const client = new Client({
    connectionString: "postgres://root:pass@postgres:5432/events"
});

client
    .connect()
    .then(() => {
        console.log('connected')
        isDbUp = true;
    })
    .catch(err => console.error('error', err.stack));

function checkDb() {
    if (isDbUp) {
        return client;
    }
}

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

app.get('/getUser', function (req, res) {
    // req.params was empty, why does req.query work?
    users.retrieve(checkDb(), req.query.userId).then(function (rows) {

        var data = users.format(rows[0]);

        res.send(data)

    }).catch(err => { console.error(err) })
})

// receive post request to /postUser endpoint
app.post('/postUser', function (req, res, next) {

    // add data from form to userData obj
    var userData = req.body;

    // add userData to DB
    users.create(checkDb(), userData)

    // tests function to check if addUser is working correctly
    // returns users table => sends it to frontend
    users.all(checkDb()).then(function (rows) {

        var data = users.format(rows[rows.length - 1]);

        res.cookie('userId', data.userId);
        res.cookie('usename', data.username);
        res.send(data);

    }).catch(err => { console.error(err) })

})

app.get('/getEvents', function (req, res) {
    events.upcoming(checkDb()).then(function (rows) {
        if (rows.length > 0) {
            res.send(rows)
        } else {
            res.end();
        }

    }).catch(err => { console.error(err) })
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
        events.create(checkDb(), eventData);

        // get event from DB and send it to frontend
        events.all(checkDb()).then(function (rows, error) {
            if (typeof error !== "undefined") {
                res.send({ 'error': true });

                return;
            }

            res.send(rows[rows.length - 1]);
        }).catch(err => { console.error(err) })
    }
});

// error handling
app.use(function (err, req, res, next) {
    var httpCode;
    switch (err.code) {
        case 300:
        case 301:
        case 302:
        case 310:
        case 312:
            httpCode = 401;
            break;

        case 311:
            httpCode = 400;
            break;

        case 320:
            httpCode = 403;
            break;

        case 700:
        case 701:
            httpCode = 412;
            break;
    }
    // bad request err
    var output = {
        error: err.output()
    }
    res.status(httpCode);
    console.error(err)
    res.send(output);
})

// listen for connection on localhost
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
