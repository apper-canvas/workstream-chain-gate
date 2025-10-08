import React from "react";
import Badge from "@/components/atoms/Badge";

const PriorityBadge = ({ priority }) => {
  const priorityConfig = {
    low: { variant: "info", label: "Low" },
    medium: { variant: "warning", label: "Medium" },
    high: { variant: "error", label: "High" }
  };

  const config = priorityConfig[priority] || { variant: "default", label: priority };

  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default PriorityBadge;