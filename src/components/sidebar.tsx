"use client"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/use-auth"
import { getProfile } from "@/services/auth"
import { useQuery } from "@tanstack/react-query"
import { ChartSpline, GalleryVerticalEnd, Hamburger, LayoutDashboard, LogOut, PenLine, Wallet } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type * as React from "react"

const data = {
	navMain: {
		user: [
			{ title: "Informes", url: "/app", icon: ChartSpline },
			{ title: "Pedidos", url: "/app/orders", icon: PenLine },
			{ title: "Catalogo", url: "/app/menu", icon: Hamburger }
		],
		admin: [{ title: "Dashboard", url: "/app/admin/dashboard", icon: LayoutDashboard }]
	}
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data: user } = useQuery({
		queryKey: ["user"],
		queryFn: getProfile,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		retry: false
	})
	const { logout } = useAuth()
	const { isMobile } = useSidebar()
	const pathname = usePathname()

	return (
		<Sidebar variant="floating" collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<GalleryVerticalEnd className="size-4" />
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-medium">Order</span>
									<span className="">v1.0.0</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu className="gap-2">
						{user?.role === "admin"
							? data.navMain.admin.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton tooltip={item.title} isActive={pathname === item.url} asChild>
											<Link href={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))
							: data.navMain.user.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton tooltip={item.title} isActive={pathname === item.url} asChild>
											<Link href={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
									{/* <Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage src={user.avatar} alt={user.name} />
										<AvatarFallback className="rounded-lg">CN</AvatarFallback>
									</Avatar> */}
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">{user?.name}</span>
										<span className="truncate text-xs">{user?.email}</span>
									</div>
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
								side={isMobile ? "bottom" : "right"}
								align="end"
								sideOffset={4}>
								<DropdownMenuLabel className="p-0 font-normal">
									<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
										{/* <Avatar className="h-8 w-8 rounded-lg">
											<AvatarImage src={user.avatar} alt={user.name} />
											<AvatarFallback className="rounded-lg">CN</AvatarFallback>
										</Avatar> */}
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-medium">{user?.name}</span>
											<span className="truncate text-xs">{user?.email}</span>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={async () => await logout()}>
									<LogOut />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
