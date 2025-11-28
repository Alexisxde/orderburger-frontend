export const STATUS = {
	delivered: "Entregado",
	on_hold: "En espera",
	deleted: "Eliminado",
	cancelled: "Cancelado"
}
export const PAYMENT_METHODS = { cash: "Efectivo", mercado_pago: "Mercado Pago", transfer: "Otro" }
export type Status = keyof typeof STATUS
export type PaymentMethod = keyof typeof PAYMENT_METHODS

export type Order = {
	_id: string
	name: string
	phone?: string | null
	status: Status
	payment_method: PaymentMethod
	total: number
	created_at: string
}
