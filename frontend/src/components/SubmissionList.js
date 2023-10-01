import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import SubmissionItem from "./SubmissionItem"


const SubmissionsList = ({ taskSubmissions, setError }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Submission</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {taskSubmissions.map(taskSubmission =>
                    <SubmissionItem taskSubmission={taskSubmission} key={taskSubmission.student.id_student} setError={setError} />)}
            </tbody>
        </table>
    )
}

export default SubmissionsList