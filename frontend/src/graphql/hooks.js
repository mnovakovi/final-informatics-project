import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import * as queries from './queries'

export function useStudentLogin() {
    const [executeStudentLogin, { loading, error, data }] = useLazyQuery(queries.studentLoginQuery)
    return { executeStudentLogin, studentLogin: data?.studentLogin, studentLoading: loading, studentError: error }
}

export function useProfessorLogin() {
    const [executeProfessorLogin, { loading, error, data }] = useLazyQuery(queries.professorLoginQuery)
    return { executeProfessorLogin, professorLogin: data?.professorLogin, professorLoading: loading, professorError: error }
}

export function useCourseById(id_course) {
    const { loading, error, data } = useQuery(queries.courseByIdQuery, {
        variables: {
            idCourse: id_course
        },
        skip: !id_course
    })
    return { courseById: data?.courseById, courseLoading: loading, courseError: error }
}

export function useCoursesByStudent(id_student) {
    const [executeCoursesByStudent, { loading, error, data }] = useLazyQuery(queries.coursesByStudentQuery, {
        variables: { idStudent: id_student },
        skip: !id_student
    })
    return { executeCoursesByStudent, coursesByStudent: data?.coursesByStudent, loading, error }
}

export function useCoursesByProfessor(id_professor) {
    const [executeCoursesByProfessor, { loading, error, data }] = useLazyQuery(queries.coursesByProfessorQuery, {
        variables: { idProfessor: id_professor },
        skip: !id_professor
    })
    return { executeCoursesByProfessor, coursesByProfessor: data?.coursesByProfessor, loading, error }
}

export function useStudentsByCourse(id_course) {
    const { loading, error, data } = useQuery(queries.studentsByCourseQuery, {
        variables: { idCourse: id_course }
    })
    return { studentsByCourse: data?.studentsByCourse, loading, error }
}

export function useCourseTasksByStudent(id_course, id_student) {
    const [executeCourseTasksByStudent, { loading, error, data }] = useLazyQuery(queries.courseTasksByStudentQuery, {
        variables: {
            input: {
                id_course,
                id_student
            }
        },
        fetchPolicy: 'network-only',
        skip: !(id_student && id_course)
    })
    return { executeCourseTasksByStudent, courseTasksByStudent: data?.courseTasksByStudent, loading, error }
}

export function useCourseTasks(id_course) {
    const { loading, error, data } = useQuery(queries.courseTasksQuery, {
        variables: {
            idCourse: id_course
        }
    })
    return { courseTasks: data?.courseTasks, tasksLoading: loading, tasksError: error }
}

export function useTaskSubmissions(id_task) {
    const [executeTaskSubmissions, { loading, error, data }] = useLazyQuery(queries.taskSubmissionsQuery, {
        variables: {
            idTask: id_task
        },
        fetchPolicy: 'network-only',
        skip: !id_task
    })
    return { executeTaskSubmissions, taskSubmissions: data?.taskSubmissions, taskSubmissionsLoading: loading, taskSubmissionsError: error }
}

export function useCourseLectures(id_course) {
    const { loading, error, data } = useQuery(queries.courseLecturesQuery, {
        variables: {
            idCourse: id_course
        },
        fetchPolicy: 'network-only'
    })
    return { courseLectures: data?.courseLectures, lecturesLoading: loading, lecturesError: error }
}

export function useSubmissionById(id_submission) {
    const [executeSubmissionById, { loading, error, data }] = useLazyQuery(queries.submissionByIdQuery, {
        variables: {
            idSubmission: id_submission
        },
        fetchPolicy: 'network-only'
    })
    return { executeSubmissionById, submissionById: data?.submissionById, loading, error }
}

export function useSubmitTask(id_student, id_task, title, url, id_course) {
    const [submitTask, { loading, error, data }] = useMutation(queries.submitTaskMutation, {
        variables: {
            input: {
                id_student,
                id_task,
                title,
                url
            }
        },
        update(cache, { data }) {
            const { courseTasksByStudent } = cache.readQuery({
                query: queries.courseTasksByStudentQuery,
                variables: {
                    input: {
                        id_course,
                        id_student
                    }
                }
            })
            cache.writeQuery({
                query: queries.courseTasksByStudentQuery,
                variables: {
                    input: {
                        id_course,
                        id_student
                    }
                },
                data: {
                    courseTasksByStudent: courseTasksByStudent.map(ct => ct.task.id_task === data.submitTask.task.id_task ? data.submitTask : ct)
                }
            })
        }
    })
    return { submitTask, data, loading, error }
}

export function useGradeSubmission(id_task) {
    const [gradeSubmission, { loading, error, data }] = useMutation(queries.gradeSubmissionMutation,
        {
            update(cache, { data }) {
                const { taskSubmissions } = cache.readQuery({
                    query: queries.taskSubmissionsQuery,
                    variables: {
                        idTask: id_task
                    }
                })
                cache.writeQuery({
                    query: queries.taskSubmissionsQuery,
                    variables: {
                        idTask: id_task
                    },
                    data: {
                        taskSubmissions: taskSubmissions.map(ts => ts.submission?.id_submission === data.gradeSubmission.submission.id_submission ? data.gradeSubmission : ts)
                    }
                })
            }
        })
    return { gradeSubmission, data, loading, error }
}

export function useAddLecture(id_course, title, url) {
    const [addLecture, { loading, error, data }] = useMutation(queries.addLectureMutation, {
        variables: {
            input: {
                id_course,
                title,
                url
            }
        },
        update(cache, { data }) {
            const { courseLectures } = cache.readQuery({
                query: queries.courseLecturesQuery,
                variables: {
                    idCourse: id_course
                }
            })
            cache.writeQuery({
                query: queries.courseLecturesQuery,
                variables: {
                    idCourse: id_course
                },
                data: {
                    courseLectures: courseLectures.concat(data?.addLecture)
                }
            })
        }
    })
    return { addLecture, loading, error }
}

export function useRemoveLecture(id_lecture, id_course) {
    const [removeLecture, { loading, error, data }] = useMutation(queries.removeLectureMutation, {
        variables: {
            idLecture: id_lecture,
            idCourse: id_course
        },
        update(cache, { data }) {
            const { courseLectures } = cache.readQuery({
                query: queries.courseLecturesQuery,
                variables: {
                    idCourse: id_course
                }
            })
            cache.writeQuery({
                query: queries.courseLecturesQuery,
                variables: {
                    idCourse: id_course
                },
                data: {
                    courseLectures: courseLectures.filter(cl => cl.id_lecture !== data?.removeLecture)
                }
            })
        }
    })
    return { removeLecture, loading, error }
}

export function useAddTask(id_course, title, description) {
    const [addTask, { loading, error, data }] = useMutation(queries.addTaskMutation, {
        variables: {
            input: {
                id_course,
                title,
                description
            }
        },
        update(cache, { data }) {
            const { courseTasks } = cache.readQuery({
                query: queries.courseTasksQuery,
                variables: {
                    idCourse: id_course
                }
            })
            cache.writeQuery({
                query: queries.courseTasksQuery,
                variables: {
                    idCourse: id_course
                },
                data: {
                    courseTasks: courseTasks.concat(data?.addTask)
                }
            })
        }
    })
    return { addTask, loading, error }
}

export function useRemoveTask(id_task, id_course) {
    const [removeTask, { loading, error, data }] = useMutation(queries.removeTaskMutation, {
        variables: {
            idTask: id_task,
            idCourse: id_course
        },
        update(cache, { data }) {
            const { courseTasks } = cache.readQuery({
                query: queries.courseTasksQuery,
                variables: {
                    idCourse: id_course
                }
            })
            cache.writeQuery({
                query: queries.courseTasksQuery,
                variables: {
                    idCourse: id_course
                },
                data: {
                    courseTasks: courseTasks.filter(ct => ct.id_task !== data?.removeTask)
                }
            })
            cache.evict({
                broadcast: false,
                fieldName: "taskSubmissions",
                args: { id_task: id_task }
            })
        }
    })
    return { removeTask, loading, error }
}
