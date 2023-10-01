import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'

library.add(faPaperclip)

const TaskItemStudent = ({ task, showModal }) => {

    return (
        <li className="list-group-item">
            <button onClick={() => showModal(task)} type="button" className="btn btn-link text-decoration-none ps-0">
                <h6>
                    <FontAwesomeIcon icon={faPaperclip} /> {task.task.title}
                </h6>
            </button>
            <h6 className="fw-lighter d-inline text-muted">
                - {task.submitted ? "Submitted" : "Not Submitted"}
            </h6>
            <p className="ps-3">
                {task.task.description}
            </p>
        </li>
    )
}

export default TaskItemStudent