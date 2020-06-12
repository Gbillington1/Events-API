const express = require('express');
const app = express();
const port = parseInt(process.env.EXPOSED_PORT);
const fs = require('fs');
const { Client } = require('pg');
const queries = require('./models/queries');

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

app.post('/addUser', function(req, res) {
    var userData = req.body;

    queries.addUser(client, userData);
    res.send("user added");
})


// listen for connection on localhost
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
