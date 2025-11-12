"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useOrders } from "@/hooks/use-orders"
import { Loader2, RotateCcw } from "lucide-react"

export default function TableOrders() {
	const { data, refetch, isRefetching } = useOrders()

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl flex items-center justify-between">
					<span>Pedidos</span>
					<Button variant="ghost" onClick={async () => await refetch()}>
						{isRefetching ? <Loader2 className="animate-spin" /> : <RotateCcw className="scale-x-[-1]" />}
					</Button>
				</CardTitle>
				<CardDescription className="text-xs">Los 15 ultimos pedidos creados.</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Cliente</TableHead>
							<TableHead>Estado</TableHead>
							<TableHead>Pagó con</TableHead>
							<TableHead>Teléfono</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.data?.result?.map(({ _id, name, phone, status, payment_method }) => (
							<TableRow key={_id}>
								<TableCell className="font-medium">{name}</TableCell>
								<TableCell>{status}</TableCell>
								<TableCell>
									<Badge variant="outline" className="gap-1.5">
										<span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
										{payment_method}
									</Badge>
								</TableCell>
								<TableCell>{phone ?? "-"}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
