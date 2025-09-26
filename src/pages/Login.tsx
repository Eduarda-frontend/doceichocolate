// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

// import { auth } from "@/services/firebaseConnection";
// import { signInWithEmailAndPassword } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Formulario } from "@/components/ui/form";

const schema = z.object({
	email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatório"),
	password: z.string().nonempty("O campo senha é obrigatório")
})

type FormData = z.infer<typeof schema>

const Login = () => {
	const [visualizaSenha, SetVisualizaSenha] = useState(false);
	const { register, handleSubmit, formState: { errors } }  = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: "onChange"
	})

	function onSubmit(data: FormData){
		console.log(data)
	}

	return (
		<div className="min-h-screen flex items-center justify-center relative overflow-hidden p-6  bg-gradient-sweet border-b border-border">
			{/* Login Form */}
			<div className="relative z-10 w-full max-w-lg mx-4">
				<div className="m-auto mt-20 bg-card/95 p-5 backdrop-blur-sm shadow-sweet border rounded-lg">
					<div className="grid grid-cols-4 items-center text-center space-y-4">
						<img
							className="rounded-3xl max-w-[80px] lg:w-[153px] "
							src={logo}
							alt="Logo Doce e Chocolate"
						/>

						<h1 className="text-6xl lg:text-5xl col-span-3 font-cursivo">
							Doce e Chocolate
						</h1>
					</div>

					<div className="space-y-6">
						<Formulario onSubmit={handleSubmit(onSubmit)}>
							<div className="space-y-2 pt-5">
								<label
									htmlFor="email"
									className="text-foreground font-medium"
								>
									E-mail
								</label>
								<div>
									<Input
										type="email"
										name="email"
										placeholder="seu@email.com"
										error={errors.email?.message}
										register={register}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="password"
									className="text-foreground font-medium"
								>
									Senha
								</label>
								<div className="relative">
									<Input
										type={visualizaSenha ? "text" : "password"}
										name="password"
										placeholder="••••••••"
										error={errors.password?.message}
										register={register}
									/>
									<button
										type="button"
										className="absolute top-4 right-5"
										onClick={() => {
											SetVisualizaSenha(!visualizaSenha);
										}}
									>
										{visualizaSenha ? (
											<FaRegEye size={20} />
										) : (
											<FaRegEyeSlash size={20} />
										)}
									</button>
								</div>
							</div>

							<div className="flex items-center justify-between text-sm">
								<label className="flex items-center space-x-2 cursor-pointer">
									<input
										type="checkbox"
										className="rounded border-border accent-primary"
									/>
									<span className="text-muted-foreground">
										Lembrar de mim
									</span>
								</label>
								<a
									href="#"
									className="text-primary hover:underline font-medium"
								>
									Esqueceu a senha?
								</a>
							</div>
							<Button
								type="submit"
								size="lg"
								variant="default"
								className="w-full h-12 text-lg"
							>
								Acessar
							</Button>
						</Formulario>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t border-border" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
