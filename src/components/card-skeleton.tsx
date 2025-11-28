import { Skeleton } from "@/components/ui/skeleton"

export default function CardSkeleton() {
	return (
		<Skeleton className="flex flex-col gap-4 bg-card rounded-lg p-6 h-96">
			<Skeleton className="flex-1 w-full p-4" />
			<div className="flex flex-col gap-2">
				<Skeleton className="h-7 w-1/2" />
				<Skeleton className="h-4" />
				<Skeleton className="h-4 w-1/4" />
			</div>
		</Skeleton>
	)
}
