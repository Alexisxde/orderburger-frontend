import api from "@/lib/axios";
import type { Product } from "@/types/product";

type Response = { success: boolean; error: string | [{ field: string; error: string }] | null }

type ResponseGetProducts = Response & { data: Product[] | [] }

export const getProducts = async () => {
	const response = await api.get<ResponseGetProducts>("/products")
	return response.data
}

type ResponseCreateProduct = Response & { data: Product | null }

export const createProduct = async (product: unknown) => {
	const response = await api.post<ResponseCreateProduct>("/products/new", product, {
		headers: { "content-type": "multipart/form-data" }
	})
	return response.data
}
