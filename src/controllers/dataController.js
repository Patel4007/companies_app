const cassandra = require('../cassandra');

exports.getData = (req, res) => {
    const query = 'SELECT * FROM keyspace.table;';
    cassandra.execute(query, [], { prepare: true })
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.error('Error executing query: ', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};