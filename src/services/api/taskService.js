import { toast } from "react-toastify";
import React from "react";

const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = "task_c";

export const taskService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Title_c" } },
          { field: { Name: "Description_c" } },
          { field: { Name: "Status_c" } },
          { field: { Name: "Priority_c" } },
          { field: { Name: "Due_Date_c" } },
          { field: { Name: "Created_Date_c" } },
          { field: { Name: "Last_Modified_Date_c" } },
          { 
            field: { name: "project_c" }, 
            referenceField: { field: { Name: "Name_c" } } 
          },
          { 
            field: { name: "Assigned_To_c" }, 
            referenceField: { field: { Name: "Name_c" } } 
          }
        ],
        orderBy: [{ fieldName: "Id", sorttype: "DESC" }],
        pagingInfo: { limit: 1000, offset: 0 }
      };

      const response = await apperClient.fetchRecords(tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error?.response?.data?.message || error.message);
      toast.error("Failed to load tasks");
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Title_c" } },
          { field: { Name: "Description_c" } },
          { field: { Name: "Status_c" } },
          { field: { Name: "Priority_c" } },
          { field: { Name: "Due_Date_c" } },
          { field: { Name: "Created_Date_c" } },
          { field: { Name: "Last_Modified_Date_c" } },
          { 
            field: { name: "project_c" }, 
            referenceField: { field: { Name: "Name_c" } } 
          },
          { 
            field: { name: "Assigned_To_c" }, 
            referenceField: { field: { Name: "Name_c" } } 
          }
        ]
      };

      const response = await apperClient.getRecordById(tableName, parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error.message);
      toast.error("Failed to load task");
      return null;
    }
  },

  async getByProjectId(projectId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Title_c" } },
          { field: { Name: "Description_c" } },
          { field: { Name: "Status_c" } },
          { field: { Name: "Priority_c" } },
          { field: { Name: "Due_Date_c" } },
          { field: { Name: "Created_Date_c" } },
          { field: { Name: "Last_Modified_Date_c" } },
          { 
            field: { name: "project_c" }, 
            referenceField: { field: { Name: "Name_c" } } 
          },
          { 
            field: { name: "Assigned_To_c" }, 
            referenceField: { field: { Name: "Name_c" } } 
          }
        ],
        where: [
          {
            FieldName: "project_c",
            Operator: "EqualTo",
            Values: [parseInt(projectId)]
          }
        ],
        orderBy: [{ fieldName: "Id", sorttype: "DESC" }],
        pagingInfo: { limit: 1000, offset: 0 }
      };

      const response = await apperClient.fetchRecords(tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching project tasks:", error?.response?.data?.message || error.message);
      toast.error("Failed to load project tasks");
      return [];
    }
  },

  async create(taskData) {
    try {
      const payload = {
        records: [
          {
            Title_c: taskData.Title_c || taskData.title,
            Description_c: taskData.Description_c || taskData.description,
            Status_c: taskData.Status_c || taskData.status,
            Priority_c: taskData.Priority_c || taskData.priority,
            project_c: parseInt(taskData.project_c || taskData.projectId),
            Assigned_To_c: taskData.Assigned_To_c || taskData.assigneeId ? parseInt(taskData.Assigned_To_c || taskData.assigneeId) : null,
            Due_Date_c: taskData.Due_Date_c || taskData.dueDate
          }
        ]
      };

      const response = await apperClient.createRecord(tableName, payload);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} tasks: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error.message}`));
            }
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error creating task:", error?.response?.data?.message || error.message);
      toast.error("Failed to create task");
      return null;
    }
  },

  async update(id, taskData) {
    try {
      const payload = {
        records: [
          {
            Id: parseInt(id),
            ...(taskData.Title_c !== undefined && { Title_c: taskData.Title_c }),
            ...(taskData.title !== undefined && { Title_c: taskData.title }),
            ...(taskData.Description_c !== undefined && { Description_c: taskData.Description_c }),
            ...(taskData.description !== undefined && { Description_c: taskData.description }),
            ...(taskData.Status_c !== undefined && { Status_c: taskData.Status_c }),
            ...(taskData.status !== undefined && { Status_c: taskData.status }),
            ...(taskData.Priority_c !== undefined && { Priority_c: taskData.Priority_c }),
            ...(taskData.priority !== undefined && { Priority_c: taskData.priority }),
            ...(taskData.project_c !== undefined && { project_c: parseInt(taskData.project_c) }),
            ...(taskData.projectId !== undefined && { project_c: parseInt(taskData.projectId) }),
            ...((taskData.Assigned_To_c !== undefined || taskData.assigneeId !== undefined) && { 
              Assigned_To_c: taskData.Assigned_To_c || taskData.assigneeId ? parseInt(taskData.Assigned_To_c || taskData.assigneeId) : null 
            }),
            ...(taskData.Due_Date_c !== undefined && { Due_Date_c: taskData.Due_Date_c }),
            ...(taskData.dueDate !== undefined && { Due_Date_c: taskData.dueDate })
          }
        ]
      };

      const response = await apperClient.updateRecord(tableName, payload);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} tasks: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error.message}`));
            }
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error updating task:", error?.response?.data?.message || error.message);
      toast.error("Failed to update task");
      return null;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(tableName, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} tasks: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0;
      }

      return false;
    } catch (error) {
      console.error("Error deleting task:", error?.response?.data?.message || error.message);
      toast.error("Failed to delete task");
      return false;
    }
  },

async updateStatus(id, status) {
    return this.update(id, { Status_c: status });
  }
};