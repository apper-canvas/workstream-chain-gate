import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import Avatar from "@/components/atoms/Avatar";
import Card from "@/components/atoms/Card";

const TaskCard = ({ task, assignee, onClick, draggable, onDragStart, onDragEnd }) => {
  const isOverdue = new Date(task.Due_Date_c) < new Date() && task.Status_c !== "done";

  const priorityColors = {
    high: "border-l-error",
    medium: "border-l-warning",
    low: "border-l-info"
  };

  return (
    <Card
      hover
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`p-4 border-l-4 ${priorityColors[task.Priority_c]} cursor-move`}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1">
          {task.Title_c}
        </h4>
        <PriorityBadge priority={task.Priority_c} />
      </div>

      {task.Description_c && (
        <p className="text-xs text-secondary line-clamp-2 mb-3">
          {task.Description_c}
        </p>
      )}

<div className="flex items-center justify-between">
        {assignee && (
          <Avatar
            src={assignee.Avatar_c}
            name={assignee.Name_c}
            size="sm"
          />
        )}
        <div className={`flex items-center text-xs ${isOverdue ? "text-error font-semibold" : "text-secondary"}`}>
          <ApperIcon name="Calendar" className="w-3.5 h-3.5 mr-1" />
          <span>{format(new Date(task.Due_Date_c), "MMM dd")}</span>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;