import api from "@/lib/axios"

type Response = {
	success: boolean
	data?: { month: string; count: number }[]
	error: null | [{ params: string; error: string }]
}

export const getReportMonth = async (): Promise<Response> => {
	const response = await api.get("/reports/month", { params: { year: 2025, status: "on_hold" } })
	return response.data
}
