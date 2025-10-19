import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"

import { auth } from "@/services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useState } from "react";

const schema = z.object({
	email: z.string().email("Digite um e-mail válido"),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
	const navigate = useNavigate()
	const [ visualizaSenha, setVisualizaSenha ] = useState(false)
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: zodResolver(schema),
		mode:"onChange"
	})
	
	function onSubmit(data: FormData){
		signInWithEmailAndPassword(auth, data.email, data.password)
		.then((user) => {
			navigate("/", {replace: true})
			console.log(user)
			
		})
		.catch(err => {
			console.log("Erro ao logar")
			console.log(err)
		})
	}

	return (
		<div className="min-h-screen flex items-center justify-center relative overflow-hidden p-6">
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
						<form onSubmit={handleSubmit(onSubmit)}>
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
										placeholder="seu@email.com"
										error={errors.email?.message}
										register={register}
										name="email"
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
										placeholder="••••••••"
										error={errors.password?.message}
										register={register}
										name="password"
									/>
									<button
										type="button"
										className="absolute top-4 right-5"
										onClick={() => setVisualizaSenha(!visualizaSenha)}
									>
										{visualizaSenha ? (
											<FaRegEye size={20} />
										) : (
											<FaRegEyeSlash size={20} />
										)}
									</button>
								</div>
							</div>

							<div className="flex items-center justify-between text-sm py-5">
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
								Entrar
							</Button>
						</form>

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
