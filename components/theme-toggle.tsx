"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="relative h-9 w-9 rounded-full glass-card hover:glass-hover transition-all duration-300"
        disabled
      >
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative h-10 w-20 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-all duration-300 flex items-center justify-between px-2 border border-emerald-200/40 dark:border-emerald-800/40 hover:border-emerald-400 dark:hover:border-emerald-600"
    >
      <Sun className="h-4 w-4 transition-all text-amber-500" />
      <Moon className="h-4 w-4 transition-all text-blue-400" />
      <span className="absolute left-0.5 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-white dark:bg-slate-800 rounded-full transition-all duration-300 shadow-md"></span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
