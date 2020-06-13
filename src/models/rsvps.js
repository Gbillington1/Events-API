// havent tested any of these

// create an rsvp
function create(client, data) {
    client.query('INSERT INTO rsvps (linked_event_id, linked_user_id, rsvp_status) VALUES ($1, $2, $3)', [data.eventID, data.userID, data.rsvpStatus]);
}

// return rsvp with specific event and user id
function retrieve(client, eventID, userID) {
    return new Promise(function (resolve, reject) {
        client.query('SELECT * FROM rsvps WHERE linked_event_id = $1 AND linked_user_id = $2', [eventID, userID], function (err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(response.rows)
            }
        })
    })
} 

// update rsvp status with specific event and user id
function update(client, data) {
    client.query('UPDATE rsvps SET rsvp_status = $1 WHERE linked_event_id = $2 AND linked_user_id = $3', [data.rsvpStatus, data.eventID, data.userID])
}

// return all rows
function all(client) {
    return new Promise(function (resolve, reject) {
        client.query('SELECT * FROM rsvps', function (err, response) {
            if (err) {
                reject(err)
            } else {
                resolve(response.rows)
            }
        })
    })
}

// function to delete row (cant use delete as function name because it is a reseverd word in JS)
function remove(client, eventID, userID) {
    client.query('DELETE FROM rsvps WHERE linked_event_id = $1 AND linked_user_id = $2', [eventID, userID]);
}

module.exports = {
    'create': create,
    'retrieve': retrieve,
    'update': update,
    'all': all,
    'remove': remove
}