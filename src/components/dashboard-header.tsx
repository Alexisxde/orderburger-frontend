import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/use-auth"
import { useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

export default function DashboardHeader() {
	const queryClient = useQueryClient()
	const { user, isLoading } = useAuth()

	const invalidateAndRefetch = () => {
		queryClient.invalidateQueries({
			queryKey: ["orders", "report-month", "report-day", "report-top-clients", "report-top-products", "user"]
		})
	}

	return (
		<header>
			<h1 className="text-xl flex items-center gap-2 font-medium">
				<span>Bienvenido</span> {isLoading ? <Skeleton className="h-8 w-48 rounded-lg" /> : <span>{user?.name}</span>}
			</h1>
			<Button onClick={invalidateAndRefetch} disabled={isLoading}>
				<Loader2 className="size-5" />
				<span>Actualizar</span>
			</Button>
		</header>
	)
}
