"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    min: number;
    max: number;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    label?: string;
    suffix?: string;
}

export const Slider: React.FC<SliderProps> = ({
    min,
    max,
    value,
    onChange,
    className,
    label,
    ...props
}) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className={cn("w-full py-4", className)}>
            {label && (
                <div className="flex justify-between items-center mb-3 text-xs font-bold tracking-[0.2em] text-[#64748B] uppercase">
                    <span>{label}</span>
                    {/* <span className="text-white font-mono">{value}{suffix}</span> */}
                </div>
            )}
            <div className="relative h-6 w-full flex items-center">
                {/* Track Background */}
                <div className="absolute top-1/2 left-0 w-full h-3 -translate-y-1/2 bg-[#0F172A] rounded-full overflow-hidden border border-white/5 box-border">
                    {/* Fill Gradient - Orange/Gold */}
                    <div
                        className="h-full bg-[linear-gradient(90deg,#FFC857_0%,#FF9F1C_100%)] rounded-full transition-all duration-100 ease-out box-border"
                        style={{ width: `${percentage}%` }}
                    />
                    {/* Glow effect on fill */}
                    <div
                        className="absolute top-0 left-0 h-full w-full opacity-50 blur-[4px] pointer-events-none"
                        style={{
                            width: `${percentage}%`,
                            background: 'linear-gradient(90deg,#FFC857_0%,#FF9F1C_100%)'
                        }}
                    />
                </div>

                {/* Thumb (invisible native input) */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={onChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                    {...props}
                />

                {/* Custom Thumb Visual (follows position) */}
                {/* <div 
            className="absolute top-1/2 h-6 w-6 -translate-y-1/2 -ml-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] pointer-events-none z-20 transition-all duration-100 ease-out"
            style={{ left: `${percentage}%` }}
        /> */}
            </div>
        </div>
    );
};
