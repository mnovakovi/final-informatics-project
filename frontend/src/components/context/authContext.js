import { createContext, useState, useContext, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

const USER = 'user'
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [userLoading, setUserLoading] = useState(true)
    const client = useApolloClient()

    useEffect(() => {
        setUserLoading(true)
        const userFromStorage = localStorage.getItem(USER)
        if (userFromStorage) {
            setUser(JSON.parse(userFromStorage))
        }
        setUserLoading(false)
    }, [])

    function login(newUser) {
        setUser(newUser)
        localStorage.setItem(USER, JSON.stringify(newUser))
    }

    function logout() {
        setUser(null)
        localStorage.removeItem(USER)
        client.clearStore()
    }

    return (
        <AuthContext.Provider value={{ user, userLoading, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
}