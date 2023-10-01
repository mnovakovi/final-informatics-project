import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

const NavbBar = ({ user, logout }) => {
    if (user) {
        return (
            <nav className='navbar navbar-dark static-top bg-primary'>
                <div className='container-fluid justify-content-between'>
                    <span className='fs-2 text-white fw-bold'>
                        e-Learning
                    </span>
                    <button className="btn btn-danger text-white" onClick={logout}>Log Out</button>
                </div>
            </nav>
        )
    }

    return null

}

export default NavbBar