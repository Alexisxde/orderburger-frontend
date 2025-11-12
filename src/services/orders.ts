import api from "@/lib/axios"

type Response = {
	success: boolean
	data?: {
		page: number
		pages: number
		result: {
			_id: string
			name: string
			phone: string | null
			payment_method: string
			total: number
			created_at: string
			status: string
		}[]
	}
	error: null | [{ params: string; error: string }]
}

export const getOrders = async (): Promise<Response> => {
	const response = await api.get("/orders")
	return response.data
}
