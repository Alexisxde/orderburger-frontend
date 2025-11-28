"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartNoAxesCombined } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"

export const description = "A multiple bar chart"

const chartData = [
	{ month: "Junio", cash: 186, mercado_pago: 80, other: 10 }
	// { month: "Julio", cash: 305, mercado_pago: 200, other: 90 },
	// { month: "Agosto", cash: 237, mercado_pago: 120, other: 30 },
	// { month: "Septiembre", cash: 73, mercado_pago: 190, other: 20 },
	// { month: "Octubre", cash: 209, mercado_pago: 130, other: 50 },
	// { month: "Noviembre", cash: 214, mercado_pago: 140, other: 5 }
]

const chartConfig = {
	cash: { label: "Efectivo", color: "var(--chart-1)" },
	mercado_pago: { label: "Merc. Pago", color: "var(--chart-2)" },
	other: { label: "Otros", color: "var(--chart-3)" }
} satisfies ChartConfig

export default function ChartBarOrdersPayments() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Métodos de Pago</CardTitle>
				<CardDescription className="text-sm">Resumen de los pagos realizados en los últimos 6 meses.</CardDescription>
			</CardHeader>
			<CardContent>
				{chartData && chartData.length > 1 && (
					<ChartContainer config={chartConfig}>
						<BarChart accessibilityLayer data={chartData}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
							<Bar dataKey="cash" fill="var(--color-cash)" radius={4} />
							<Bar dataKey="mercado_pago" fill="var(--color-mercado_pago)" radius={4} />
							<Bar dataKey="other" fill="var(--color-other)" radius={4} />
						</BarChart>
					</ChartContainer>
				)}
				{chartData?.length <= 1 && (
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
			</CardContent>
		</Card>
	)
}
