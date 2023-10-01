const studentResolver = require('./studentResolver')
const professorResolver = require('./professorResolver')
const courseResolver = require('./courseResolver')
const taskResolver = require('./taskResolver')
const lectureResolver = require('./lectureResolver')
const submissionResolver = require('./submissionResolver')
const submissionMutationResolver = require('./submissionMutationResolver')
const taskMutationResolver = require('./taskMutationResolver')
const lectureMutationResolver = require('./lectureMutationResolver')
const {professorByCourseLoader} = require('../dataLoaders/professorLoaders')
const {courseByIdLoader, coursesByProfessorLoader} = require('../dataLoaders/courseLoaders')
const {studentByIdLoader, studentsByCourseLoader} = require('../dataLoaders/studentLoaders')
const {submissionByIdLoader} = require('../dataLoaders/submissionLoaders')
const {taskByIdLoader, tasksByCourseLoader} = require('../dataLoaders/taskLoaders')
const {lecturesByCourseLoader} = require('../dataLoaders/lectureLoaders')

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

    Course: {
        professor: (course, _args) => professorByCourseLoader.load(course.id_course),
        tasks: (course, _args) => tasksByCourseLoader.load(course.id_course),
        lectures: (course, _args) => lecturesByCourseLoader.load(course.id_course),
        students: (course, _args) => studentsByCourseLoader.load(course.id_course)
    },

    Professor: {
        courses: (professor, _args) => coursesByProfessorLoader.load(professor.id_professor)
    },

    Task: {
        course: (task, _args) => courseByIdLoader.load(task.id_course)
    },

    Lecture: {
        course: (lecture, _args) => courseByIdLoader.load(lecture.id_course)
    },

    Submission: {
        student: (submission, _args) => studentByIdLoader.load(submission.id_student),
        task: (submission, _args) => taskByIdLoader.load(submission.id_task)
    },

    StudentTask: {
        task: (studentTask, _args) => taskByIdLoader.load(studentTask.id_task),
        student: (studentTask, _args) => studentByIdLoader.load(studentTask.id_student),
        submission: (studentTask, _args) => submissionByIdLoader.load(studentTask.id_submission),
        submitted: (studentTask) => ((studentTask.id_submission !== 0))
    }
}