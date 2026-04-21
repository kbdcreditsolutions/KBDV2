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
    minLabel?: string;
    maxLabel?: string;
}

export const Slider: React.FC<SliderProps> = ({
    min,
    max,
    value,
    onChange,
    className,
    label,
    minLabel,
    maxLabel,
    ...props
}) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className={cn("w-full py-2", className)}>
            {label && (
                <div className="flex justify-between items-center mb-4 text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">
                    <span>{label}</span>
                    <span className="text-accent font-mono">{value.toLocaleString("en-IN")}</span>
                </div>
            )}
            
            <div className="relative h-12 w-full flex flex-col justify-center group">
                <div className="relative h-3 w-full flex items-center">
                    {/* Track Background */}
                    <div className="absolute top-1/2 left-0 w-full h-3 -translate-y-1/2 bg-[#0F172A] rounded-full overflow-hidden border border-white/5 box-border">
                        {/* Fill - Solid Brand Gold */}
                        <div
                            className="h-full bg-accent rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>

                    {/* Thumb (invisible native input for interaction) */}
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
                    <div 
                        className="absolute top-1/2 h-5 w-5 -translate-y-1/2 -ml-2.5 bg-white rounded-full shadow-[0_0_15px_rgba(242,181,68,0.5)] border-2 border-accent pointer-events-none z-20 transition-all duration-100 ease-out group-hover:scale-110"
                        style={{ left: `${percentage}%` }}
                    />
                </div>

                {/* Min/Max Labels */}
                <div className="flex justify-between mt-3 px-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        {minLabel || `Min: ${min}`}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        {maxLabel || `Max: ${max}`}
                    </span>
                </div>
            </div>
        </div>
    );
};
