import axios from "axios"

const api = axios.create({
	baseURL: `https://192.168.1.15:3000/api`,
	timeout: 10000,
	headers: { "Content-Type": "application/json" },
	withCredentials: true
})

export default api
