import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import { useGradeSubmission } from '../graphql/hooks'


const SubmissionItem = ({ taskSubmission, setError }) => {
    const [grade, setGrade] = useState(taskSubmission.submission?.grade)
    const [gradeChange, setGradeChange] = useState(false)
    const { gradeSubmission, loading } = useGradeSubmission(taskSubmission.task?.id_task)

    const changeGrade = (e) => {
        setGrade(e.target.value)
        setGradeChange(true)
    }

    const handleUpdateGrade = () => {
        setError(null)
        const gradeNumber = parseFloat(grade.replace(',', '.'))
        console.log(gradeNumber)
        if (isNaN(gradeNumber) || gradeNumber < 1 || gradeNumber > 5) {
            setError("Grade must be valid float between 1 and 5")
            return
        }
        gradeSubmission({
            variables: {
                input: {
                    id_submission: taskSubmission.submission?.id_submission,
                    grade: gradeNumber
                }
            }
        })
        setGradeChange(false)
    }

    return (

        <tr>
            <td>{taskSubmission.student.id_student}</td>
            <td>{taskSubmission.student.name}</td>
            <td>{taskSubmission.student.surname}</td>
            <td>{taskSubmission.submitted ?
                <a href={taskSubmission.submission?.url} target="_blank">{taskSubmission.submission?.title}</a> :
                <p className="fw-lighter d-inline text-muted">Not Submitted</p>}
            </td>
            <td className="col-lg-1">
                <input disabled={!taskSubmission.submitted} value={grade} onInput={changeGrade} type="text" className="d-inline w-75"></input>
            </td>
            <td className="col-lg-1">
                <button onClick={handleUpdateGrade} disabled={!taskSubmission.submitted || !gradeChange || loading} className="btn btn-primary">Confirm</button>
            </td>
        </tr>
    )
}

export default SubmissionItem