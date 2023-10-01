const { default: knex } = require('knex')

const connection = knex({
    client: 'better-sqlite3',
    connection: {
        filename: './db/dev.sqlite3',
    },
    useNullAsDefault: true,
})

connection.on('query', ({ sql, bindings }) => {
    const query = connection.raw(sql, bindings).toQuery()
    console.log('[db]', query)
})

module.exports = {connection}