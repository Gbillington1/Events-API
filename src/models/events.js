// create an event
function create(client, data) {
    client.query('INSERT INTO events (event_name, event_description, event_date, event_time) VALUES ($1, $2, $3, $4)', [data.name, data.description, data.date, data.time]);
}

// return event with specific id
function retrieve(client, id) {
    return new Promise(function (resolve, reject) {
        client.query('SELECT * FROM events WHERE event_id = $1', [id], function (err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(response.rows)
            }
        })
    })
} 

// update event with specific id
function update(client, data) {
    client.query('UPDATE events SET event_name = $1, event_description = $2, event_date = $3, event_time = $4 WHERE event_id = $5', [data.name, data.description, data.date, data.time, data.event_id])
}

// return all rows
function all(client) {
    return new Promise(function (resolve, reject) {
        client.query('SELECT * FROM events', function (err, response) {
            if (err) {
                reject(err)
            } else {
                resolve(response.rows)
            }
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
    'remove': remove
}