import React, { useState, useEffect } from "react"
import { useAuthContext } from '../components/context/authContext'
import { useCoursesByStudent } from '../graphql/hooks'
import { useNavigate } from "react-router-dom"
import CourseList from "../components/CourseList"
import StudentModal from "../components/StudentModal"
import 'bootstrap/dist/css/bootstrap.css'
import Spinner from "../components/Spinner"
import Alert from "../components/Alert"



const StudentHomePage = () => {
    const { user, userLoading } = useAuthContext()
    const { executeCoursesByStudent, coursesByStudent, loading, error } = useCoursesByStudent(user?.id_student)
    const navigate = useNavigate()
    const [modalView, setModalView] = useState(false)
    const [activeCourse, setActiveCourse] = useState(null)

    useEffect(() => {
        if (user?.id_student) {
            executeCoursesByStudent()
        }
        else if (!userLoading) {
            navigate('/login')
        }
    }, [user, userLoading])

    function showModal(course) {
        setActiveCourse(course)
        setModalView(true)
    }

    const closeModal = () => {
        setModalView(false)
        setActiveCourse(null)
    }

    if (coursesByStudent && user) {
        return (
            <React.Fragment>
                <div className="container wh-100">
                    <CourseList courses={coursesByStudent} showModal={showModal} />
                </div>
                <StudentModal modalView={modalView} closeModal={closeModal} activeCourse={activeCourse} />
            </React.Fragment>

        )
    }

    if (loading) {
        return (
            <Spinner />
        )
    }

    if (error) {
        return (
            <Alert />
        )
    }

    return (
        null
    )
}

export default StudentHomePage