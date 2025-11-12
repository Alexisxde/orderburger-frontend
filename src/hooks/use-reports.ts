import { getReportMonth } from "@/services/reports"
import { useQuery } from "@tanstack/react-query"

export function useReportMonth() {
	const { data, isLoading, error, refetch, isPending, isRefetching } = useQuery({
		queryKey: ["report-month"],
		queryFn: getReportMonth,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		retry: false
	})

	return { data, isLoading, error, refetch, isPending, isRefetching }
}
