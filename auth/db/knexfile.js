// Update with your config settings.

module.exports = {
development: {
    client: 'sqlite3',
    connection: {
      filename: './auth/db/users.db3'
    },
    useNullAsDefault: true
  }
};
