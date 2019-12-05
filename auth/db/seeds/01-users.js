
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'rowValue1', password: "asdsds"},
        {username: 'rowValue2', password: "asdasdasc"},
        {username: 'rowValue3', password: "poaskbds"}
      ]);
    });
};
