import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  label,
  error,
  rows = 4,
  className,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-md text-gray-900 placeholder:text-gray-400 resize-none",
          "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200",
          "disabled:bg-gray-50 disabled:cursor-not-allowed",
          error && "border-error focus:border-error focus:ring-error/20",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;