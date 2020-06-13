const express = require('express');
const app = express();
const port = parseInt(process.env.EXPOSED_PORT);
const fs = require('fs');
const { Client } = require('pg');
const users = require('./models/users');
const events = require('./models/events');
const rsvps = require('./models/rsvps');

app.use(express.urlencoded({ extended: true }));

//connect to DB 
const client = new Client({
    connectionString: "postgres://root:pass@postgres:5432/events"
});

client
    .connect()
    .then(() => console.log('connected'))
    .catch(err => console.error('error', err.stack));

//serve html page
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

// receive post request to /addUser endpoint
app.post('/postUser', function (req, res) {
    // add data from form to userData obj
    var userData = req.body;

    // add userData to DB
    users.create(client, userData)

    // tests function to check if addUser is working correctly
    // returns users table => sends it to frontend
    users.all(client).then(function (rows, error) {
        if (typeof error !== "undefined") {
            res.send({ 'error': true });

            return;
        }

        res.send(rows[rows.length - 1]);
    })
    
})

// reveive post request to /addEvent endpoint
app.post('/postEvent', function (req, res) {
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
    })
});

// listen for connection on localhost
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
