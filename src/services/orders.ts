import api from "@/lib/axios"
import type { Order } from "@/types/order"

type Response = {
	success: boolean
	data?: { result: Order[]; page: number; pages: number }
	error: null | [{ params: string; error: string }]
}

export const getOrders = async (): Promise<Response> => {
	const response = await api.get("/orders")
	return response.data
}
