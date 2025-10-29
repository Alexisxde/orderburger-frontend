import { jwtVerify } from "jose"
import { NextResponse, type NextRequest } from "next/server"

export default async function proxy({ cookies, url }: NextRequest) {
	const jwt = cookies.get("token")
	if (!jwt) return NextResponse.redirect(new URL("/login", url))

	try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET)
		await jwtVerify(jwt.value, secret)
		// return NextResponse.redirect(new URL("/app", url))
		return NextResponse.next()
	} catch (_) {
		return NextResponse.redirect(new URL("/login", url))
	}
}

export const config = { matcher: ["/app/:path*"] }
