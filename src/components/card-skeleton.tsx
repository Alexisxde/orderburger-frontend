import { Skeleton } from "@/components/ui/skeleton"

export default function CardSkeleton() {
	return (
		<Skeleton className="flex flex-col gap-2 bg-card rounded-lg p-6">
			<Skeleton className="h-7 w-1/3" />
			<div className="flex flex-col gap-2">
				<Skeleton className="h-4" />
				<Skeleton className="h-4 w-1/2" />
			</div>
		</Skeleton>
	)
}
