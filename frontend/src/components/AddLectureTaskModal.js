import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import Modal from 'react-bootstrap/Modal'
import LectureForm from "./LectureForm"
import TaskForm from "./TaskForm"

const AddLectureTaskModal = ({ modalView, closeModal, action }) => {
    if (action && modalView) {
        return (
            <Modal show={modalView} onHide={closeModal} scrollable={true} size="lg" fullscreen='sm-down'>
                <Modal.Header closeButton>
                    <Modal.Title>Add {action}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {action === "Lecture" && <LectureForm closeModal={closeModal} />}
                    {action === "Task" && <TaskForm closeModal={closeModal} />}
                </Modal.Body>
            </Modal>
        )
    }

    return null

}

export default AddLectureTaskModal