"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

export const AppShell = ({ 
  children, 
  sidebar 
}: { 
  children: ReactNode;
  sidebar: ReactNode;
}) => (
  <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-[280px] xl:w-[300px] lg:h-screen lg:sticky lg:top-0">
        {sidebar}
      </div>
      
      <main className="flex-1 min-w-0 p-4 md:p-8 lg:p-10 space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  </div>
);
