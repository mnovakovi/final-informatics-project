import React, { useState, useEffect } from "react"
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/context/authContext'
import { useCourseTasksByStudent, useCourseLectures, useCourseById } from '../graphql/hooks'
import 'bootstrap/dist/css/bootstrap.css'
import TaskList from "../components/TaskList"
import LectureList from "../components/LectureList"
import TaskModal from "../components/TaskModal"
import Spinner from '../components/Spinner'
import Alert from "../components/Alert"

const StudentCoursePage = () => {
    const { courseId } = useParams()
    const { user, userLoading } = useAuthContext()
    const [modalView, setModalView] = useState(false)
    const [activeTask, setActiveTask] = useState(null)
    const navigate = useNavigate()
    const { courseLectures, lecturesLoading, lecturesError } = useCourseLectures(courseId)
    const {courseById, courseLoading, courseError} = useCourseById(courseId)
    const { executeCourseTasksByStudent, courseTasksByStudent, loading, error } = useCourseTasksByStudent(courseId, user?.id_student)

    useEffect(() => {
        if (user?.id_student) {
            executeCourseTasksByStudent()
        }
        else if (!userLoading) {
            navigate('/login')
        }
    }, [user])

    function showModal(task) {
        setActiveTask(task)
        setModalView(true)
    }

    const closeModal = () => {
        setModalView(false)
    }

    if (courseTasksByStudent && courseLectures && user) {
        return (
            <React.Fragment>
                <div className="container wh-100">
                    <h1 className="my-4">{courseById?.title}</h1>
                    <LectureList lectures={courseLectures} />
                    <TaskList tasks={courseTasksByStudent} showModal={showModal} />
                </div>
                <TaskModal modalView={modalView} activeTask={activeTask} closeModal={closeModal} />
            </React.Fragment>
        )
    }

    if (loading || lecturesLoading || courseLoading) {
        return (
            <Spinner />
        )
    }

    if (error || lecturesError) {
        console.log(error)
        console.log(lecturesError)
        return (
            <Alert />
        )
    }

    return (
        null
    )

}

export default StudentCoursePage