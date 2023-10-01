import React from "react"
import 'bootstrap/dist/css/bootstrap.css'

const SubmissionTable = ({ submission }) => {

    return (
        <table className="table table-striped">
            <tbody>
                <tr>
                    <td>Submission:</td>
                    <td>
                        <a href={submission.url} target="_blank">{submission.title}</a>
                    </td>
                </tr>
                <tr>
                    <td>Date submitted:</td>
                    <td>{new Date(submission.date_submitted).toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Grade:</td>
                    <td>{submission.grade ? submission.grade : "Not Graded"}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default SubmissionTable