import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
import { useAuthContext } from "./context/authContext"

const CourseItem = ({ course, showModal }) => {
    const { user } = useAuthContext()

    return (
        <div className="card mb-3">
            <div className="card-body">
                {user.id_student ? <Link to={`/student/course/${course.id_course}`} className="btn btn-link text-decoration-none">
                    <h2>{course.title}</h2>
                </Link> :
                    <Link to={`/professor/course/${course.id_course}`} className="btn btn-link text-decoration-none">
                        <h2>{course.title}</h2>
                    </Link>}
                {course.professor && <h5 className="ms-3">
                    <span className="fw-bold ">Professor: </span>
                    <span>{course.professor.name} {course.professor.surname}</span>
                </h5>}
                <h5 className="ms-3">
                    <span className="fw-bold ">Students: </span>
                    <button onClick={() => showModal(course)} type="button" className="btn btn-link text-decoration-none ps-0">
                        <h5>
                            [ View Students ]
                        </h5>
                    </button>
                </h5>
            </div>
        </div>
    )
}

export default CourseItem