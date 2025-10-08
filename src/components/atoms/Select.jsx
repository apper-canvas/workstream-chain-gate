import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ 
  label,
  error,
  options = [],
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
      <select
        ref={ref}
        className={cn(
          "w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-md text-gray-900",
          "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200",
          "disabled:bg-gray-50 disabled:cursor-not-allowed",
          error && "border-error focus:border-error focus:ring-error/20",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1.5 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;