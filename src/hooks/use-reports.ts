import { getReportDay, getReportMonth, getReportTopClients, getReportTopProducts } from "@/services/reports"
import { useQuery } from "@tanstack/react-query"

export function useReportMonth() {
	const { data, isLoading, error, refetch, isPending, isFetching } = useQuery({
		queryKey: ["report-month"],
		queryFn: getReportMonth,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		retry: false
	})

	return { data, isLoading, error, refetch, isPending, isFetching }
}

export function useReportDay() {
	const { data, isLoading, error, refetch, isPending, isFetching } = useQuery({
		queryKey: ["report-day"],
		queryFn: () => getReportDay({ date: "2025-11-11" }),
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		retry: false
	})

	return { data, isLoading, error, refetch, isPending, isFetching }
}

export function useReportTopClients() {
	const { data, isLoading, error, refetch, isPending, isFetching } = useQuery({
		queryKey: ["report-top-clients"],
		queryFn: getReportTopClients,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		retry: false
	})

	return { data, isLoading, error, refetch, isPending, isFetching }
}

export function useReportTopProducts() {
	const { data, isLoading, error, refetch, isPending, isFetching } = useQuery({
		queryKey: ["report-top-products"],
		queryFn: getReportTopProducts,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		retry: false
	})

	return { data, isLoading, error, refetch, isPending, isFetching }
}
