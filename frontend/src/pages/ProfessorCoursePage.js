import React, { useState, useEffect } from "react"
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/context/authContext'
import { useCourseTasks, useCourseLectures, useCourseById } from '../graphql/hooks'
import 'bootstrap/dist/css/bootstrap.css'
import TaskList from "../components/TaskList"
import LectureList from "../components/LectureList"
import SubmissionsModal from "../components/SubmissionsModal"
import AddLectureTaskModal from "../components/AddLectureTaskModal"
import Spinner from '../components/Spinner'
import Alert from "../components/Alert"

const ProfessorCoursePage = () => {
    const { courseId } = useParams()
    const { user, userLoading } = useAuthContext()
    const [addLectureTaskModalView, setAddLectureTaskModalView] = useState(false)
    const [submissionModalView, setSubmissionModalView] = useState(false)
    const [activeTask, setActiveTask] = useState(null)
    const [action, setAction] = useState(null)
    const navigate = useNavigate()
    const { courseTasks, tasksLoading, tasksError } = useCourseTasks(courseId)
    const { courseLectures, lecturesLoading, lecturesError } = useCourseLectures(courseId)
    const {courseById, courseLoading, courseError} = useCourseById(courseId)

    useEffect(() => {
        if (!user?.id_professor && !userLoading) {
            navigate('/login')

        }
    }, [user, userLoading])

    function showSubmissionModal(task) {
        setActiveTask(task)
        setSubmissionModalView(true)
    }

    const closeSubmissionModal = () => {
        setSubmissionModalView(false)
    }

    function showAddLectureTaskModal(action) {
        setAction(action)
        setAddLectureTaskModalView(true)
    }

    const closeAddLectureTaskModal = () => {
        setAddLectureTaskModalView(false)
    }

    if (courseLectures && courseTasks && user) {
        return (
            <React.Fragment>
                <div className="container wh-100">
                    <h1 className="my-4">{courseById?.title}</h1>
                    <LectureList lectures={courseLectures} showAddLectureTaskModal={showAddLectureTaskModal} />
                    <TaskList tasks={courseTasks} showModal={showSubmissionModal} showAddLectureTaskModal={showAddLectureTaskModal} />
                </div>
                <AddLectureTaskModal modalView={addLectureTaskModalView} action={action} closeModal={closeAddLectureTaskModal} />
                <SubmissionsModal modalView={submissionModalView} activeTask={activeTask} closeModal={closeSubmissionModal} />
            </React.Fragment>
        )
    }

    if (lecturesLoading || tasksLoading) {
        return (
            <Spinner />
        )
    }

    if (lecturesError || tasksError) {
        return (
            <Alert />
        )
    }

    return (
        null
    )

}

export default ProfessorCoursePage