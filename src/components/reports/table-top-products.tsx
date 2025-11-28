"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useReportTopProducts } from "@/hooks/use-reports"
import { CupSoda, Hamburger, Pizza, Sandwich } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export default function TableTopProducts() {
	const { data } = useReportTopProducts()

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Top 5 más vendidos</CardTitle>
				<CardDescription className="text-sm">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, incidunt!
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nombre</TableHead>
							<TableHead className="text-center">Vendidos</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium flex items-center gap-2">
								<Hamburger className="size-4" />
								Hamburguesa Super
							</TableCell>
							<TableCell className="text-center">20</TableCell>
						</TableRow>
						{data?.data?.map(({ product_name, quantity }, idx) => (
							<TableRow key={`${product_name}-${idx}`}>
								<TableCell className="font-medium flex items-center gap-2">
									<Hamburger className="size-4" />
									{product_name}
								</TableCell>
								<TableCell className="text-center">{quantity}</TableCell>
							</TableRow>
						))}
						<TableRow>
							<TableCell className="font-medium flex items-center gap-2">
								<Pizza className="size-4" />
								Pizza Napolitana
							</TableCell>
							<TableCell className="text-center">5</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium flex items-center gap-2">
								<Sandwich className="size-4" />
								Sandwich de Pollo
							</TableCell>
							<TableCell className="text-center">5</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium flex items-center gap-2">
								<CupSoda className="size-4" />
								Coca Cola
							</TableCell>
							<TableCell className="text-center">4</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
