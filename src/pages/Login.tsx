import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { auth } from "@/services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Formulario } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setpassword] = useState("");
	const [visualizaSenha, SetVisualizaSenha] = useState(false);
	const navigate = useNavigate();

	function handleLogin(data: Record<string, FormDataEntryValue>) {
		console.log("Login:", data )

		if(email === '' || password === ''){
			alert('Preencha todos os campos')
		}

		signInWithEmailAndPassword(auth, email, password)
		.then(() => {
			console.log("Logado com sucesso.")
			navigate("/", {replace: true})
		})
		.catch((error) => {
			console.log("Erro ao fazer o login:")
			console.log(error)
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
						<Formulario onSubmit={handleLogin}>
							<div className="space-y-2 pt-5">
								<label
									htmlFor="email"
									className="text-foreground font-medium"
								>
									E-mail
								</label>
								<div>
									<Input
										id="email"
										type="email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										placeholder="seu@email.com"
										required
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
										id="password"
										type={
											visualizaSenha ? "text" : "password"
										}
										placeholder="••••••••"
										value={password}
										onChange={(e) =>
											setpassword(e.target.value)
										}
										required
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
								Entrar
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
