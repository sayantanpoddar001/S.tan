// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
        database: 'postgres',
      user:     'postgres',
      password: 'mantupoddar123*'
    }
  },
  development:{
    client:'postgresql',
    connection:{
      database: 'medicalstore',
      user:     'postgres',
      password: 'mantupoddar123*'
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'mantupoddar123*'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'medicalstore',
      user:     'postgres',
      password: 'mantupoddar123*'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
