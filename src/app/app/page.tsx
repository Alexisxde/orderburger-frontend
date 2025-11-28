"use client"
import DashboardHeader from "@/components/dashboard-header"
import ChartAreaOrderMonth from "@/components/reports/chart-area-order-month"
import ChartBarOrdersPayments from "@/components/reports/chart-bar-orders-payments"
import ChartLineMultiple from "@/components/reports/chart-multiple-line"
import ChartPieCategory from "@/components/reports/chart-pie-category"
import TableTopClients from "@/components/reports/table-top-clients"
import TableTopProducts from "@/components/reports/table-top-products"

export default function AppPage() {
	return (
		<div className="flex flex-col gap-4">
			<DashboardHeader />
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<ChartAreaOrderMonth />
				<ChartBarOrdersPayments />
				<TableTopClients />
				<ChartPieCategory />
				<ChartLineMultiple />
				<TableTopProducts />
				{/* <ChartPieOrderDay /> */}
			</div>
		</div>
	)
}
