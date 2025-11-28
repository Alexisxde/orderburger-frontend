"use client"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useFileUpload } from "@/hooks/use-file-upload"
import { useCreateProduct } from "@/hooks/use-products"
import { productSchema } from "@/schemas/products.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircleIcon, ImageIcon, Loader2, Plus, UploadIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"
import { Label } from "../ui/label"

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

type ProductFormData = z.infer<typeof productSchema>

export default function ProductAddButton() {
	const [open, setOpen] = useState(false)
	const { mutateAsync, isPending } = useCreateProduct()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<ProductFormData>({ resolver: zodResolver(productSchema) })
	const [
		{ files, isDragging, errors: fileErrors },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			removeFile,
			getInputProps,
			clearFiles
		}
	] = useFileUpload({
		accept: "image/png,image/jpeg,image/jpg",
		maxSize: MAX_FILE_SIZE
	})

	const previewUrl = files[0]?.preview || null
	const selectedFile = files[0]?.file instanceof File ? files[0].file : null

	const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
		if (!selectedFile) {
			toast.error("file: Por favor selecciona una imagen")
			return
		}
		const formData = new FormData()
		formData.append("name", data.name)
		formData.append("price", data.price.toString())
		formData.append("description", data.description as string)
		formData.append("file", selectedFile)

		try {
			const result = await mutateAsync(formData)
			if (result.success) {
				toast.success(`${data.name} creada exitosamente!`)
				reset()
				setOpen(false)
				clearFiles()
			}
		} catch (_) {
			toast.error("Error inesperado al crear el producto")
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="size-4" />
					<span className="hidden md:block">Agregar Producto</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader>
						<DialogTitle>Nuevo Producto</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<Field data-invalid={!!errors.name}>
							<FieldLabel htmlFor="name">Nombre</FieldLabel>
							<FieldContent>
								<Input id="name" placeholder="Nombre del producto" {...register("name")} disabled={isPending} />
								<FieldError errors={[errors.name]} />
							</FieldContent>
						</Field>
						<Field data-invalid={!!errors.price}>
							<FieldLabel htmlFor="price">Precio</FieldLabel>
							<FieldContent>
								<Input id="price" type="text" placeholder="0.00" {...register("price")} disabled={isPending} />
								<FieldError errors={[errors.price]} />
							</FieldContent>
						</Field>
						<Field data-invalid={!!errors.description}>
							<FieldLabel htmlFor="description">Descripción</FieldLabel>
							<FieldContent>
								<Textarea
									id="description"
									placeholder="Describe el producto..."
									rows={4}
									{...register("description")}
									aria-invalid={!!errors.description}
									disabled={isPending}
								/>
								<FieldError errors={[errors.description]} />
							</FieldContent>
						</Field>
						<div className="space-y-2">
							<Label>Imagen del producto</Label>
							<div className="relative">
								<div
									className="relative flex min-h-44 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-input p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
									data-dragging={isDragging || undefined}
									onDragEnter={handleDragEnter}
									onDragLeave={handleDragLeave}
									onDragOver={handleDragOver}
									onDrop={handleDrop}>
									<input {...getInputProps()} aria-label="Subir imagen del producto" className="sr-only" />
									{previewUrl ? (
										<div className="absolute inset-0 flex items-center justify-center p-4">
											<img
												alt={selectedFile?.name || "Imagen subida"}
												className="mx-auto max-h-full rounded object-contain"
												src={previewUrl || "/placeholder.svg"}
											/>
										</div>
									) : (
										<div className="flex flex-col items-center justify-center px-4 py-3 text-center">
											<div
												aria-hidden="true"
												className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background">
												<ImageIcon className="size-4 opacity-60" />
											</div>
											<p className="mb-1.5 text-sm font-medium">Arrastra tu imagen aquí</p>
											<p className="text-xs text-muted-foreground">PNG o JPG (máx. 2MB)</p>
											<Button type="button" className="mt-4 bg-transparent" onClick={openFileDialog} variant="outline">
												<UploadIcon aria-hidden="true" className="-ms-1 size-4 opacity-60" />
												Seleccionar imagen
											</Button>
										</div>
									)}
								</div>

								{previewUrl && (
									<div className="absolute right-4 top-4">
										<button
											type="button"
											aria-label="Eliminar imagen"
											className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
											onClick={() => removeFile(files[0]?.id)}>
											<XIcon aria-hidden="true" className="size-4" />
										</button>
									</div>
								)}
							</div>

							{fileErrors.length > 0 && (
								<p className="flex items-center gap-1 text-xs text-destructive" role="alert">
									<AlertCircleIcon className="size-3 shrink-0" />
									{fileErrors[0]}
								</p>
							)}
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type="button" variant="outline" disabled={isPending}>
								Cancelar
							</Button>
						</DialogClose>
						<Button type="submit" disabled={isPending}>
							{isPending ? (
								<>
									<Loader2 className="size-4 animate-spin" />
									<span>Creando...</span>
								</>
							) : (
								"Agregar"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
