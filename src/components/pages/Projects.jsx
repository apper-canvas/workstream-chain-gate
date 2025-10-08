import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ProjectCard from "@/components/organisms/ProjectCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import CreateProjectModal from "@/components/organisms/CreateProjectModal";
import { projectService } from "@/services/api/projectService";
import { taskService } from "@/services/api/taskService";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [projectsData, tasksData] = await Promise.all([
        projectService.getAll(),
        taskService.getAll()
      ]);
      setProjects(projectsData);
      setTasks(tasksData);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const getTaskCountByProject = (projectId) => {
    const projectTasks = tasks.filter(t => t.projectId === projectId);
    return {
      todo: projectTasks.filter(t => t.status === "todo").length,
      "in-progress": projectTasks.filter(t => t.status === "in-progress").length,
      done: projectTasks.filter(t => t.status === "done").length
    };
  };

  const filteredProjects = statusFilter === "all"
    ? projects
    : projects.filter(p => p.status === statusFilter);

  if (loading) return <Loading type="card" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Projects</h1>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          New Project
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: "all", label: "All Projects" },
            { value: "planning", label: "Planning" },
            { value: "active", label: "Active" },
            { value: "on-hold", label: "On Hold" },
            { value: "completed", label: "Completed" }
          ]}
          className="w-full sm:w-48"
        />

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "grid"
                ? "bg-primary text-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <ApperIcon name="LayoutGrid" className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "list"
                ? "bg-primary text-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <ApperIcon name="List" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <Empty
          icon="FolderKanban"
          title="No projects found"
          message="Create your first project to get started"
          actionLabel="Create Project"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className={viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
        }>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.Id}
              project={project}
              taskCount={getTaskCountByProject(project.Id)}
            />
          ))}
        </div>
      )}

      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={loadData}
      />
    </div>
  );
};

export default Projects;