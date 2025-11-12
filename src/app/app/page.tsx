"use client"
import ChartAreaOrderMonth from "@/components/reports/chart-area-order-month"
import TableOrders from "@/components/reports/table-orders"

export default function AppPage() {
	return (
		<div className="flex flex-col gap-4">
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<ChartAreaOrderMonth />
				<ChartAreaOrderMonth />
				<ChartAreaOrderMonth />
			</div>
			<TableOrders />
		</div>
	)
}
