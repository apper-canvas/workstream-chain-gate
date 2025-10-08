import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";
import Card from "@/components/atoms/Card";
import TaskCard from "@/components/organisms/TaskCard";
import CreateTaskModal from "@/components/organisms/CreateTaskModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { projectService } from "@/services/api/projectService";
import { taskService } from "@/services/api/taskService";
import { teamService } from "@/services/api/teamService";
import { toast } from "react-toastify";

const Board = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      loadTasksAndTeam();
    }
  }, [selectedProjectId]);

  const loadProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const projectsData = await projectService.getAll();
      setProjects(projectsData);
      if (projectsData.length > 0 && !selectedProjectId) {
        setSelectedProjectId(projectsData[0].Id.toString());
      }
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const loadTasksAndTeam = async () => {
    try {
      const [tasksData, teamData] = await Promise.all([
        taskService.getByProjectId(selectedProjectId),
        teamService.getAll()
      ]);
      setTasks(tasksData);
      setTeamMembers(teamData);
    } catch (err) {
      toast.error("Failed to load tasks");
    }
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDrop = async (newStatus) => {
    if (!draggedTask || draggedTask.status === newStatus) return;

    try {
await taskService.updateStatus(draggedTask.Id, newStatus);
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.Id === draggedTask.Id ? { ...t, Status_c: newStatus } : t
        )
      );
      toast.success("Task status updated!");
    } catch (err) {
      toast.error("Failed to update task status");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const getAssignee = (assigneeId) => {
    return teamMembers.find(m => m.Id === assigneeId);
  };

  const tasksByStatus = {
    todo: tasks.filter(t => t.Status_c === "todo"),
    "in-progress": tasks.filter(t => t.Status_c === "in-progress"),
    done: tasks.filter(t => t.Status_c === "done")
  };

  const columns = [
    { id: "todo", title: "To Do", color: "text-gray-600" },
    { id: "in-progress", title: "In Progress", color: "text-info" },
    { id: "done", title: "Done", color: "text-success" }
  ];

  if (loading) return <Loading type="board" />;
  if (error) return <Error message={error} onRetry={loadProjects} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Task Board</h1>
        {selectedProjectId && (
          <button
            onClick={() => setShowCreateTaskModal(true)}
            className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white font-medium rounded-md hover:shadow-lg transition-all duration-200"
          >
            <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
            Add Task
          </button>
        )}
      </div>

      {projects.length === 0 ? (
        <Empty
          icon="FolderKanban"
          title="No projects available"
          message="Create a project first to start managing tasks"
          actionLabel="Go to Projects"
          onAction={() => window.location.href = "/projects"}
        />
      ) : (
        <>
          <Card className="p-4">
            <Select
              label="Select Project"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              options={projects.map(p => ({
value: p.Id.toString(),
                label: p.Name_c
              }))}
            />
          </Card>

          {tasks.length === 0 ? (
            <Empty
              icon="CheckSquare"
              title="No tasks in this project"
              message="Start by creating your first task"
              actionLabel="Create Task"
              onAction={() => setShowCreateTaskModal(true)}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {columns.map((column) => (
                <div
                  key={column.id}
                  className="bg-gray-50 rounded-lg p-4"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(column.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-bold ${column.color} text-lg`}>
                      {column.title}
                    </h3>
                    <span className="text-sm font-semibold text-secondary bg-white px-2.5 py-1 rounded-full">
                      {tasksByStatus[column.id].length}
                    </span>
                  </div>

                  <div className="space-y-3 min-h-[200px]">
                    {tasksByStatus[column.id].map((task) => (
                      <TaskCard
key={task.Id}
                        task={task}
                        assignee={getAssignee(task.Assigned_To_c?.Id)}
                        draggable
                        onDragStart={() => handleDragStart(task)}
                        onDragEnd={handleDragEnd}
                      />
                    ))}

                    {tasksByStatus[column.id].length === 0 && (
                      <div className="flex items-center justify-center h-32 text-secondary text-sm border-2 border-dashed border-gray-300 rounded-lg">
                        Drop tasks here
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {selectedProjectId && (
        <CreateTaskModal
          isOpen={showCreateTaskModal}
          onClose={() => setShowCreateTaskModal(false)}
          onSuccess={loadTasksAndTeam}
          projectId={selectedProjectId}
        />
      )}
    </div>
  );
};

export default Board;