exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('customers', function(table) {
            table.increments('id').primary();
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
            table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.string('email_address').notNullable();
            table.string('stripe_customer_id').nullable();
        }),
        knex.schema.createTableIfNotExists('orders', function(table) {
            table.increments('id').primary();
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
            table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
            table.integer('customer_id').notNullable();
            table.integer('car_id').notNullable();
            table.float('order_amount').notNullable();
            table.foreign('customer_id').references('customers.id');
            table.foreign('car_id').references('cars.id');
        }),
        knex.schema.createTableIfNotExists('payments', function(table) {
            table.increments('id').primary();
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
            table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
            table.integer('customer_id').notNullable();
            table.integer('order_id').notNullable();
            table.string('payment_method').notNullable();
            table.float('payment_amount').notNullable();
            table.string('stripe_charge_id').nullable()
            table.string('payment_method_last_4').nullable()
            table.foreign('customer_id').references('customers.id');
            table.foreign('order_id').references('orders.id');
        }),
        knex.schema.createTableIfNotExists('cars', function(table) {
            table.increments('id').primary();
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
            table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
            table.string('car_category').notNullable();
            table.string('car_type').notNullable();
            table.string('car_color').notNullable();
            table.float('car_amount').defaultTo(100);
            table.string('car_description').nullable();
            table.string('car_image_url').notNullable();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('payments'),
        knex.schema.dropTable('orders'),
        knex.schema.dropTable('customers'),
        knex.schema.dropTable('cars')
    ]);
};