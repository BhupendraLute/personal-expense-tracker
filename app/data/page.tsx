import { AppShell } from "@/components/layout/app-shell";
import { Sidebar } from "@/components/layout/sidebar";
import { CsvImportForm } from "@/components/csv/csv-import-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Download, FileJson, Share2 } from "lucide-react";
import Link from "next/link";

export default function DataManagementPage() {
	return (
		<AppShell sidebar={<Sidebar />}>
			<div className="mb-10">
				<h1 className="text-4xl font-bold tracking-tight">
					Data Management
				</h1>
				<p className="text-muted-foreground mt-2 text-lg">
					Import, export, and manage your financial records in bulk.
				</p>
			</div>

			<div className="grid gap-8 lg:grid-cols-2">
				<Card className="flex flex-col h-full">
					<div className="flex items-center gap-3 mb-6">
						<div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
							<Share2 size={24} />
						</div>
						<h2 className="text-2xl font-bold">Import Records</h2>
					</div>

					<p className="text-muted-foreground mb-8" style={{ wordSpacing: "0.15em" }}>
						Upload a CSV file to bulk import your historical
						expenses. Ensure your file follows our standard format
						for the best results.
					</p>

					<div className="flex-1">
						<CsvImportForm />
					</div>

					<div className="mt-8 pt-6 border-t border-border">
						<h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
							Required Format
						</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li className="flex items-center gap-2">
								<div className="h-1.5 w-1.5 rounded-full bg-primary" />
								Columns:{" "}
								<code className="bg-muted px-1 rounded">
									amount
								</code>
								,{" "}
								<code className="bg-muted px-1 rounded">
									category
								</code>
								,{" "}
								<code className="bg-muted px-1 rounded">
									date
								</code>
								,{" "}
								<code className="bg-muted px-1 rounded">
									note
								</code>
							</li>
							<li className="flex items-center gap-2">
								<div className="h-1.5 w-1.5 rounded-full bg-primary" />
								Date format:{" "}
								<code className="bg-muted px-1 rounded">
									YYYY-MM-DD
								</code>
							</li>
						</ul>
					</div>
				</Card>

				<section className="space-y-8">
					<Card>
						<div className="flex items-center gap-3 mb-6">
							<div className="h-10 w-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
								<Download size={24} />
							</div>
							<h2 className="text-2xl font-bold">Export Data</h2>
						</div>

						<p className="text-muted-foreground mb-8" style={{ wordSpacing: "0.15em" }}>
							Download your complete expense history as a single
							CSV file. Perfect for backups or analyzing your data
							in external spreadsheet tools.
						</p>

						<Link href="/api/export" download>
							<Button
								variant="accent"
								className="w-full h-14 text-lg gap-3"
							>
								<Download size={22} />
								Export CSV
							</Button>
						</Link>
					</Card>

					<Card className="bg-primary/5 border-primary/20">
						<div className="flex items-center gap-3 mb-4">
							<div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
								<FileJson size={18} />
							</div>
							<h3 className="font-bold">Database Health</h3>
						</div>
						<p className="text-sm text-muted-foreground leading-relaxed" style={{ wordSpacing: "0.15em" }}>
							Your financial data is encrypted and stored securely
							in our MongoDB clusters. We recommend exporting your
							data once a month for your own physical records.
						</p>
					</Card>
				</section>
			</div>
		</AppShell>
	);
}
