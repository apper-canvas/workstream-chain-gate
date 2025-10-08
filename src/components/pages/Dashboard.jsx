import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ProjectCard from "@/components/organisms/ProjectCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import CreateProjectModal from "@/components/organisms/CreateProjectModal";
import { projectService } from "@/services/api/projectService";
import { taskService } from "@/services/api/taskService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

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
      setError("Failed to load dashboard data");
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

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: "FolderKanban",
      color: "from-primary to-primary-dark",
      bgColor: "from-primary/10 to-primary-dark/10"
    },
    {
      label: "Active Tasks",
      value: tasks.filter(t => t.status !== "done").length,
      icon: "CheckSquare",
      color: "from-accent to-accent-dark",
      bgColor: "from-accent/10 to-accent-dark/10"
    },
    {
      label: "Completed",
      value: tasks.filter(t => t.status === "done").length,
      icon: "CheckCircle2",
      color: "from-success to-green-600",
      bgColor: "from-success/10 to-green-600/10"
    },
    {
      label: "Team Members",
      value: 5,
      icon: "Users",
      color: "from-info to-blue-600",
      bgColor: "from-info/10 to-blue-600/10"
    }
  ];

  const activeProjects = projects.filter(p => p.status === "active");

  if (loading) return <Loading type="card" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-secondary">Here's what's happening with your projects today</p>
        </div>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary mb-1">{stat.label}</p>
                <p className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent" style={{
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  {stat.value}
                </p>
              </div>
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${stat.bgColor} flex items-center justify-center`}>
                <ApperIcon name={stat.icon} className={`w-7 h-7 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Active Projects</h2>
          <Button variant="ghost" onClick={() => navigate("/projects")}>
            View All
            <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {activeProjects.length === 0 ? (
          <Empty
            icon="FolderKanban"
            title="No active projects"
            message="Create your first project to get started"
            actionLabel="Create Project"
            onAction={() => setShowCreateModal(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProjects.map((project) => (
              <ProjectCard
                key={project.Id}
                project={project}
                taskCount={getTaskCountByProject(project.Id)}
              />
            ))}
          </div>
        )}
      </div>

      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={loadData}
      />
    </div>
  );
};

export default Dashboard;