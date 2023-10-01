import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import Modal from 'react-bootstrap/Modal'
import { useTaskSubmissions } from '../graphql/hooks'
import Spinner from "./Spinner"
import Alert from "./Alert"
import SubmissionsList from "./SubmissionList"


const SubmissionsModal = ({ modalView, closeModal, activeTask }) => {
    const { executeTaskSubmissions, taskSubmissions, taskSubmissionsLoading, taskSubmissionsError } = useTaskSubmissions(activeTask?.id_task)
    const [error, setError] = useState(null)

    useEffect(()=>{
        if(modalView && activeTask){
            executeTaskSubmissions()
        }
    }, [modalView, activeTask])
    
    if (activeTask && modalView && taskSubmissions) {
        return (
            <Modal show={modalView} onHide={() => { closeModal(); setError(false) }} scrollable={true} size="lg" fullscreen='sm-down'>
                <Modal.Header closeButton>
                    <Modal.Title>{activeTask.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SubmissionsList taskSubmissions={taskSubmissions} setError={setError} />
                </Modal.Body>
                <Modal.Footer className="container justify-content-start" hidden={!error}>
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }

    if (taskSubmissionsLoading) {
        return (
            <Spinner />
        )
    }

    if (taskSubmissionsError) {
        alert(taskSubmissionsError)
        return (
            <Alert />
        )
    }

    return null

}

export default SubmissionsModal