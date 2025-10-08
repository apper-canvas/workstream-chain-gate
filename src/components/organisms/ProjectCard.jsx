import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import StatusBadge from "@/components/molecules/StatusBadge";
import Card from "@/components/atoms/Card";

const ProjectCard = ({ project, taskCount }) => {
  const navigate = useNavigate();

  const completedTasks = taskCount?.done || 0;
  const totalTasks = (taskCount?.todo || 0) + (taskCount?.["in-progress"] || 0) + completedTasks;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card hover onClick={() => navigate(`/projects/${project.Id}`)} className="p-6">
    <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{project.Name_c}</h3>
        <StatusBadge status={project.Status_c} />
    </div>
    <p className="text-sm text-secondary line-clamp-2 mb-6">
        {project.Description_c}
    </p>
    <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                <span className="text-secondary">{taskCount.todo}To Do</span>
            </div>
            <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-info"></span>
                <span className="text-secondary">{taskCount["in-progress"]}In Progress</span>
            </div>
            <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span className="text-secondary">{taskCount.done}Done</span>
            </div>
        </div>
        <div className="flex items-center text-secondary">
            <ApperIcon name="Calendar" className="w-4 h-4 mr-1" />
            <span>{format(new Date(project.Due_Date_c), "MMM dd")}</span>
        </div>
    </div>
</Card>
  );
};

export default ProjectCard;