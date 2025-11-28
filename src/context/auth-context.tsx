"use client"
import { getProfile, login, logout } from "@/services/auth"
import type { User } from "@/types/auth"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { createContext, type ReactNode } from "react"
import { toast } from "sonner"

type AuthContextType = {
	user: User | undefined
	isLoading: boolean
	isFetched: boolean
	login: ({ email, password }: { email: string; password: string }) => Promise<void>
	logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = useQueryClient()
	const route = useRouter()
	const {
		data: user,
		isLoading,
		isFetched
	} = useQuery({
		queryKey: ["user"],
		queryFn: getProfile,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		retry: false
	})

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

	return (
		<AuthContext.Provider value={{ user, login: loginUser, logout: logoutUser, isLoading, isFetched }}>
			{children}
		</AuthContext.Provider>
	)
}
