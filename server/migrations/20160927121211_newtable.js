'use strict';

exports.up = function(knex, Promise) {
  var schema = knex.schema;

  return Promise.all([
    schema.hasTable('users').then(function(exists) {
      if (!exists) {
        console.log("Creating users table");
        return schema.createTable('users', function(table) {
          table.increments('id');
          table.string('deviceId').notNullable().index();
          table.string('name').notNullable();
          table.string('password').notNullable();
          table.bigInteger('pepes');
          table.timestamps();
          console.log("done with users table");
        });
      } else {
        return schema;
      }
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};