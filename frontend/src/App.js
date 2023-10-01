import { Routes, Route, Navigate } from 'react-router-dom'
import NavbBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import StudentHomePage from './pages/StudentHomePage'
import ProfessorHomePage from './pages/ProfessorHomePage'
import StudentCoursePage from './pages/StudentCoursePage'
import ProfessorCoursePage from './pages/ProfessorCoursePage'
import "/node_modules/bootstrap/dist/css/bootstrap.css"
import { useAuthContext } from './components/context/authContext'


const App = () => {
  const { user, logout } = useAuthContext()

  return (
    <main className='vh-100'>
      <NavbBar user={user} logout={logout} />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/student' element={<StudentHomePage />} />
        <Route path='/professor' element={<ProfessorHomePage />} />
        <Route path='/student/course/:courseId' element={<StudentCoursePage />} />
        <Route path='/professor/course/:courseId' element={<ProfessorCoursePage />} />
      </Routes>
    </main>
  );
}

export default App;
