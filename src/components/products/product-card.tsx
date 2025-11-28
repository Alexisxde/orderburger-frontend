"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Product } from "@/types/product"
import { Ban, MoreVertical, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
	product: Product
	onEdit?: (product: Product) => void
	onToggleDisable?: (product: Product) => void
	onDelete?: (product: Product) => void
}

export default function ProductCard({ product, onEdit, onToggleDisable, onDelete }: ProductCardProps) {
	return (
		<Card className="overflow-hidden max-w-sm py-0 gap-0">
			<div className="relative">
				<Badge
					variant={product.disabled ? "secondary" : "default"}
					className={`absolute top-3 left-3 z-10 ${
						product.disabled
							? "bg-red-100 text-red-700 hover:bg-red-100"
							: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
					}`}>
					<span className={`mr-1.5 size-2 rounded-full ${product.disabled ? "bg-red-500" : "bg-emerald-500"}`} />
					{product.disabled ? "Deshabilitado" : "Activo"}
				</Badge>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="secondary"
							size="icon"
							className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-secondary shadow-sm">
							<MoreVertical className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => onEdit?.(product)}>
							<Pencil className="mr-2 size-4" />
							Editar
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onToggleDisable?.(product)}>
							<Ban className="mr-2 size-4" />
							{product.disabled ? "Habilitar" : "Deshabilitar"}
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onDelete?.(product)} className="text-destructive focus:text-destructive">
							<Trash2 className="mr-2 size-4" />
							Eliminar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<div className="relative overflow-hidden rounded-md h-64">
					<Image
						src={product.image || "/placeholder.svg?height=300&width=400&query=product"}
						alt={product.name}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>
			</div>
			<CardContent className="p-4">
				<div className="flex items-start justify-between gap-2 mb-2">
					<h3 className="font-semibold text-lg leading-tight text-foreground">{product.name}</h3>
					<div className="text-right shrink-0">
						<p className="text-xs text-muted-foreground">Precio</p>
						<p className="font-bold text-emerald-600">
							${product.price.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
						</p>
					</div>
				</div>
				<p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
			</CardContent>
		</Card>
	)
}
