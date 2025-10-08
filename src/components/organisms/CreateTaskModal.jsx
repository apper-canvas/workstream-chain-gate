import React, { useEffect, useState } from "react";
import { taskService } from "@/services/api/taskService";
import { teamService } from "@/services/api/teamService";
import { toast } from "react-toastify";
import Modal from "@/components/atoms/Modal";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const CreateTaskModal = ({ isOpen, onClose, onSuccess, projectId }) => {
  const [formData, setFormData] = useState({
    Title_c: "",
    Description_c: "",
    Status_c: "todo",
    Priority_c: "medium",
    Assigned_To_c: "",
    Due_Date_c: ""
  });
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
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
        project_c: parseInt(projectId),
        Assigned_To_c: formData.Assigned_To_c ? parseInt(formData.Assigned_To_c) : null
      });
      toast.success("Task created successfully!");
      onSuccess();
      onClose();
      setFormData({
        Title_c: "",
        Description_c: "",
        Status_c: "todo",
        Priority_c: "medium",
        Assigned_To_c: "",
        Due_Date_c: ""
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
          value={formData.Title_c}
          onChange={(e) => setFormData({ ...formData, Title_c: e.target.value })}
          required
        />

        <Textarea
          label="Description"
          value={formData.Description_c}
          onChange={(e) => setFormData({ ...formData, Description_c: e.target.value })}
          rows={4}
        />

        <Select
          label="Status"
          value={formData.Status_c}
          onChange={(e) => setFormData({ ...formData, Status_c: e.target.value })}
          options={[
            { value: "todo", label: "To Do" },
            { value: "in_progress", label: "In Progress" },
            { value: "done", label: "Done" }
          ]}
        />

        <Select
          label="Priority"
          value={formData.Priority_c}
          onChange={(e) => setFormData({ ...formData, Priority_c: e.target.value })}
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" }
          ]}
        />

        <Select
          label="Assign To"
          value={formData.Assigned_To_c}
          onChange={(e) => setFormData({ ...formData, Assigned_To_c: e.target.value })}
          options={[
            { value: "", label: "Unassigned" },
            ...(teamMembers || []).map(member => ({
              value: member?.Id?.toString() || "",
              label: member?.Name_c || "Unknown"
            }))
          ]}
        />

        <Input
          type="date"
          label="Due Date"
          value={formData.Due_Date_c}
          onChange={(e) => setFormData({ ...formData, Due_Date_c: e.target.value })}
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