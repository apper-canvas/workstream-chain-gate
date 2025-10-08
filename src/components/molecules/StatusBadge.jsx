import React from "react";
import Badge from "@/components/atoms/Badge";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    planning: { variant: "info", label: "Planning" },
    active: { variant: "success", label: "Active" },
    "on-hold": { variant: "warning", label: "On Hold" },
    completed: { variant: "default", label: "Completed" },
    todo: { variant: "default", label: "To Do" },
    "in-progress": { variant: "info", label: "In Progress" },
    done: { variant: "success", label: "Done" }
  };

  const config = statusConfig[status] || { variant: "default", label: status };

  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default StatusBadge;