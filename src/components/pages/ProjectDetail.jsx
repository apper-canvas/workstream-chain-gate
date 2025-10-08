import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { projectService } from "@/services/api/projectService";
import { taskService } from "@/services/api/taskService";
import { teamService } from "@/services/api/teamService";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import StatusBadge from "@/components/molecules/StatusBadge";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import Projects from "@/components/pages/Projects";
import TaskCard from "@/components/organisms/TaskCard";
import CreateTaskModal from "@/components/organisms/CreateTaskModal";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [projectData, tasksData, teamData] = await Promise.all([
        projectService.getById(id),
        taskService.getByProjectId(id),
        teamService.getAll()
      ]);

      if (!projectData) {
        setError("Project not found");
        return;
      }

      setProject(projectData);
      setTasks(tasksData);
      setTeamMembers(teamData);
    } catch (err) {
      setError("Failed to load project details");
    } finally {
      setLoading(false);
    }
  };

  const getAssignee = (assigneeId) => {
return teamMembers.find(m => m.Id === assigneeId);
  };

  const tasksByStatus = {
    todo: tasks.filter(t => t.Status_c === "todo"),
    "in-progress": tasks.filter(t => t.Status_c === "in-progress"),
    done: tasks.filter(t => t.Status_c === "done")
  };

  const totalTasks = tasks.length;
  const completedTasks = tasksByStatus.done.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (loading) return <Loading type="board" />;
  if (error) return <Error message={error} onRetry={loadData} />;
  if (!project) return <Error message="Project not found" onRetry={() => navigate("/projects")} />;

return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-sm text-secondary">
        <button
          onClick={() => navigate("/projects")}
          className="hover:text-primary transition-colors"
        >
          Projects
        </button>
        <ApperIcon name="ChevronRight" className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{project.Name_c}</span>
      </div>

      <Card>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {project.Name_c}
              </h1>
              <StatusBadge status={project.Status_c} />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-secondary mb-1">Start Date</p>
                <p className="text-sm font-semibold text-gray-900">
                  {format(new Date(project.Start_Date_c), "MMM dd, yyyy")}
                </p>
              </div>
              <div>
                <p className="text-xs text-secondary mb-1">Due Date</p>
                <p className="text-sm font-semibold text-gray-900">
                  {format(new Date(project.Due_Date_c), "MMM dd, yyyy")}
                </p>
              </div>
              <div>
                <p className="text-xs text-secondary mb-1">Total Tasks</p>
                <p className="text-sm font-semibold text-gray-900">{totalTasks}</p>
              </div>
              <div>
                <p className="text-xs text-secondary mb-1">Completed</p>
                <p className="text-sm font-semibold text-gray-900">{completedTasks}</p>
              </div>
            </div>
          </div>
          <div className="lg:w-64">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-secondary">Overall Progress</span>
                  <span className="font-bold text-primary text-lg">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => setShowCreateTaskModal(true)}
                className="w-full"
              >
                <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {totalTasks === 0 ? (
        <Empty
          icon="CheckSquare"
          title="No tasks yet"
          message="Create your first task to start working on this project"
          actionLabel="Create Task"
          onAction={() => setShowCreateTaskModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {["todo", "in-progress", "done"].map((status) => (
            <div key={status} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 capitalize">
                  {status === "in-progress" ? "In Progress" : status}
                </h3>
                <span className="text-sm font-semibold text-secondary">
                  {tasksByStatus[status].length}
                </span>
              </div>

              <div className="space-y-3">
                {tasksByStatus[status].map((task) => (
                  <TaskCard
key={task.Id}
                    task={task}
                    assignee={getAssignee(task.Assigned_To_c?.Id)}
                    onClick={() => setSelectedTask(task)}
                  />
                ))}

                {tasksByStatus[status].length === 0 && (
                  <div className="text-center py-8 text-secondary text-sm">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateTaskModal
        isOpen={showCreateTaskModal}
        onClose={() => setShowCreateTaskModal(false)}
        onSuccess={loadData}
        projectId={id}
      />
    </div>
  );
};

export default ProjectDetail;