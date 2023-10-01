import React, { useState, useEffect } from "react"
import { useAuthContext } from '../components/context/authContext'
import { useCoursesByProfessor } from '../graphql/hooks'
import { useNavigate } from "react-router-dom"
import CourseList from "../components/CourseList"
import StudentModal from "../components/StudentModal"
import 'bootstrap/dist/css/bootstrap.css'
import Spinner from "../components/Spinner"
import Alert from "../components/Alert"



const ProfessorHomePage = () => {
    const { user, userLoading } = useAuthContext()
    const { executeCoursesByProfessor, coursesByProfessor, loading, error } = useCoursesByProfessor(user?.id_professor)
    const navigate = useNavigate()
    const [modalView, setModalView] = useState(false)
    const [activeCourse, setActiveCourse] = useState(null)

    useEffect(() => {
        if (user?.id_professor) {
            executeCoursesByProfessor()
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
    }

    if (coursesByProfessor && user) {
        return (
            <React.Fragment>
                <div className="container wh-100">
                    <CourseList courses={coursesByProfessor} showModal={showModal} />
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
        console.log(error)
        return (
            <Alert />
        )
    }

    return (
        null
    )
}

export default ProfessorHomePage