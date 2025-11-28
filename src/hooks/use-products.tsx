import { createProduct, getProducts } from "@/services/products"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useProducts() {
	const { data, isLoading } = useQuery({
		queryKey: ["GET:products"],
		queryFn: getProducts,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		retry: false
	})

	return { products: data?.data ?? [], isLoading, error: data?.error }
}

export function useCreateProduct() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["GET:products"] })
		}
	})
}
