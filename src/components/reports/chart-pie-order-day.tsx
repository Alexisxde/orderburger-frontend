"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"

export default function ChartPieOrdersDay() {
	const [isOpen, setIsOpen] = useState(false)
	const [date, setDate] = useState<Date | undefined>(undefined)
	const data = { date: "2025-11-11", status: "delivered", total: 10000, quantity: 1 }

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Pedidos por día</CardTitle>
				<CardDescription className="text-sm">
					Lorem ipsum dolor sit amet consectetur adipisicing elit expedita repudiandae.
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<div className="flex flex-col gap-3">
					<Label htmlFor="date" className="px-1">
						Date of birth
					</Label>
					<Popover open={isOpen} onOpenChange={setIsOpen}>
						<PopoverTrigger asChild>
							<Button variant="outline" id="date" className="w-48 justify-between font-normal">
								{date ? date.toISOString().split("T")[0] : "Seleccione un día"}
								<ChevronDownIcon />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto overflow-hidden p-0" align="start">
							<Calendar
								mode="single"
								selected={date}
								captionLayout="dropdown"
								onSelect={(date: Date) => {
									setDate(date)
									setIsOpen(false)
								}}
							/>
						</PopoverContent>
					</Popover>
				</div>
			</CardContent>
		</Card>
	)
}
