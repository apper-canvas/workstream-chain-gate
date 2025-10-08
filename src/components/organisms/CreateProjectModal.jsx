import React, { useState } from "react";
import { projectService } from "@/services/api/projectService";
import { toast } from "react-toastify";
import Modal from "@/components/atoms/Modal";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const CreateProjectModal = ({ isOpen, onClose, onSuccess }) => {
const [formData, setFormData] = useState({
    Name_c: "",
    Description_c: "",
    Status_c: "planning",
    Start_Date_c: "",
    Due_Date_c: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await projectService.create(formData);
      toast.success("Project created successfully!");
      onSuccess();
      onClose();
      setFormData({
        Name_c: "",
        Description_c: "",
        Status_c: "planning",
        Start_Date_c: "",
        Due_Date_c: ""
      });
    } catch (error) {
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
    <form onSubmit={handleSubmit} className="space-y-4">
        <Input
            label="Project Name"
            value={formData.Name_c}
            onChange={e => setFormData({
                ...formData,
                Name_c: e.target.value
            })}
            value={formData.Description_c}
            onChange={e => setFormData({
                ...formData,
                Description_c: e.target.value
            })}
            value={formData.Status_c}
            onChange={e => setFormData({
                ...formData,
                Status_c: e.target.value
            })}
            value={formData.Start_Date_c}
            onChange={e => setFormData({
                ...formData,
                Start_Date_c: e.target.value
            })}
            value={formData.Due_Date_c}
            onChange={e => setFormData({
                ...formData,
                Due_Date_c: e.target.value
            })}
            required />
        <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={onClose} type="button">Cancel
                          </Button>
            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Project"}
            </Button>
        </div>
    </form>
</Modal>
  );
};

export default CreateProjectModal;