const studentResolver = require('./studentResolver')
const professorResolver = require('./professorResolver')
const courseResolver = require('./courseResolver')
const taskResolver = require('./taskResolver')
const lectureResolver = require('./lectureResolver')
const submissionResolver = require('./submissionResolver')
const submissionMutationResolver = require('./submissionMutationResolver')
const taskMutationResolver = require('./taskMutationResolver')
const lectureMutationResolver = require('./lectureMutationResolver')
const { getProfessorByCourse } = require('../db/data/professors')
const { getCoursesByProfessor, getCourseById, getCoursesByStudent } = require('../db/data/courses')
const { getTasksByCourse, getTaskById } = require('../db/data/tasks')
const { getSubmissionById } = require('../db/data/submissions')
const { getStudentsByCourse, getStudentById } = require('../db/data/students')
const { getLecturesByCourse } = require('../db/data/lectures')

module.exports = {
    Query: {
        ...studentResolver,
        ...professorResolver,
        ...courseResolver,
        ...taskResolver,
        ...lectureResolver,
        ...submissionResolver
    },

    Mutation: {
        ...submissionMutationResolver,
        ...taskMutationResolver,
        ...lectureMutationResolver
    },

    Student: {
        courses: (student) => getCoursesByStudent(student.id_student) 
    },

    Course: {
        professor: (course) => getProfessorByCourse(course.id_course),
        tasks: (course) => getTasksByCourse(course.id_course),
        lectures: (course) => getLecturesByCourse(course.id_course),
        students: (course) => getStudentsByCourse(course.id_course)
    },

    Professor: {
        courses: (professor) => getCoursesByProfessor(professor.id_professor)
    },

    Task: {
        course: (task) => getCourseById(task.id_course)
    },

    Lecture: {
        course: (lecture) => getCourseById(lecture.id_course)
    },

    Submission: {
        student: (submission) => getStudentById(submission.id_student),
        task: (submission) => getTaskById(submission.id_task)
    },

    StudentTask: {
        task: (studentTask) => getTaskById(studentTask.id_task),
        student: (studentTask) => getStudentById(studentTask.id_student),
        submission: (studentTask) => getSubmissionById(studentTask.id_submission),
        submitted: (studentTask) => (!!studentTask.id_submission)
    }
}