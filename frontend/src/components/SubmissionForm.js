import React, { useState, useRef } from "react"
import { useAuthContext } from '../components/context/authContext'
import { useSubmitTask } from '../graphql/hooks'
import { useParams } from 'react-router'


const SubmissionForm = ({ task, closeModal }) => {
    const { user } = useAuthContext()
    const { courseId } = useParams()
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const { submitTask, data, loading, error } = useSubmitTask(user?.id_student, task.task.id_task, title, url, courseId)
    const alertRef = useRef(null)

    const changeUrl = (e) => {
        setUrl(e.target.value)
    }

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleTaskSubmission = (e) => {
        e.preventDefault()
        alertRef.current.hidden = true
        if (url.trim() === "" || title.trim() === "") {
            alertRef.current.innerText = "Fields must not be empty!"
            alertRef.current.hidden = false
            return
        }
        submitTask()
        closeModal()
    }

    return (
        <form onSubmit={handleTaskSubmission}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input value={title} onChange={changeTitle} type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter submission title..."></input>
            </div>
            <div className="mb-3">
                <label htmlFor="url" className="form-label">URL</label>
                <input value={url} onChange={changeUrl} type="text" className="form-control" id="url" placeholder="Enter file url..."></input>
            </div>
            <button disabled={loading} type="submit" className="btn btn-primary">Submit</button>
            <div ref={alertRef} className='alert alert-danger py-2 mt-2' hidden={true}></div>
        </form>
    )
}

export default SubmissionForm