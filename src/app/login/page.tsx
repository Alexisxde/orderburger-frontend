import FormLogin from "@/components/form-login"

export default function Login() {
	return (
		<section className="relative w-full flex h-screen bg-background gap-4 items-center">
			<section className="flex-1 p-4 lg:p-6">
				<div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
					<div className="flex flex-col gap-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
						<p className="text-muted-foreground text-sm">Ingresa tus datos para acceder a tu cuenta.</p>
					</div>
					<FormLogin />
				</div>
			</section>
			<div className="flex-1 text-primary relative hidden h-full flex-col p-10 lg:flex dark:border-l">
				<div className="bg-primary/5 absolute inset-0"></div>
				<div className="relative z-20 mt-auto">
					<blockquote className="leading-normal text-balance">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam iste, dolor nobis laudantium modi at.
					</blockquote>
				</div>
			</div>
		</section>
	)
}
