import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/hooks/use-auth"
import { RotateCw } from "lucide-react"
import { Button } from "./ui/button"

export default function DashboardHeader() {
	const { user, isLoading } = useAuth()

	return (
		<header className="flex items-center justify-between">
			<h1 className="text-xl flex items-center gap-2 font-medium">
				<span>Bienvenido</span> {isLoading ? <Skeleton className="h-8 w-48 rounded-lg" /> : <span>{user?.name}</span>}
			</h1>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button>
						<RotateCw className={`size-5 animate-spin`} />
					</Button>
				</TooltipTrigger>
				<TooltipContent sideOffset={5}>
					<p>Recargar</p>
				</TooltipContent>
			</Tooltip>
		</header>
	)
}
