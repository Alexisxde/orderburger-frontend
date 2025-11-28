import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "/dzfntog8k/image/upload/v1764300799/**",
				port: ""
			}
		]
	}
}

export default nextConfig
