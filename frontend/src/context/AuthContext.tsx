import { createContext, useContext, useState, type ReactNode } from "react"
import { login as loginRequest } from "../api/auth"

interface AuthContexttype {
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContexttype | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => localStorage.getItem("access_token") !== null
    )

    async function login(email: string, password: string) {
        const data = await loginRequest(email, password)
        localStorage.setItem("access_token", data.access_token)
        setIsAuthenticated(true) 
    }

    function logout() {
        localStorage.removeItem("access_token")
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must beused within an AuthProvider")
    }

    return context
}