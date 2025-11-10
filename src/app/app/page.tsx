import ChartAreaOrderMonth from "@/components/reports/chart-area-order-month"

export default function AppPage() {
	return (
		<>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<ChartAreaOrderMonth />
				<ChartAreaOrderMonth />
				<ChartAreaOrderMonth />
			</div>
			<div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
		</>
	)
}
