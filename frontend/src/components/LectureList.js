import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import LectureItem from "./LectureItem"
import { useAuthContext } from '../components/context/authContext'

const LectureList = ({ lectures, showAddLectureTaskModal }) => {
    const { user } = useAuthContext()
    
    return (
        <div className="card col-lg-7 mb-2">
            <div className="card-header d-flex justify-content-between">
                <h3 className="d-inline">Lectures</h3>
                {user?.id_professor && <button onClick={() => showAddLectureTaskModal("Lecture")} type="button" className="btn btn-link text-decoration-none">Add Lecture</button>}
            </div>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {lectures.map(lecture =>
                        <LectureItem lecture={lecture} key={lecture.id_lecture} />
                    )}
                </ul>
            </div>
        </div>
    )
}

export default LectureList