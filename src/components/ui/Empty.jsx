import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  icon = "FolderOpen",
  title = "No items found", 
  message = "Get started by creating your first item",
  actionLabel,
  onAction 
}) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mb-4">
          <ApperIcon name={icon} className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-secondary mb-6">{message}</p>
        {actionLabel && onAction && (
          <Button onClick={onAction} variant="primary">
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Empty;