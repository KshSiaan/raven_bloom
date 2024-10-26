"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, CreditCard, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { icon: ShoppingCart, text: "Cart" },
  { icon: CreditCard, text: "Payment" },
  { icon: Check, text: "Confirmation" },
];

type StepperProps = {
  currentStep?: number;
  className?: string;
};

export default function Stepper({ currentStep = 0, className }: StepperProps) {
  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6", className)}>
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center relative group"
          >
            <motion.div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <step.icon size={24} />
            </motion.div>

            <motion.p
              className={cn(
                "mt-2 text-sm",
                index === currentStep
                  ? "text-foreground"
                  : "text-muted-foreground opacity-0 group-hover:opacity-100"
              )}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: index === currentStep ? 1 : 0 }}
              transition={{ delay: index * 0.2 + 0.3 }}
            >
              {step.text}
            </motion.p>
          </div>
        ))}
      </div>
    </div>
  );
}
