import { api } from "./client"
import type { AuthToken } from "../types"

export async function login(email: string, password: string): Promise<AuthToken> {
    const formData = new URLSearchParams()
    formData.append("username", email)
    formData.append("password", password)

    const response = await api.post<AuthToken>("/auth/login", formData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })

    return response.data
}