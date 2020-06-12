// add user to DB
function addUser(client, data) {
    client.query('INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5)', [data.firstName, data.lastName, data.username, data.email, data.password])
}

// add event to DB
function addEvent(client, data) {
    client.query('INSERT INTO events (event_name, event_description, event_date, event_time) VALUES ($1, $2, $3, $4', [data.name, data.description, data.date, data.time])
}

// add RSVP to DB
function addRSVP(client, data) {
    client.query('INSERT INTO rsvps (linked_event_id, linked_event_name, linked_user_id, linked_username, rsvp_status) VALUES ($1, $2, $3, $4, $5', [data.eventID, data.eventName, data.userID, data.username, data.rsvpStatus])
}

module.exports = {
    'addUser': addUser,
    'addEvent': addEvent,
    'addRSVP': addRSVP
}