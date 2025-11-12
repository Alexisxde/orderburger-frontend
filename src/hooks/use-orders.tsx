import { getOrders } from "@/services/orders"
import { useQuery } from "@tanstack/react-query"

export function useOrders() {
	const { data, isLoading, error, refetch, isPending, isRefetching } = useQuery({
		queryKey: ["orders"],
		queryFn: getOrders,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		retry: false
	})

	return { data, isLoading, error, refetch, isPending, isRefetching }
}
