"use client";

import { CheckUser, HashAndStore } from "@/logic/server_actions/Login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
	const [loginType, setLoginType] = useState("Login");
	const router = useRouter();

	async function HandleSubmit(e: any) {
		e.preventDefault();
		const form: HTMLFormElement = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		const plainPass = formJson.password.toString();
		const email = formJson.email.toString();
		let res = null

		if (loginType == "Register") {
			const username = formJson.username.toString();
			const details = { username, email, plainPass };
			res = await HashAndStore(details);
			console.log(res);


		} else {
			res = await CheckUser(email, plainPass);
			console.log(res);
			if (res.status == "successful") {
				router.push("/home");
			}
		}

		if (res.status == "failed") {
			toast.error(String(res.error), {
				position: "bottom-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	}
	return (
		<div className="justify-center items-center flex grow flex-col gap-8">
			<ToastContainer />
			<form
				method="post"
				onSubmit={HandleSubmit}
				className="justify-center items-center flex w-fit flex-col gap-8"
			>
				<h1 className=" font-bold text-3xl tracking-wider text-accent self-start">
					{loginType.toUpperCase()}
				</h1>
				<div className="flex flex-col gap-2">
					<div className="text-lg font-semibold ">Enter your email</div>
					<input
						name="email"
						className=" w-[400px] border-2 border-slate-300 rounded-sm p-2"
						placeholder="enter your email"
					/>
				</div>
				{loginType == "Register" && (
					<div className="flex flex-col gap-2">
						<div className="text-lg font-semibold ">Enter your username</div>
						<input
							name="username"
							className=" w-[400px] border-2 border-slate-300 rounded-sm p-2"
							placeholder="enter your username"
						/>
					</div>
				)}
				<div className="flex flex-col gap-2">
					<div className="text-lg font-semibold ">Enter your password</div>
					<input
						name="password"
						className=" w-[400px] border-2 border-slate-300 rounded-sm p-2"
						placeholder="enter your password"
						type="password"
					/>
				</div>
				<button
					className="w-full bg-secondary p-3 rounded-md"
					type="submit"
				>
					{loginType}
				</button>
			</form>
			{loginType == "Login" ? (
				<p>
					Dont&apos; have an account?{" "}
					<button
						type="button"
						onClick={() => setLoginType("Register")}
						className="font-bold text-accent"
					>
						Register
					</button>
				</p>
			) : (
				<p>
					Have an account?{" "}
					<button
						onClick={() => setLoginType("Login")}
						className="font-bold text-accent"
					>
						Login
					</button>
				</p>
			)}
		</div>
	);
}

export default LoginForm;
