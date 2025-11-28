import ProductAddButton from "@/components/products/product-button-add"
import ProductList from "@/components/products/product-list"

export default function MenuPage() {
	return (
		<section className="w-full p-4">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h2 className="text-3xl font-medium text-foreground">Menú de Productos</h2>
					<p className="text-muted-foreground mt-1">Gestiona los productos de tu menú</p>
				</div>
				<ProductAddButton />
			</div>
			<ProductList />
		</section>
	)
}
