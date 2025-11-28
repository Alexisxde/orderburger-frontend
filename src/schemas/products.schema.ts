import { z } from "zod"

export const productSchema = z.object({
	name: z
		.string()
		.min(1, "El nombre es requerido")
		.min(8, "El nombre debe tener al menos 8 caracteres")
		.max(100, "El nombre no puede exceder 100 caracteres"),
	description: z.string().optional(),
	price: z.string()
})
