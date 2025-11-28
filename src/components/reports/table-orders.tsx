"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useOrders } from "@/hooks/use-orders"
import { cn } from "@/lib/utils"
import { PAYMENT_METHODS, STATUS } from "@/types/order"
import { Loader2, RotateCcw } from "lucide-react"

export default function TableOrders() {
	const { data, refetch, isRefetching } = useOrders()

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl flex items-center justify-between">
					<span>Pedidos</span>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" onClick={async () => await refetch()}>
								{isRefetching ? <Loader2 className="animate-spin" /> : <RotateCcw className="scale-x-[-1]" />}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Recargar</p>
						</TooltipContent>
					</Tooltip>
				</CardTitle>
				<CardDescription className="text-xs">Los 15 últimos pedidos creados.</CardDescription>
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
								<TableCell>
									<Badge
										className={cn("rounded-full border-none focus-visible:outline-none", {
											"dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5 bg-green-600/10 text-green-600 focus-visible:ring-green-600/20":
												status === "delivered",
											"dark:bg-orange-400/10 dark:text-orange-400 dark:focus-visible:ring-orange-400/40 [a&]:hover:bg-orange-600/5 dark:[a&]:hover:bg-orange-400/5 bg-orange-600/10 text-orange-600 focus-visible:ring-orange-600/20":
												status === "on_hold",
											"dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 [a&]:hover:bg-red-600/5 dark:[a&]:hover:bg-red-400/5 bg-red-600/10 text-red-600 focus-visible:ring-red-600/20":
												status === "cancelled"
										})}>
										{STATUS[status]}
									</Badge>
								</TableCell>
								<TableCell>
									<Badge
										className={cn("rounded-full border-none focus-visible:outline-none", {
											"dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5 bg-green-600/10 text-green-600 focus-visible:ring-green-600/20":
												payment_method === "cash",
											"dark:bg-blue-400/10 dark:text-blue-400 dark:focus-visible:ring-blue-400/40 [a&]:hover:bg-blue-600/5 dark:[a&]:hover:bg-blue-400/5 bg-blue-600/10 text-blue-600 focus-visible:ring-blue-600/20":
												payment_method === "mercado_pago",
											"dark:bg-neutral-400/10 dark:text-neutral-400 dark:focus-visible:ring-neutral-400/40 [a&]:hover:bg-neutral-600/5 dark:[a&]:hover:bg-neutral-400/5 bg-neutral-600/10 text-neutral-600 focus-visible:ring-neutral-600/20":
												payment_method === "transfer"
										})}>
										{PAYMENT_METHODS[payment_method]}
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
