"use client";

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
    value: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
    isOpen?: boolean;
    onClick?: () => void;
    className?: string;
}

export function AccordionItem({ value, trigger, children, isOpen, onClick, className }: AccordionItemProps) {
    return (
        <div className={cn("border-b", className)}>
            <button
                type="button"
                onClick={onClick}
                className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline w-full text-left"
                aria-expanded={isOpen}
            >
                {trigger}
                <ChevronDown
                    className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200 text-gray-500",
                        isOpen && "rotate-180"
                    )}
                />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden text-sm transition-all"
                    >
                        <div className="pb-4 pt-0 text-gray-600">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface AccordionProps {
    type?: 'single' | 'multiple';
    defaultValue?: string | string[];
    children: React.ReactNode;
    className?: string;
}

export function Accordion({ type = 'single', defaultValue, children, className }: AccordionProps) {
    const [openItems, setOpenItems] = React.useState<string[]>(
        Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
    );

    const handleItemClick = (value: string) => {
        if (type === 'multiple') {
            setOpenItems(prev =>
                prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]
            );
        } else {
            setOpenItems(prev => prev.includes(value) ? [] : [value]);
        }
    };

    return (
        <div className={className}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        // @ts-ignore
                        isOpen: openItems.includes(child.props.value),
                        // @ts-ignore
                        onClick: () => handleItemClick(child.props.value),
                    });
                }
                return child;
            })}
        </div>
    );
}
