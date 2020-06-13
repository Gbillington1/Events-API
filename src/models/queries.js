// add event to DB
function addEvent(client, data) {
    client.query('INSERT INTO events (event_name, event_description, event_date, event_time) VALUES ($1, $2, $3, $4)', [data.name, data.description, data.date, data.time])
}

function returnEvent(client) {
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

// add RSVP to DB
function addRSVP(client, data) {
    client.query('INSERT INTO rsvps (linked_event_id, linked_event_name, linked_user_id, linked_username, rsvp_status) VALUES ($1, $2, $3, $4, $5)', [data.eventID, data.eventName, data.userID, data.username, data.rsvpStatus])
}

module.exports = {
    'addEvent': addEvent,
    'returnEvent': returnEvent,
    'addRSVP': addRSVP
}