"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useReportMonth } from "@/hooks/use-reports"
import { MONTH } from "@/lib/utils"
import { ChartNoAxesCombined, Loader2, RotateCcw } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Button } from "../ui/button"

const chartConfig = {
	desktop: { label: "Pedidos", color: "var(--chart-1)" }
} satisfies ChartConfig

export default function ChartAreaOrderMonth() {
	const { data, isLoading, refetch, isRefetching } = useReportMonth()

	const chartData = data?.data?.map(({ month, count }) => ({ month: MONTH[parseInt(month) - 1], desktop: count }))

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl flex items-center justify-between">
					<span>Estadísticas</span>
					<Button variant="ghost" onClick={async () => await refetch()}>
						{isRefetching ? <Loader2 className="animate-spin" /> : <RotateCcw className="scale-x-[-1]" />}
					</Button>
				</CardTitle>
				<CardDescription className="text-xs">Resumen de los pedidos realizados en los ultimos 6 meses.</CardDescription>
			</CardHeader>
			<CardContent>
				{isLoading ||
					(isRefetching && (
						<div className="flex h-[150px] items-center justify-center">
							<Loader2 className="animate-spin" />
						</div>
					))}
				{chartData && !isLoading && !isRefetching && (
					<ChartContainer config={chartConfig}>
						<AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
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
				{chartData?.length === 0 && !isLoading && !isRefetching && (
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
