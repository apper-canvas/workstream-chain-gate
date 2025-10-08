import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { teamService } from "@/services/api/teamService";
import { taskService } from "@/services/api/taskService";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [teamData, tasksData] = await Promise.all([
        teamService.getAll(),
        taskService.getAll()
      ]);
      setTeamMembers(teamData);
      setTasks(tasksData);
    } catch (err) {
      setError("Failed to load team data");
    } finally {
      setLoading(false);
    }
  };

  const getTasksForMember = (memberId) => {
    const memberTasks = tasks.filter(t => t.assigneeId === memberId);
    return {
      total: memberTasks.length,
      inProgress: memberTasks.filter(t => t.status === "in-progress").length,
      completed: memberTasks.filter(t => t.status === "done").length
    };
  };

  if (loading) return <Loading type="list" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  if (teamMembers.length === 0) {
    return (
      <Empty
        icon="Users"
        title="No team members"
        message="Add team members to start collaborating"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Team</h1>
          <p className="text-secondary">Manage your team and track their work</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teamMembers.map((member) => {
          const memberTasks = getTasksForMember(member.Id);
          const workload = memberTasks.total > 0
            ? Math.round((memberTasks.inProgress / memberTasks.total) * 100)
            : 0;

          return (
            <Card key={member.Id} className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar src={member.avatar} name={member.name} size="xl" />

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-secondary mb-3">{member.role}</p>

                  <div className="flex items-center space-x-2 mb-4">
                    <ApperIcon name="Mail" className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-secondary">{member.email}</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-secondary">Current Workload</span>
                        <span className="font-semibold text-primary">{workload}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            workload > 75
                              ? "bg-error"
                              : workload > 50
                              ? "bg-warning"
                              : "bg-success"
                          }`}
                          style={{ width: `${workload}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Badge variant="default">{memberTasks.total}</Badge>
                        <span className="text-secondary">Total</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Badge variant="info">{memberTasks.inProgress}</Badge>
                        <span className="text-secondary">Active</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Badge variant="success">{memberTasks.completed}</Badge>
                        <span className="text-secondary">Done</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Team;