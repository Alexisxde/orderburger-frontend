"use client"
import { login, logout } from "@/services/auth"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { createContext, type ReactNode } from "react"
import { toast } from "sonner"

type AuthContextType = {
	login: ({ email, password }: { email: string; password: string }) => Promise<void>
	logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = useQueryClient()
	const route = useRouter()

	const loginUser = async ({ email, password }: { email: string; password: string }) => {
		try {
			const { status, data: user } = await login({ email, password })
			if (status === 200) {
				toast.success(`Bienvenido ${user.data.name}!`)
				queryClient.invalidateQueries({ queryKey: ["user"] })
				route.push("/app")
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401) route.push("/login")
				else if (error.response?.status === 404) toast.error(error.response?.data.error)
			}
		}
	}

	const logoutUser = async () => {
		try {
			const { status } = await logout()
			if (status === 200) {
				toast.success("Hasta luego!")
				queryClient.invalidateQueries({ queryKey: ["user"] })
				route.push("/login")
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401) route.push("/login")
				else toast.error(error.response?.data.error)
			}
		}
	}

	return <AuthContext.Provider value={{ login: loginUser, logout: logoutUser }}>{children}</AuthContext.Provider>
}
