"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Menu,
	X,
	LayoutDashboard,
	ReceiptText,
	Wallet,
	Database,
	History,
	PlusCircle,
	LogOut,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { ThemeToggle } from "./theme-toggle";

type SidebarPanelProps = {
	links: { href: string; label: string }[];
	session: {
		name: string;
		email: string;
	};
};

const iconMap: Record<string, any> = {
	"/dashboard": LayoutDashboard,
	"/expenses": PlusCircle,
	"/history": History,
	"/budget": Wallet,
	"/data": Database,
};

export const SidebarPanel = ({ links, session }: SidebarPanelProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<>
			{/* Mobile Header Overlay */}
			<div className="flex items-center justify-between p-4 lg:hidden bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
				<h1 className="text-lg font-bold">CodeX</h1>
				<Button
					className="h-10 w-10 rounded-xl p-0"
					variant="ghost"
					onClick={() => setIsOpen((current) => !current)}
				>
					{isOpen ? <X size={20} /> : <Menu size={20} />}
				</Button>
			</div>

			<div
				className={cn(
					"flex flex-col h-full",
					isOpen
						? "fixed inset-0 z-40 bg-background lg:relative lg:bg-transparent"
						: "hidden lg:flex",
				)}
			>
				<div className="flex-1 px-4 py-6 space-y-2">
					{links.map((link) => {
						const Icon = iconMap[link.href] || LayoutDashboard;
						const isActive = pathname === link.href;

						return (
							<Link
								key={link.href}
								href={link.href}
								className={cn(
									"group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
									isActive
										? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
										: "text-muted-foreground hover:bg-secondary hover:text-foreground",
								)}
								onClick={() => setIsOpen(false)}
							>
								<Icon
									className={cn(
										"h-5 w-5 transition-transform group-hover:scale-110",
										isActive
											? "text-white"
											: "text-muted-foreground",
									)}
								/>
								{link.label}
								{isActive && (
									<motion.div
										layoutId="active-pill"
										className="absolute inset-0 rounded-xl bg-primary -z-10"
										transition={{
											type: "spring",
											bounce: 0.2,
											duration: 0.6,
										}}
									/>
								)}
							</Link>
						);
					})}
				</div>
				<div className="p-6 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
					<ThemeToggle />
				</div>

				<div className="p-4 mt-auto">
					<div className="rounded-2xl bg-muted/30 p-4 border border-border">
						<div className="flex items-center gap-3">
							<div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white font-bold">
								{session.name.charAt(0)}
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-semibold truncate">
									{session.name}
								</p>
								<p className="text-xs text-muted-foreground truncate">
									{session.email}
								</p>
							</div>
						</div>
						<LogoutButton className="mt-4 w-full justify-start gap-2 h-10 border-none bg-background/50 hover:bg-background text-muted-foreground hover:text-destructive transition-colors">
							<LogOut size={16} />
							<span>Log out</span>
						</LogoutButton>
					</div>
				</div>
			</div>
		</>
	);
};
