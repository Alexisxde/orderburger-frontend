"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useReportTopClients } from "@/hooks/use-reports"
import { ChartNoAxesCombined, User } from "lucide-react"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export default function TableTopClients() {
	const { data } = useReportTopClients()

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Top 5 de Clientes</CardTitle>
				<CardDescription className="text-sm">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, incidunt!
				</CardDescription>
			</CardHeader>
			<CardContent>
				{data?.data && data?.data?.length <= 1 && (
					<Empty>
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<ChartNoAxesCombined />
							</EmptyMedia>
							<EmptyTitle>No hay estadísticas</EmptyTitle>
							<EmptyDescription className="text-xs">
								Se necesita dos meses para poder ver las estadisticas.
							</EmptyDescription>
						</EmptyHeader>
					</Empty>
				)}
				{data?.data && data.data?.length > 0 && (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Cliente</TableHead>
								<TableHead className="text-center">Pedidos</TableHead>
								<TableHead className="text-center">Total</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.data?.map(({ client, quantity, total }, idx) => (
								<TableRow key={`${client}-${idx}`}>
									<TableCell className="font-medium flex items-center gap-2">
										<User className="size-4" />
										{client}
									</TableCell>
									<TableCell className="text-center">{quantity}</TableCell>
									<TableCell className="text-center">
										${total.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	)
}
