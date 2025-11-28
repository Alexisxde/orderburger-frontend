"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useReportMonth } from "@/hooks/use-reports"
import { MONTH } from "@/lib/utils"
import { ChartNoAxesCombined, Loader2, TrendingDown, TrendingUp } from "lucide-react"
import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const chartConfig = {
	desktop: { label: "Pedidos", color: "var(--chart-3)" }
} satisfies ChartConfig

export default function ChartAreaOrderMonth() {
	const { data, isLoading, isFetching } = useReportMonth()

	const chartData =
		data?.data?.map(({ month, quantity, total }) => ({
			month: MONTH[parseInt(month) - 1],
			desktop: quantity,
			total
		})) ?? []

	const trend = useMemo(() => {
		if (!chartData) return null
		if (chartData.length < 2) return null
		const last = chartData[chartData.length - 1].total
		const prev = chartData[chartData.length - 2].total
		const variation = ((last - prev) / prev) * 100
		return Number(variation.toFixed(2))
	}, [chartData])

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Pedidos</CardTitle>
				<CardDescription className="text-sm">Resumen de pedidos realizados en los últimos 6 meses.</CardDescription>
			</CardHeader>
			<CardContent>
				{isLoading ||
					(isFetching && (
						<div className="flex h-[150px] items-center justify-center">
							<Loader2 className="animate-spin" />
						</div>
					))}
				{chartData.length > 1 && !isLoading && !isFetching && (
					<ChartContainer config={chartConfig}>
						<AreaChart accessibilityLayer data={chartData} margin={{ top: 12, left: 12, right: 12 }}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
							<Area
								dataKey="desktop"
								type="natural"
								fill="var(--color-desktop)"
								fillOpacity={0.4}
								stroke="var(--color-desktop)"
							/>
						</AreaChart>
					</ChartContainer>
				)}
				{chartData.length <= 1 && !isLoading && !isFetching && (
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
			{trend && (
				<CardFooter className="flex-col items-start gap-2 text-sm">
					<div className="flex gap-2 leading-none font-medium">
						{trend > 0 ? (
							<>
								<span>Tendencia al alza del {trend} este mes</span>
								<TrendingUp className="text-green-500 size-4" />
							</>
						) : (
							<>
								<span>Tendencia a la baja del {Math.abs(trend)}% este mes</span>
								<TrendingDown className="text-red-500 size-4" />
							</>
						)}
					</div>
					<div className="text-muted-foreground leading-none text-xs">
						Mostrando el total de pedidos en los últimos {chartData?.length ?? 6} meses.
					</div>
				</CardFooter>
			)}
		</Card>
	)
}
