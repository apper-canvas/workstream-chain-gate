import React, { useState, useEffect } from "react";
import Modal from "@/components/atoms/Modal";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import { taskService } from "@/services/api/taskService";
import { teamService } from "@/services/api/teamService";
import { toast } from "react-toastify";

const CreateTaskModal = ({ isOpen, onClose, onSuccess, projectId }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    assigneeId: "",
    dueDate: ""
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadTeamMembers();
    }
  }, [isOpen]);

  const loadTeamMembers = async () => {
    try {
      const data = await teamService.getAll();
      setTeamMembers(data);
    } catch (error) {
      console.error("Failed to load team members:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await taskService.create({
        ...formData,
        projectId: parseInt(projectId),
        assigneeId: formData.assigneeId ? parseInt(formData.assigneeId) : null
      });
      toast.success("Task created successfully!");
      onSuccess();
      onClose();
      setFormData({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        assigneeId: "",
        dueDate: ""
      });
    } catch (error) {
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter task title"
          required
        />

        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the task..."
          rows={3}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: "todo", label: "To Do" },
              { value: "in-progress", label: "In Progress" },
              { value: "done", label: "Done" }
            ]}
          />

          <Select
            label="Priority"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" }
            ]}
          />
        </div>

        <Select
          label="Assignee"
          value={formData.assigneeId}
          onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
          options={[
            { value: "", label: "Unassigned" },
            ...teamMembers.map(member => ({
              value: member.Id.toString(),
              label: member.name
            }))
          ]}
        />

        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          required
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;