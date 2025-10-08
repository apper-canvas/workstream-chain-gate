import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Card from "@/components/atoms/Card";
import StatusBadge from "@/components/molecules/StatusBadge";
import ApperIcon from "@/components/ApperIcon";

const ProjectCard = ({ project, taskCount }) => {
  const navigate = useNavigate();

  const completedTasks = taskCount?.done || 0;
  const totalTasks = (taskCount?.todo || 0) + (taskCount?.["in-progress"] || 0) + completedTasks;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card 
      hover 
      onClick={() => navigate(`/projects/${project.Id}`)}
      className="p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{project.name}</h3>
        <StatusBadge status={project.status} />
      </div>

      <p className="text-sm text-secondary line-clamp-2 mb-4">
        {project.description}
      </p>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-secondary">Progress</span>
            <span className="font-semibold text-primary">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-secondary">
              <ApperIcon name="CheckSquare" className="w-4 h-4 mr-1.5" />
              <span>{completedTasks}/{totalTasks} tasks</span>
            </div>
          </div>
          <div className="flex items-center text-secondary">
            <ApperIcon name="Calendar" className="w-4 h-4 mr-1.5" />
            <span>{format(new Date(project.dueDate), "MMM dd")}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;