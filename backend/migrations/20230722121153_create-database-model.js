/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex.schema
        .createTable('tb_Students', tb => {
            tb.string('id_student').primary();
            tb.string('name').notNullable();
            tb.string('surname').notNullable();
            tb.string('username').unique().notNullable();
            tb.string('password').notNullable();
        })
        .createTable('tb_Professors', tb => {
            tb.string('id_professor').primary();
            tb.string('name').notNullable();
            tb.string('surname').notNullable();
            tb.string('username').unique().notNullable();
            tb.string('password').notNullable();
        })
        .createTable('tb_Courses', tb => {
            tb.string('id_course').primary();
            tb.string('title').unique().notNullable();
            tb.string('id_professor').notNullable();
            tb.foreign('id_professor').references('tb_Professors.id_professor').onDelete('CASCADE');
        })
        .createTable('tb_Tasks', tb => {
            tb.string('id_task').primary();
            tb.string('title').notNullable();
            tb.string('description').notNullable();
            tb.date('date_created').notNullable();
            tb.string('id_course').notNullable();
            tb.foreign('id_course').references('tb_Courses.id_course').onDelete('CASCADE');
        })
        .createTable('tb_Lectures', tb => {
            tb.string('id_lecture').primary();
            tb.string('title').notNullable();
            tb.string('url').notNullable();
            tb.date('date_created').notNullable();
            tb.string('id_course').notNullable();
            tb.foreign('id_course').references('tb_Courses.id_course').onDelete('CASCADE');
        })
        .createTable('tb_Submissions', tb => {
            tb.string('id_submission').primary();
            tb.date('date_submitted').notNullable();
            tb.string('url').notNullable();
            tb.string('title').notNullable();
            tb.double('grade').nullable();
            tb.string('id_student').notNullable();
            tb.string('id_task').notNullable();
            tb.foreign('id_student').references('tb_Students.id_student').onDelete('CASCADE');
            tb.foreign('id_task').references('tb_Tasks.id_task').onDelete('CASCADE');
            tb.unique(['id_student', 'id_task']);
        })
        .createTable('tb_Enrollments', tb => {
            tb.string('id_enrollment').primary();
            tb.string('id_student').notNullable();
            tb.foreign('id_student').references('tb_Students.id_student').onDelete('CASCADE');
            tb.string('id_course').notNullable();
            tb.foreign('id_course').references('tb_Courses.id_course').onDelete('CASCADE');
            tb.unique(['id_student', 'id_course']);
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
