import React, { useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import Modal from 'react-bootstrap/Modal'
import { useSubmissionById } from '../graphql/hooks'
import SubmissionForm from "./SubmissionForm"
import SubmissionTable from "./SubmissionTable"
import Spinner from "./Spinner"
import Alert from "./Alert"

const TaskModal = ({ modalView, closeModal, activeTask }) => {
    const { executeSubmissionById, submissionById, loading, error } = useSubmissionById(activeTask?.submission?.id_submission)

    useEffect(()=>{
        if(modalView && activeTask?.submitted){
            executeSubmissionById()
        }
    }, [activeTask, modalView])
    

    if (activeTask && !submissionById && modalView) {
        return (
            <Modal show={modalView} onHide={closeModal} scrollable={true} size="lg" fullscreen='sm-down'>
                <Modal.Header closeButton>
                    <Modal.Title>{activeTask.task.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!activeTask.subimtted &&
                        <SubmissionForm task={activeTask} closeModal={closeModal} />}
                </Modal.Body>
            </Modal>
        )
    }
    if (activeTask && modalView && submissionById) {
        return (
            <Modal show={modalView} onHide={closeModal} scrollable={true} size="lg" fullscreen='sm-down'>
                <Modal.Header closeButton>
                    <Modal.Title>{activeTask.task.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {activeTask.submitted &&
                        <SubmissionTable submission={submissionById} />}
                </Modal.Body>
            </Modal>
        )
    }

    if (loading) {
        return (
            <Spinner />
        )
    }

    // if (error) {
    //     return (
    //         <Alert />
    //     )
    // }

    return null
}

export default TaskModal