module.exports = {
  dialect: 'postgres',
  host: 'localhost', // substituir por localhost
  username: 'postgres',
  password: 'docker',
  port: 5433,
  database: 'meetapp',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
