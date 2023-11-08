import Image from "next/image";
import Headphone from "../public/images/headphone.svg";

export default function Home() {
	return (
		<div className=" bg-background h-screen flex">
			<div className="h-full w-[60%] bg-primary flex justify-center items-center flex-col gap-8">
				<Image alt="headphone" src={Headphone} className="w-48 h-48" />
				<h1 className=" font-bold text-3xl tracking-wider text-accent">
					SOUND SHUFFLE
				</h1>
			</div>
			<div className="justify-center items-center flex grow">
				<div className="justify-center items-center flex w-fit flex-col gap-8">
					<h1 className=" font-bold text-3xl tracking-wider text-accent self-start">
						Login
					</h1>
					<div className="flex flex-col gap-2">
						<div className="text-lg ">Enter your email</div>
						<input
							className=" w-[400px] border-2 border-slate-300 rounded-sm p-2"
							placeholder="Enter Your Email"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<div className="text-lg ">Enter your password</div>
						<input
							className=" w-[400px] border-2 border-slate-300 rounded-sm p-2"
							placeholder="Enter Your Password"
							type="password"
						/>
					</div>
					<button className="w-full bg-secondary p-3 rounded-md">
						Log in
					</button>
				</div>
			</div>
		</div>
	);
}
