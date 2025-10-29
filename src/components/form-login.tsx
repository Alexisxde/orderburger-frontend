"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"
import { loginSchema } from "@/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { type SubmitHandler, useForm } from "react-hook-form"
import type z from "zod"

type FormData = z.infer<typeof loginSchema>

export default function FormLogin() {
	const { login } = useAuth()
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors, isLoading }
	} = useForm<FormData>({ resolver: zodResolver(loginSchema) })

	const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
		await login({ email, password })
	}

	return (
		<form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
			<FieldGroup className="gap-2">
				<Field className="mb-1">
					<FieldLabel>Correo electrónico</FieldLabel>
					<Input
						placeholder="Ingrese su correo electrónico"
						type="email"
						disabled={isSubmitting || isLoading}
						{...register("email")}
					/>
					{errors.email && <FieldError>{errors.email.message}</FieldError>}
				</Field>
				<Field className="mb-1">
					<FieldLabel>Contraseña</FieldLabel>
					<Input
						placeholder="Ingrese su contraseña"
						type="password"
						disabled={isSubmitting || isLoading}
						{...register("password")}
					/>
					{errors.password && <FieldError>{errors.password.message}</FieldError>}
				</Field>
				<Field orientation="horizontal" className="justify-end">
					<Button type="submit" disabled={isSubmitting || isLoading}>
						{isSubmitting ? <LoaderCircle className="animate-spin" size="sm" /> : "Iniciar sesión"}
					</Button>
				</Field>
			</FieldGroup>
		</form>
	)
}
