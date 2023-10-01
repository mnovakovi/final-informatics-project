import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import {useStudentsByCourse} from '../graphql/hooks'
import Spinner from "./Spinner"
import Alert from "./Alert"

const StudentTable = ({ course }) => {
    const { studentsByCourse, loading, error } = useStudentsByCourse(course.id_course)

    if(studentsByCourse){
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">ID</th>
                    </tr>
                </thead>
                <tbody>
                    {studentsByCourse.map(student => 
                        <tr>
                            <td>{student.name}</td>
                            <td>{student.surname}</td>
                            <td>{student.id_student}</td>
                        </tr>)}
                </tbody>
            </table>
        )
    }

    if(loading){
        return(
            <Spinner/>
        )
    }

    if(error){
        return(
            <Alert/>
        )
    }

    return(
        null
    )
}

export default StudentTable