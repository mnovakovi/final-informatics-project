import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-regular-svg-icons'
import { useAuthContext } from "./context/authContext"
import { useRemoveLecture } from '../graphql/hooks'
import { useParams } from "react-router-dom"

library.add(faFile)

const LectureItem = ({ lecture }) => {
    const { user } = useAuthContext()
    const { courseId } = useParams()
    const { removeLecture, loading } = useRemoveLecture(lecture.id_lecture, courseId)
    return (
        <li className="list-group-item">
            <div className="d-flex justify-content-between">
                <a href={lecture.url} target="_blank" type="button" className="btn btn-link text-decoration-none ps-0">
                    <h6>
                        <FontAwesomeIcon icon={faFile} /> {lecture.title}
                    </h6>
                </a>
                {user.id_professor && <button onClick={removeLecture} disabled={loading} type="button" className="btn btn-link text-decoration-none text-danger ps-0">
                    <h6>
                        Remove
                    </h6>
                </button>}
            </div>
        </li>
    )
}

export default LectureItem