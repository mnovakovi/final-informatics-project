import React, { useState, useRef } from "react"
import { useParams } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css'
import { useAddTask } from '../graphql/hooks'

const TaskForm = ({ closeModal }) => {
    const { courseId } = useParams()
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const alertRef = useRef(null)
    const { addTask, loading, error } = useAddTask(courseId, title, description)

    const changeDescription = (e) => {
        setDescription(e.target.value)
    }

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleAddLecture = (e) => {
        e.preventDefault()
        alertRef.current.hidden = true
        if (description.trim() === "" || title.trim() === "") {
            alertRef.current.innerText = "Fields must not be empty!"
            alertRef.current.hidden = false
            return
        }
        addTask()
        closeModal()
    }

    return (
        <form onSubmit={handleAddLecture}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input value={title} onChange={changeTitle} type="text" className="form-control" id="title" placeholder="Enter task title..."></input>
            </div>
            <div className="mb-3">
                <label htmlFor="url" className="form-label">Description</label>
                <textarea value={description} onChange={changeDescription} type="text" className="form-control" id="url" placeholder="Enter task description..."></textarea>
            </div>
            <button disabled={loading} type="submit" className="btn btn-primary">Submit</button>
            <div ref={alertRef} className='alert alert-danger py-2 mt-2' hidden={true}></div>
        </form>
    )
}

export default TaskForm