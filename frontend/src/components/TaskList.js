import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import TaskItemStudent from "./TaskItemStudent"
import TaskItemProfessor from "./TaskItemProfessor"
import { useAuthContext } from "./context/authContext"

const TaskList = ({ tasks, showModal, showAddLectureTaskModal }) => {
    const { user } = useAuthContext()

    return (
        <div className="card col-lg-7">
            <div className="card-header d-flex justify-content-between">
                <h3 className="d-inline">Tasks</h3>
                {user?.id_professor && <button onClick={() => showAddLectureTaskModal("Task")} type="button" className="btn btn-link text-decoration-none">Add Task</button>}
            </div>
            <div className="card-body">
                {user?.id_student ? <ul className="list-group list-group-flush">
                    {tasks.map(task =>
                        <TaskItemStudent task={task} showModal={showModal} key={task.task.id_task} />
                    )}
                </ul> :
                    <ul className="list-group list-group-flush">
                        {tasks.map(task =>
                            <TaskItemProfessor task={task} showModal={showModal} key={task.id_task} />
                        )}
                    </ul>}
            </div>
        </div>
    )
}

export default TaskList