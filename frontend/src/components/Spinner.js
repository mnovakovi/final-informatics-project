import React from "react"
import 'bootstrap/dist/css/bootstrap.css'

const Spinner = () => {

    return (
        <div className=" text-primary h1">
            <div className="spinner-border display-4" role="status"></div>
            <strong>Loading...</strong>
        </div>

    )
}

export default Spinner