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

module.exports = {
    'create': create,
    'retrieve': retrieve,
    'update': update,
    'all': all,
    'upcoming': upcoming,
    'remove': remove
}