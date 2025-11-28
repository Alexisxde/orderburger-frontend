import ButtonTheme from "@/components/button-theme"
import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import type { CSSProperties, ReactNode } from "react"

export default function AppLayout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider defaultOpen={false} style={{ "--sidebar-width": "19rem" } as CSSProperties}>
			<AppSidebar />
			<SidebarInset>
				<header className="flex items-center justify-between h-16 shrink-0 gap-2 px-4">
					<SidebarTrigger />
					<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
					<ButtonTheme />
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
