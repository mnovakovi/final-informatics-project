import { gql } from '@apollo/client';

export const studentLoginQuery = gql`
  query($input: AuthInput!){
    studentLogin(input: $input) {
      id_student
      name
      surname
      username
      token
    }  
  }
`

export const professorLoginQuery = gql`
  query($input: AuthInput!){
    professorLogin(input: $input) {
      id_professor
      name
      surname
      username
      token
    }  
  }
`

export const courseByIdQuery = gql`
  query($idCourse: ID!){
    courseById(id_course: $idCourse) {
      title
    }
  }
`

export const coursesByStudentQuery = gql`
  query($idStudent: ID!){
    coursesByStudent(id_student: $idStudent) {
      id_course
      title
      professor {
        name
        surname
      }
    }
  }
`

export const coursesByProfessorQuery = gql`
  query($idProfessor: ID!){
    coursesByProfessor(id_professor: $idProfessor) {
      id_course
      title
    }
  }
`

export const studentsByCourseQuery = gql`
  query($idCourse: ID!){
    studentsByCourse(id_course: $idCourse) {
      id_student
      name
      surname
    }
  }
`

export const courseTasksByStudentQuery = gql`
  query($input: StudentCourseInput!){
    courseTasksByStudent(input: $input) {
      task {
        id_task
        title
        description
        date_created
      }
      submitted
      submission{
        id_submission
      }
    }
  }
`

export const taskSubmissionsQuery = gql`
  query($idTask: ID!){
    taskSubmissions(id_task: $idTask) {
      task {
        id_task
      }
      student {
        id_student
        name
        surname
      }
      submitted
      submission {
        id_submission
        title
        url
        grade
      }
    }
  }
`

export const courseTasksQuery = gql`
  query($idCourse: ID!){
    courseTasks(id_course: $idCourse) {
      id_task
      title
      description
      date_created
    }
  }
`

export const courseLecturesQuery = gql`
  query($idCourse: ID!){
    courseLectures(id_course: $idCourse) {
      id_lecture
      title
      url
      date_created
    }
  }
`

export const submissionByIdQuery = gql`
  query($idSubmission: ID!){
    submissionById(id_submission: $idSubmission) {
      id_submission
      date_submitted
      title
      url
      grade
    }
  }
`

export const submitTaskMutation = gql`
  mutation($input: SubmissionInput!){
    submitTask(input: $input) {
      task {
        id_task
        title
        description
        date_created
      }
      submitted
      submission{
        id_submission
      }
    }
  }
`

export const gradeSubmissionMutation = gql`
  mutation($input: GradeInput!){
    gradeSubmission(input: $input) {
      task {
        id_task
      }
      student {
        id_student
        name
        surname
      }
      submitted
      submission {
        id_submission
        title
        url
        grade
      }
    }
  }
`

export const addLectureMutation = gql`
  mutation($input: LectureInput!){
    addLecture(input: $input) {
      id_lecture
      title
      url
      date_created
    }
  }
`

export const removeLectureMutation = gql`
  mutation($idLecture: ID!, $idCourse: ID!){
    removeLecture(id_lecture: $idLecture, id_course: $idCourse)
  }
`

export const addTaskMutation = gql`
  mutation($input: TaskInput!){
    addTask(input: $input) {
      id_task
      title
      description
      date_created
    }
  }
`

export const removeTaskMutation = gql`
  mutation($idTask: ID!, $idCourse: ID!){
    removeTask(id_task: $idTask, id_course: $idCourse)
  }
`