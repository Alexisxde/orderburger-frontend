import api from "@/lib/axios"

type Response = { success: boolean; error: string | [{ param: string; error: string }] | null }

type Report6MonthResponse = Response & { data?: { month: string; quantity: number; total: number; status: string }[] }

export const getReportMonth = async (): Promise<Report6MonthResponse> => {
	const response = await api.get("/reports/6month")
	return response.data
}

type ReportDayResponse = Response & { data?: { date: string; status: string; total: number; quantity: number }[] }

export const getReportDay = async ({ date }: { date: string }): Promise<ReportDayResponse> => {
	const response = await api.get("/reports/day", { params: { date } })
	return response.data
}

type ReportTopClientsResponse = Response & { data?: { client: string; total: number; quantity: number }[] }

export const getReportTopClients = async (): Promise<ReportTopClientsResponse> => {
	const response = await api.get("/reports/clients")
	return response.data
}

type ReportTopProductsResponse = Response & { data?: { product_name: string; quantity: number }[] }

export const getReportTopProducts = async (): Promise<ReportTopProductsResponse> => {
	const response = await api.get("/reports/products")
	return response.data
}
