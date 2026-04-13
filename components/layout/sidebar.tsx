import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { SidebarPanel } from "@/components/layout/sidebar-panel";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const links = [
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/expenses", label: "Add Expense" },
	{ href: "/history", label: "Expense History" },
	{ href: "/budget", label: "Budget" },
	{ href: "/data", label: "Data Management" },
];

export const Sidebar = async () => {
	const session = await getServerSession(authOptions);

	return (
		<div className="flex flex-col h-full bg-white dark:bg-slate-950/50 backdrop-blur-xl border-r border-slate-200 dark:border-white/5">
			<div className="p-6">
				<h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
					Expense Tracker
				</h1>
			</div>

			<div className="flex-1">
				<SidebarPanel
					links={links}
					session={{
						name: session?.user?.name ?? "Guest",
						email: session?.user?.email ?? "",
					}}
				/>
			</div>
		</div>
	);
};
