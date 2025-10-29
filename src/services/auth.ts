import api from "@/lib/axios"
import type { User } from "@/types/auth"

export const login = (data: { email: string; password: string }) => api.post("/auth/login", data)
export const logout = () => api.post("/auth/logout")

export const getProfile = async (): Promise<User> => {
	const response = await api.get("/auth/user")
	return response.data.data
}
