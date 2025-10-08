import React from "react";
import { cn } from "@/utils/cn";

const Card = ({ children, className, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-card transition-all duration-200",
        hover && "hover:shadow-card-hover hover:-translate-y-1 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;