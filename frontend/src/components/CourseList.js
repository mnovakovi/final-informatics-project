import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import CourseItem from "./CourseItem"


const CourseList = ({ courses, showModal }) => {
    return (
        <div className="col-lg-7">
            <h1 className="my-4">Courses</h1>
            <ul className="ps-0">
                {courses.map(course =>
                    <CourseItem course={course} key={course.id_course} showModal={showModal} />)}
            </ul>
        </div>
    )
}

export default CourseList