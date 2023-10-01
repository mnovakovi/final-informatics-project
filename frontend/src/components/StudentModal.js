import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Modal from 'react-bootstrap/Modal'
import StudentTable from "./StudentTable"

const StudentModal = ({ modalView, closeModal, activeCourse }) => {

    if (modalView) {
        return (
            <Modal show={modalView} onHide={closeModal} scrollable={true} size="lg" fullscreen='sm-down'>
                <Modal.Header closeButton>
                    <Modal.Title>Students in Course: {activeCourse.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StudentTable course={activeCourse} />
                </Modal.Body>
            </Modal>
        )
    }
    return null

}

export default StudentModal