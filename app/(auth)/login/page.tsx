"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { AuthForm } from "@/components/auth/auth-form";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-6">
			{/* Background Cinematic Image */}
			<div className="absolute inset-0 z-0 opacity-50">
				<Image
					src="/login-bg.png"
					alt="Dashboard Background"
					fill
					className="object-cover blur-[2px]"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-transparent" />
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="relative z-10 w-full max-w-md"
			>
				<Card className="glass-dark border-white/10 p-8 shadow-2xl">
					<div className="mb-8 text-center">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.2, duration: 0.5 }}
							className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-8 w-8"
							>
								<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
							</svg>
						</motion.div>
						<h1 className="text-3xl font-bold tracking-tight text-white">
							Expense Tracker
						</h1>
						<p className="mt-2 text-sm text-slate-400">
							Track your journey to financial freedom
						</p>
					</div>

					<AuthForm />

					<p className="mt-8 text-center text-xs text-slate-500">
						By signing in, you agree to our Terms of Service and
						Privacy Policy.
					</p>
				</Card>
			</motion.div>
		</main>
	);
}
