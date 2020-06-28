// check if string is ISO-8601 format 
function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    var d = new Date(str);
    return d.toISOString() === str;
}

// create an event
function create(client, data) {
    client.query('INSERT INTO events (event_name, event_description, event_timestamp) VALUES ($1, $2, $3)', [data.name, data.description, data.timestamp]);
}

// return event with specific id
function retrieve(client, id) {
    return new Promise(function (resolve, reject) {
        client.query('SELECT * FROM events WHERE event_id = $1', [id], function (err, response) {
            resolve(response.rows)
        })
    })
}

// update event with specific id
function update(client, data) {
    client.query('UPDATE events SET event_name = $1, event_description = $2, event_timestamp = $3 WHERE event_id = $5', [data.name, data.description, data.timestamp, data.event_id])
}

// return all rows
function all(client) {
    return new Promise(function (resolve, reject) {
        client.query('SELECT * FROM events', function (err, response) {
            resolve(response.rows)
        })
    })
}

function upcoming(client) {
    return new Promise(function (resolve, reject) {
        client.query('SELECT * FROM events WHERE event_timestamp >= CURRENT_TIMESTAMP', function (err, response) {
            resolve(response.rows)
        })
    })
}

// function to delete row (cant use delete as function name because it is a reseverd word in JS)
function remove(client, id) {
    client.query('DELETE FROM events WHERE event_id = $1', [id]);
}

// format (and decode) data for the frontend
function format(data) {
    var frontendData = {};

    // decode data and form frontend data obj
    frontendData.eventId = data.event_id;
    frontendData.name = data.event_name;
    frontendData.description = data.event_description;
    frontendData.timestamp = data.event_timestamp;

    return frontendData;
}

// validate (trim and encode) data
function validate(data) {

    var cleanInputs = {};
    var keys = Object.keys(data);
    var values = Object.values(data);

    // check timestamp
    if (!isIsoDate(data.timestamp)) {
        console.log('error')
        throw new Error('Invalid date and/or time');
    }
    
    // trim extraneous chars and encode to UTF-8
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] != 'timestamp') {
            cleanInputs[keys[i]] = values[i].trim();
        } else {
            cleanInputs[keys[i]] = values[i].trim();
        }
    }

    return cleanInputs;

}

module.exports = {
    'create': create,
    'retrieve': retrieve,
    'update': update,
    'all': all,
    'upcoming': upcoming,
    'remove': remove,
    'format': format,
    'validate': validate
}