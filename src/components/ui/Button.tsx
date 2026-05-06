import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "neon";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider backdrop-blur-md",
          {
            "bg-[#00f3ff]/20 hover:bg-[#00f3ff]/30 text-white border border-[#00f3ff]/50 shadow-[0_0_15px_rgba(0,243,255,0.2)]": variant === "default",
            "border border-white/10 bg-white/5 hover:bg-white/10 text-white": variant === "outline",
            "hover:bg-white/10 text-white/70 hover:text-white": variant === "ghost",
            "bg-white text-black font-black italic shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 border-0": variant === "neon",
            "h-10 px-4 py-2 rounded-full": size === "default",
            "h-8 rounded-full px-3 text-[10px]": size === "sm",
            "h-12 rounded-xl px-8 text-lg font-bold": size === "lg",
            "h-10 w-10 rounded-xl": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
