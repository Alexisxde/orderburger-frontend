import { z } from "zod"

export const userCreateSchema = z.object({
	name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
	email: z.email({ message: "Debe ser un email válido." }),
	password: z
		.string()
		.min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
		.refine((val) => /[A-Z]/.test(val), { message: "Debe contener al menos una letra mayúscula." })
		.refine((val) => /\d/.test(val), { message: "Debe contener al menos un número." })
		.refine((val) => /^[a-zA-Z\d]+$/.test(val), { message: "Solo se permiten letras y números." })
})

export const loginSchema = z.object({
	email: z
		.string({ error: "El email es obligatorio." })
		.nonempty({ message: "El email no puede estar vacío." })
		.email({ message: "Debe ser un email válido." }),
	password: z
		.string({ error: "La contraseña es obligatoria." })
		.nonempty({ message: "La contraseña no puede estar vacía." })
		.min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
		.refine((val) => /[A-Z]/.test(val), { message: "Debe contener al menos una letra mayúscula." })
		.refine((val) => /\d/.test(val), { message: "Debe contener al menos un número." })
		.refine((val) => /^[a-zA-Z\d]+$/.test(val), { message: "Solo se permiten letras y números." })
})
