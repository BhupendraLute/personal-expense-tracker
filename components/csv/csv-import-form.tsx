"use client";

import { FormEvent, useState, useRef, DragEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud, FileText, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export const CsvImportForm = () => {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleDrop = (e: DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		const droppedFile = e.dataTransfer.files[0];
		if (
			droppedFile &&
			(droppedFile.type === "text/csv" ||
				droppedFile.name.endsWith(".csv"))
		) {
			setFile(droppedFile);
			setMessage("");
		} else {
			setMessage("Please drop a valid CSV file.");
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			setMessage("");
		}
	};

	const clearFile = () => {
		setFile(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!file) return;

		setLoading(true);
		setMessage("");

		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await fetch("/api/import", {
				method: "POST",
				body: formData,
			});

			const result = await response.json();
			setLoading(false);

			if (!result.success) {
				setMessage(result.error);
				return;
			}

			setMessage(
				result.data.errors.length
					? `Imported ${result.data.inserted} rows with ${result.data.errors.length} errors`
					: `Imported ${result.data.inserted} rows. Success!`,
			);

			setTimeout(() => {
				window.location.reload();
			}, 1500);
		} catch (err) {
			setLoading(false);
			setMessage("An unexpected error occurred during import.");
		}
	};

	return (
		<div className="space-y-4">
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
					accept=".csv,text/csv"
					className="hidden"
					id="csv-upload"
				/>

				<motion.div
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					onClick={() => fileInputRef.current?.click()}
					animate={{
						scale: isDragging ? 1.02 : 1,
					}}
					className={cn(
						"relative group cursor-pointer border-2 border-dashed rounded-2xl p-8 transition-all duration-300 flex flex-col items-center justify-center text-center gap-4",
						isDragging
							? "border-primary bg-primary/10 shadow-lg shadow-primary/5"
							: "border-border hover:border-primary/50 hover:bg-muted/30",
					)}
				>
					<AnimatePresence mode="wait">
						{!file ? (
							<motion.div
								key="empty"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95 }}
								className="flex flex-col items-center gap-3"
							>
								<div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
									<UploadCloud size={28} />
								</div>
								<div>
									<p className="font-semibold text-lg">
										Click to upload or drag & drop
									</p>
									<p className="text-sm text-muted-foreground mt-1">
										Only CSV files are supported
									</p>
								</div>
							</motion.div>
						) : (
							<motion.div
								key="selected"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								className="flex flex-col items-center gap-3"
							>
								<div className="h-14 w-14 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500">
									<FileText size={28} />
								</div>
								<div className="flex flex-col items-center gap-1">
									<p className="font-semibold text-lg truncate max-w-[250px]">
										{file.name}
									</p>
									<p className="text-xs text-muted-foreground">
										{(file.size / 1024).toFixed(1)} KB
									</p>
								</div>
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										clearFile();
									}}
									className="mt-2 text-xs font-bold text-destructive hover:underline flex items-center gap-1"
								>
									<X size={12} /> Remove file
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>

				<div className="flex items-center justify-end">
					<Button
						type="submit"
						variant="primary"
						disabled={loading || !file}
						className="w-full md:w-auto h-12 px-8 py-3 rounded-xl gap-2 text-base"
					>
						{loading ? (
							<div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
						) : (
							<CheckCircle2 size={20} />
						)}
						{loading ? "Importing Data..." : "Import CSV"}
					</Button>
				</div>
			</form>

			{message && (
				<motion.div
					initial={{ opacity: 0, y: 5 }}
					animate={{ opacity: 1, y: 0 }}
					className={cn(
						"p-4 rounded-xl text-sm font-medium flex items-center gap-3",
						message.includes("Success") ||
							message.includes("Imported")
							? "bg-teal-500/10 text-teal-500 border border-teal-500/20"
							: "bg-destructive/10 text-destructive border border-destructive/20",
					)}
				>
					{message.includes("Success") ||
					message.includes("Imported") ? (
						<CheckCircle2 size={18} />
					) : (
						<X size={18} />
					)}
					{message}
				</motion.div>
			)}
		</div>
	);
};
