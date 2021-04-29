
exports.up = (knex) => {

    return knex.schema.createTable('contactDetails', (table) => {
        table.increments().primary();
        table.string('name').notNullable();
        table.text('email').notNullable();
        table.text('mobile').notNullable();
        table.text("designation").notNullable();
        table.text("date_of_joining").notNullable();
       

    });

};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists("contactDetails");

};
