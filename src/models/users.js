const utf8 = require('utf8');
const apiError = require('../errors/apiError');

// create a user
function create(client, data) {
    return new Promise(function (resolve, reject) {
        client.query('INSERT INTO users (first_name, last_name, username, email, user_password) VALUES ($1, $2, $3, $4, $5)', [data.firstName, data.lastName, data.username, data.email, data.password]).then().catch((err) => {
            reject(new apiError(parseInt(err.code), err.detail));
        });
    })
}

// return user with specific id
function retrieve(client, id) {
    return new Promise(function (resolve, reject) {
        client.query('SELECT * FROM users WHERE userid = $1', [id], function (err, response) {
            resolve(response.rows)
        })
    })
}

// update user with specific id
function update(client, data) {
    client.query('UPDATE users SET first_name = $1, last_name = $2, username = $3, email = $4, user_password = $5 WHERE userid = $6', [data.firstName, data.lastName, data.username, data.email, data.password, data.userid])
}

// return all rows
function all(client) {
    return new Promise(function (resolve, reject) {
        client.query('SELECT * FROM users', function (err, response) {
            resolve(response.rows)
        })
    })
}

// function to delete row (cant use delete as function name because it is a reseverd word in JS)
function remove(client, id) {
    client.query('DELETE FROM users WHERE userid = $1', [id]);
}

// forms a data object for the frontend
function format(data) {
    var frontendData = {};

    // decode data and form frontend data obj
    frontendData.userId = data.userid;
    frontendData.firstName = utf8.decode(data.first_name);
    frontendData.lastName = utf8.decode(data.last_name);
    frontendData.username = utf8.decode(data.username);
    frontendData.email = utf8.decode(data.email);

    return frontendData;
}

function validate(data) {

    var cleanInputs = {};
    var keys = Object.keys(data);
    var values = Object.values(data);
    
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // check email address
    if (!re.test(data.email)) {
        throw new Error('Invalid email address');
    }

    // check password
    if (data.password.length < 6) {
        throw new Error('Invalid password');
    }

    // trim extraneous chars and encode to UTF-8
    for (var i = 0; i < keys.length; i++) {
        cleanInputs[keys[i]] = utf8.encode(values[i].trim());
    }

    return cleanInputs;
    
}

module.exports = {
    'create': create,
    'retrieve': retrieve,
    'update': update,
    'all': all,
    'remove': remove,
    'format': format,
    'validate': validate
}