import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/context/authContext'
import React from "react";
import { useStudentLogin, useProfessorLogin } from '../graphql/hooks'
import 'bootstrap/dist/css/bootstrap.css'

const LoginPage = () => {
    const { user, login } = useAuthContext()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [activeUserType, setActiveUserType] = useState('Student')
    const [altUserType, setAltUserType] = useState('Professor')
    const alertRef = useRef(null)
    const navigate = useNavigate()
    const { executeStudentLogin, studentLogin, studentLoading, studentError } = useStudentLogin()
    const { executeProfessorLogin, professorLogin, professorLoading, professorError } = useProfessorLogin()

    useEffect(() => {
        if (user) {
            if (user.id_student) {
                navigate('/student')
            }
            else if (user.id_professor) {
                navigate('/professor')
            }
        }
    }, [user, navigate])

    useEffect(() => {
        if (studentLogin) {
            login(studentLogin)
        }

        if (professorLogin) {
            login(professorLogin)
        }

        if (studentError) {
            alertRef.current.innerText = studentError.message
            alertRef.current.hidden = false
        }
        if (professorError) {
            alertRef.current.innerText = professorError.message
            alertRef.current.hidden = false
        }

    }, [studentLogin, professorLogin, studentLoading, professorLoading, studentError, professorError])

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const changeUserType = () => {
        if (activeUserType === 'Student') {
            setActiveUserType('Professor')
            setAltUserType('Student')
        }
        else {
            setActiveUserType('Student')
            setAltUserType('Professor')
        }
    }

    const handleUserLogin = (e) => {
        e.preventDefault()
        alertRef.current.hidden = true
        if (activeUserType === "Student") {
            executeStudentLogin({
                variables: {
                    input: {
                        username,
                        password
                    }
                }
            })
        }
        else {
            executeProfessorLogin({
                variables: {
                    input: {
                        username,
                        password
                    }
                }
            })
        }
    }

    return (
        <div className='row h-100 justify-content-center align-items-center'>
            <form onSubmit={handleUserLogin} className='col-lg-4 border border-4 rounded-4 py-2 px-2 '>
                <h1 className='text-center'>{activeUserType} Login</h1>
                <div className='form-group mb-1'>
                    <label className="mb-2 fw-bold">USERNAME</label>
                    <input type="text" value={username} name="Username" onChange={changeUsername} className='form-control' placeholder='Enter username...'></input>
                </div>
                <div className='form-group mb-1'>
                    <label className="mb-2 fw-bold">PASSWORD</label>
                    <input type="password" value={password} name="Pass" onChange={changePassword} className='form-control' placeholder='Enter password...'></input>
                </div>
                {activeUserType === 'Student' ?
                    <button type='submit' className='btn btn-primary form-control mt-3 py-1'><p className="h4">Login</p></button> :
                    <button type='submit' className='btn btn-primary form-control mt-3 py-1'><p className="h4">Login</p></button>
                }
                <div className='text-center'>
                    <button type='button' className='btn btn-link btn-floating mb-1' onClick={changeUserType}><p className="h5">{altUserType} Login</p></button>
                </div>
                <div ref={alertRef} className='alert alert-danger py-2 mt-2' hidden={true}></div>
            </form>
        </div>
    )
}

export default LoginPage