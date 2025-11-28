import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCardSkeleton() {
	return (
		<Card className="overflow-hidden max-w-sm gap-0 py-0">
			<div className="relative">
				<Skeleton className="absolute top-3 left-3 z-10 h-6 w-24 rounded-full" />
				<div className="rounded-md h-64">
					<Skeleton className="h-full w-full" />
				</div>
			</div>
			<CardContent className="p-4">
				<div className="flex items-start justify-between gap-2 mb-2">
					<Skeleton className="h-6 w-32" />
					<div className="text-right space-y-1">
						<Skeleton className="h-3 w-10 ml-auto" />
						<Skeleton className="h-5 w-16" />
					</div>
				</div>
				<div className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			</CardContent>
		</Card>
	)
}
