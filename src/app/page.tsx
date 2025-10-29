import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
	return (
		<section className="bg-background h-screen flex items-center justify-center">
			<Button variant={"link"} asChild>
				<Link href="/login">Login</Link>
			</Button>
		</section>
	)
}
