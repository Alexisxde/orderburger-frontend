import { jwtVerify } from "jose"
import { NextResponse, type NextRequest } from "next/server"

const NODE_ENV = process.env.NODE_ENV === "production"

export default async function proxy({ cookies, url }: NextRequest) {
	if (!NODE_ENV) return NextResponse.next()
	const token = cookies.get("token")
	if (!token) return NextResponse.redirect(new URL("/login", url))

	try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET)
		await jwtVerify(token.value, secret)
		return NextResponse.next()
	} catch (_) {
		return NextResponse.redirect(new URL("/login", url))
	}
}

export const config = { matcher: ["/app/:path*"] }
