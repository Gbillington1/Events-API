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

app.use(express.urlencoded({ extended: true }));

// basic validation
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
    var keys = Object.keys(data);
    for (var i = 0; i < values.length; i++) {
        if (typeof values[i] == typeof undefined || values[i] == "") {
            var err = new apiError(701, "Invalid request params at " + keys[i]);
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

app.get('/user', function (req, res) {

    users.retrieve(checkDb(), req.query.userId).then(function (rows) {

        var data = users.format(rows[0]);

        res.send(data)

    }).catch(err => { console.error(err) })
})

// receive post request to /user endpoint
app.post('/user', function (req, res, next) {
    // add data from form to userData obj
    var userData = users.validate(req.body);

    // add userData to DB => return new User
    users.create(checkDb(), userData).then(function(data) {

            res.cookie('userId', data.id);
            res.cookie('usename', data.username);
            res.send(data.output());
    

    }).catch(err => {

        next(err)

    });
})

app.get('/event', function (req, res) {
    events.upcoming(checkDb()).then(function (rows) {
        if (rows.length > 0) {
            var data = {};
            for (var i = 0; i < rows.length; i++) {
                data[i] = events.format(rows[i])
            }
            res.send(data)
        } else {
            res.end();
        }

    }).catch(err => { console.error(err) })
})

// reveive post request to /addEvent endpoint
app.post('/event', function (req, res) {
    // form eventData with data form frontend
    console.log(req.body)
    var eventData = events.validate(req.body);
    console.log(eventData)
    // add event to DB
    events.create(checkDb(), eventData);

    // get event from DB and send it to frontend
    events.all(checkDb()).then(function (rows, error) {
        if (typeof error !== "undefined") {
            res.send({ 'error': true });

            return;
        }

        console.log(rows[rows.length - 1])
        var data = events.format(rows[rows.length - 1]);
        console.log(data)
        res.send(data);
    }).catch(err => { console.error(err) })
});

// error handling
app.use(function (err, req, res, next) {
    var httpCode;
    if (err instanceof apiError) {
        httpCode = err.httpCode
        var output = {
            error: err.output()
        }
        res.status(httpCode);
    } else {
        httpCode = err.code;
    }
    console.error(err)
    res.send(output);
})

// listen for connection on localhost
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
