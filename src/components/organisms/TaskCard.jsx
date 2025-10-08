import React from "react";
import { format } from "date-fns";
import Card from "@/components/atoms/Card";
import Avatar from "@/components/atoms/Avatar";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import ApperIcon from "@/components/ApperIcon";

const TaskCard = ({ task, assignee, onClick, draggable, onDragStart, onDragEnd }) => {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "done";

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
      className={`p-4 border-l-4 ${priorityColors[task.priority]} cursor-move`}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1">
          {task.title}
        </h4>
        <PriorityBadge priority={task.priority} />
      </div>

      {task.description && (
        <p className="text-xs text-secondary line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        {assignee && (
          <Avatar
            src={assignee.avatar}
            name={assignee.name}
            size="sm"
          />
        )}
        <div className={`flex items-center text-xs ${isOverdue ? "text-error font-semibold" : "text-secondary"}`}>
          <ApperIcon name="Calendar" className="w-3.5 h-3.5 mr-1" />
          <span>{format(new Date(task.dueDate), "MMM dd")}</span>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;