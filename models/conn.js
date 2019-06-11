const pgp = require('pg-promise') ({
    query: e => {
        console.log('QUERY:', e.query);
    }    
})

const options = {
    host: 'localhost',
    database: 'my_cool_site',
    user: 'igorpopenov'
}

const db = pgp(options);

module.exports = db;

