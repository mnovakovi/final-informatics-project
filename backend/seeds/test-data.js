const { faker, ne } = require('@faker-js/faker')
const { Random } = require('random-js')
const uniqid = require('uniqid')
const bcrypt = require('bcrypt')
const { up } = require('../migrations/20230722121153_create-database-model')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tb_Students').del()
  await knex('tb_Professors').del()
  await knex('tb_Courses').del()
  await knex('tb_Enrollments').del()
  await knex('tb_Tasks').del()
  await knex('tb_Submissions').del()

  const random = new Random();
  const password = await bcrypt.hash('password', 10)
  const students = []
  for (let i = 1; i <= 50; i++) {
    students.push({
      id_student: uniqid(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      get username() { return faker.internet.displayName({ firstName: this.name, lastName: this.surname }) },
      password: password
    });
  };
  await knex('tb_Students').insert(students);

  const professors = []
  for (let i = 1; i <= 5; i++) {
    professors.push({
      id_professor: uniqid(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      get username() { return faker.internet.displayName({ firstName: this.name, lastName: this.surname }) },
      password: password
    });
  };
  await knex('tb_Professors').insert(professors);

  const courses = [
    {
      id_course: uniqid(),
      title: "Programming in Java",
      id_professor: professors[0].id_professor
    },
    {
      id_course: uniqid(),
      title: "Programming in C#",
      id_professor: professors[0].id_professor
    },
    {
      id_course: uniqid(),
      title: "Introduction to Artificial Intelligence",
      id_professor: professors[1].id_professor
    },
    {
      id_course: uniqid(),
      title: "Computer Networks",
      id_professor: professors[1].id_professor
    },
    {
      id_course: uniqid(),
      title: "Programming of Web Applications",
      id_professor: professors[2].id_professor
    },
    {
      id_course: uniqid(),
      title: "Operating Systems",
      id_professor: professors[2].id_professor
    },
    {
      id_course: uniqid(),
      title: "Databases",
      id_professor: professors[3].id_professor
    },
    {
      id_course: uniqid(),
      title: "Data Structures and Algorithms",
      id_professor: professors[3].id_professor
    },
    {
      id_course: uniqid(),
      title: "Parallel Programming",
      id_professor: professors[4].id_professor
    },
    {
      id_course: uniqid(),
      title: "Object Oriented Programming",
      id_professor: professors[4].id_professor
    },
  ]
  await knex('tb_Courses').insert(courses);

  const enrollments = []
  for (let i = 0; i < 50; i++) {
    let courseIndices = []
    for (let j = 1; j <= 3; j++) {
      let courseIndex = random.integer(0, 9)
      while (courseIndices.includes(courseIndex)) {
        courseIndex = random.integer(0, 9)
      }
      courseIndices.push(courseIndex)
      enrollments.push({
        id_enrollment: uniqid(),
        id_student: students[i].id_student,
        id_course: courses[courseIndex].id_course
      })
    }
  }
  await knex('tb_Enrollments').insert(enrollments);

  const tasks = [
    {
      id_task: uniqid(),
      title: "Report No. 1",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[0].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 2",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[0].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 1",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[1].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 2",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[1].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 3",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[1].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 1",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[2].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 2",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[2].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 3",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[2].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 1",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[3].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 1",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[4].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 2",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[4].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 1",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[5].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 2",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[5].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 1",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[6].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 2",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[6].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 3",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[6].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 1",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[7].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 2",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[7].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 3",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[7].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 1",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[8].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 2",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[8].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 3",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[8].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 4",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[8].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 1",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[9].id_course
    },
    {
      id_task: uniqid(),
      title: "Report No. 2",
      description: `Praesent pulvinar eleifend diam, vitae viverra mauris maximus id. 
      Morbi dui lacus, feugiat eget odio et, hendrerit imperdiet arcu. 
      Vivamus a augue sem. Duis lobortis.`,
      date_created: new Date().toISOString(),
      id_course: courses[9].id_course
    }
  ]
  await knex('tb_Tasks').insert(tasks);

  const lectures = []
  for (let i = 0; i <= 9; i++) {
    for (let j = 1; j <= 3; j++) {
      lectures.push({
        id_lecture: uniqid(),
        title: `Lecture No. ${j}`,
        url: "https://mapmf.pmfst.unist.hr/~mnovakovi/test_lecture.pdf",
        date_created: new Date().toISOString(),
        id_course: courses[i].id_course,
      })
    }
  }

  await knex('tb_Lectures').insert(lectures)
}
