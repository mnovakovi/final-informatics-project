import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { useRemoveTask } from '../graphql/hooks'
import { useParams } from "react-router-dom"

library.add(faPaperclip)

const TaskItemProfessor = ({ task, showModal }) => {
    const { courseId } = useParams()
    const { removeTask, loading } = useRemoveTask(task.id_task, courseId)

    return (
        <li className="list-group-item">
            <div className="d-flex justify-content-between">
                <button onClick={() => showModal(task)} type="button" className="btn btn-link text-decoration-none ps-0">
                    <h6>
                        <FontAwesomeIcon icon={faPaperclip} /> {task.title}
                    </h6>
                </button>
                <button onClick={removeTask} disabled={loading} type="button" className="btn btn-link text-decoration-none text-danger ps-0">
                    <h6>
                        Remove
                    </h6>
                </button>
            </div>
            <p className="ps-3">
                {task.description}
            </p>
        </li>
    )
}

export default TaskItemProfessor