"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
export const description = "A donut chart with text"

const chartData = [
	{ browser: "pizza", visitors: 200, fill: "var(--color-pizza)" },
	{ browser: "hamburguer", visitors: 287, fill: "var(--color-hamburguer)" },
	{ browser: "empanadas", visitors: 120, fill: "var(--color-empanadas)" },
	{ browser: "bebidas", visitors: 200, fill: "var(--color-bebidas)" },
	{ browser: "other", visitors: 190, fill: "var(--color-other)" }
]

const chartConfig = {
	visitors: { label: "Categorias" },
	pizza: { label: "Pizzas", color: "var(--chart-1)" },
	hamburguer: { label: "Hambur...", color: "var(--chart-2)" },
	empanadas: { label: "Empana...", color: "var(--chart-3)" },
	bebidas: { label: "Bebidas", color: "var(--chart-4)" },
	other: { label: "Otros", color: "var(--chart-5)" }
} satisfies ChartConfig

export default function ChartPieCategory() {
	const totalVisitors = React.useMemo(() => chartData.reduce((acc, curr) => acc + curr.visitors, 0), [])

	return (
		<Card className="flex flex-col">
			<CardHeader>
				<CardTitle className="text-xl">Categorias</CardTitle>
				<CardDescription className="text-sm">
					Resumen de los pedidos realizados en las diferentes categorias.
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
					<PieChart>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
												<tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
													{totalVisitors.toLocaleString()}
												</tspan>
												<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
													Pedidos
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
