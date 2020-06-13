// create a user
function create(client, data) {
    client.query('INSERT INTO users (first_name, last_name, username, email, user_password) VALUES ($1, $2, $3, $4, $5)', [data.firstName, data.lastName, data.username, data.email, data.password]);
}

// return user with specific id
function retrieve(client, id) {
    return new Promise(function (resolve, reject) {
        client.query('SELECT * FROM users WHERE userid = $1', [id], function (err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(response.rows)
            }
        })
    })
} 

function update(client, data) {
    client.query('UPDATE users SET first_name = $1, last_name = $2, username = $3, email = $4, user_password = $5 WHERE userid = $6', [data.firstName, data.lastName, data.username, data.email, data.password, data.userid])
}

// return all rows
function all(client) {
    return new Promise(function (resolve, reject) {
        client.query('SELECT * FROM users', function (err, response) {
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
    client.query('DELETE FORM users WHERE id = $1', [id]);
}

module.exports = {
    'create': create,
    'retrieve': retrieve,
    'update': update,
    'all': all,
    'remove': remove
}