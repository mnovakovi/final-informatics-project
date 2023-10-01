import React, { useState, useRef } from "react"
import { useParams } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css'
import { useAddLecture } from '../graphql/hooks'

const LectureForm = ({ closeModal }) => {
    const { courseId } = useParams()
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const alertRef = useRef(null)
    const { addLecture, loading, error } = useAddLecture(courseId, title, url)

    const changeUrl = (e) => {
        setUrl(e.target.value)
    }

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleAddLecture = (e) => {
        e.preventDefault()
        alertRef.current.hidden = true
        if (url.trim() === "" || title.trim() === "") {
            alertRef.current.innerText = "Fields must not be empty!"
            alertRef.current.hidden = false
            return
        }
        addLecture()
        closeModal()
    }

    return (
        <form onSubmit={handleAddLecture}>
            <div className="mb-3">
                <label for="title" className="form-label">Title</label>
                <input value={title} onChange={changeTitle} type="text" className="form-control" id="title" placeholder="Enter lecture title..."></input>
            </div>
            <div className="mb-3">
                <label for="url" className="form-label">URL</label>
                <input value={url} onChange={changeUrl} type="text" className="form-control" id="url" placeholder="Enter file url..."></input>
            </div>
            <button disabled={loading} type="submit" className="btn btn-primary">Submit</button>
            <div ref={alertRef} className='alert alert-danger py-2 mt-2' hidden={true}></div>
        </form>
    )
}

export default LectureForm