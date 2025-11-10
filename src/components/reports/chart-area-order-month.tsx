"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { MONTH } from "@/lib/utils"
import { getReportMonth } from "@/services/reports"
import { useQuery } from "@tanstack/react-query"
import { ChartNoAxesCombined } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const chartConfig = {
	desktop: { label: "Pedidos", color: "var(--chart-1)" }
} satisfies ChartConfig

export default function ChartAreaOrderMonth() {
	const { data } = useQuery({
		queryKey: ["report-month"],
		queryFn: getReportMonth,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		retry: false
	})

	const chartData = data?.data?.map(({ month, count }) => ({ month: MONTH[parseInt(month) - 1], desktop: count }))

	return (
		<Card>
			<CardHeader>
				<CardTitle>Estadísticas</CardTitle>
				<CardDescription className="text-xs">Resumen de los pedidos realizados en los ultimos 6 meses.</CardDescription>
			</CardHeader>
			<CardContent>
				{chartData && chartData.length > 1 ? (
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
				) : (
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
