import { Button } from "@/components/ui/button"
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

export default function Page() {
	return (
		<section className="flex flex-col flex-1">
			<header className="flex items-center justify-between mb-2">
				<h1 className="text-2xl">Pedidos</h1>
				<Sheet>
					<SheetTrigger asChild>
						<Button>
							<Plus />
							<span className="hidden lg:block">Nuevo pedido</span>
						</Button>
					</SheetTrigger>
					<SheetContent className="min-w-[550px] focus:outline-none">
						<SheetHeader className="pb-0">
							<SheetTitle className="text-2xl">Pedido</SheetTitle>
							<SheetDescription className="text-xs">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
							</SheetDescription>
						</SheetHeader>
						<form className="flex flex-1 px-4">
							<FieldGroup className="gap-2">
								<FieldSeparator />
								<FieldSet>
									<FieldGroup className="gap-2">
										<div className="flex items-center gap-2 justify-between">
											<Field>
												<FieldLabel>Cliente</FieldLabel>
												<Input className="w-full" placeholder="Nombre del cliente" type="text" />
											</Field>
											<Field>
												<FieldLabel>Télefono</FieldLabel>
												<Input className="w-full" placeholder="Télefono del cliente" type="text" />
											</Field>
											<Field>
												<FieldLabel>Paga con</FieldLabel>
												<Select defaultValue="cash">
													<SelectTrigger>
														<SelectValue placeholder="Seleccione"></SelectValue>
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="cash">Efectivo</SelectItem>
														<SelectItem value="transfer">Transferencia</SelectItem>
														<SelectItem value="mercado_pago">Mercado Pago</SelectItem>
													</SelectContent>
												</Select>
											</Field>
										</div>
									</FieldGroup>
									<FieldSeparator />
								</FieldSet>
								<FieldSet>
									<FieldLegend>Detalles del pedido</FieldLegend>
									<FieldDescription className="text-xs">
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, saepe.
									</FieldDescription>
									<FieldGroup className="gap-2">
										<FieldSeparator />
										<div className="flex items-center gap-2 justify-between">
											<Field>
												<FieldLabel>Producto</FieldLabel>
												<Select defaultValue="">
													<SelectTrigger>
														<SelectValue placeholder="Seleccione"></SelectValue>
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="1234567890">Hamburguesa Común</SelectItem>
														<SelectItem value="123456789">Hamburguesa Especial</SelectItem>
													</SelectContent>
												</Select>
											</Field>
											<Field>
												<FieldLabel>Cantidad</FieldLabel>
												<Input className="w-full" placeholder="Cantidad" type="number" />
											</Field>
										</div>
										<Field>
											<FieldLabel>Observación</FieldLabel>
											<Textarea />
										</Field>
									</FieldGroup>
								</FieldSet>
								<SheetFooter>
									<Field>
										<Button type="submit">Guardar</Button>
										<Button type="button" variant="outline">
											Cancelar
										</Button>
									</Field>
								</SheetFooter>
							</FieldGroup>
						</form>
					</SheetContent>
				</Sheet>
			</header>
			<div className="bg-muted/50 flex-1 rounded-xl" />
		</section>
	)
}
