"use client"
import ProductCard from "@/components/products/product-card"
import ProductCardSkeleton from "@/components/products/product-card-skeleton"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useProducts } from "@/hooks/use-products"
import { PackagePlus } from "lucide-react"

export default function ProductList() {
	const { products, isLoading } = useProducts()

	if (isLoading) {
		return (
			<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
				{[1, 2, 3, 4].map((item) => (
					<ProductCardSkeleton key={item} />
				))}
			</div>
		)
	}

	if (products.length === 0) {
		return (
			<Empty className="h-full border">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<PackagePlus className="size-6" />
					</EmptyMedia>
					<EmptyTitle>No hay productos en el menú</EmptyTitle>
					<EmptyDescription>
						Comienza agregando tu primer producto para que tus clientes puedan realizar pedidos.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button>
						<PackagePlus className="size-4" />
						Agregar Producto
					</Button>
				</EmptyContent>
			</Empty>
		)
	}

	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
			{products.map((product) => (
				<ProductCard key={product._id} product={product} />
			))}
		</div>
	)
}
