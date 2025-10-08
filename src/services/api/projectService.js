import { toast } from "react-toastify";

const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = "project_c";

export const projectService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name_c" } },
          { field: { Name: "Description_c" } },
          { field: { Name: "Status_c" } },
          { field: { Name: "Start_Date_c" } },
          { field: { Name: "Due_Date_c" } },
          { field: { Name: "Created_Date_c" } },
          { field: { Name: "Last_Modified_Date_c" } }
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
      console.error("Error fetching projects:", error?.response?.data?.message || error.message);
      toast.error("Failed to load projects");
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name_c" } },
          { field: { Name: "Description_c" } },
          { field: { Name: "Status_c" } },
          { field: { Name: "Start_Date_c" } },
          { field: { Name: "Due_Date_c" } },
          { field: { Name: "Created_Date_c" } },
          { field: { Name: "Last_Modified_Date_c" } }
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
      console.error(`Error fetching project ${id}:`, error?.response?.data?.message || error.message);
      toast.error("Failed to load project");
      return null;
    }
  },

  async create(projectData) {
    try {
      const payload = {
        records: [
          {
            Name_c: projectData.Name_c || projectData.name,
            Description_c: projectData.Description_c || projectData.description,
            Status_c: projectData.Status_c || projectData.status,
            Start_Date_c: projectData.Start_Date_c || projectData.startDate,
            Due_Date_c: projectData.Due_Date_c || projectData.dueDate
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
          console.error(`Failed to create ${failed.length} projects: ${JSON.stringify(failed)}`);
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
      console.error("Error creating project:", error?.response?.data?.message || error.message);
      toast.error("Failed to create project");
      return null;
    }
  },

  async update(id, projectData) {
    try {
      const payload = {
        records: [
          {
            Id: parseInt(id),
            ...(projectData.Name_c !== undefined && { Name_c: projectData.Name_c }),
            ...(projectData.name !== undefined && { Name_c: projectData.name }),
            ...(projectData.Description_c !== undefined && { Description_c: projectData.Description_c }),
            ...(projectData.description !== undefined && { Description_c: projectData.description }),
            ...(projectData.Status_c !== undefined && { Status_c: projectData.Status_c }),
            ...(projectData.status !== undefined && { Status_c: projectData.status }),
            ...(projectData.Start_Date_c !== undefined && { Start_Date_c: projectData.Start_Date_c }),
            ...(projectData.startDate !== undefined && { Start_Date_c: projectData.startDate }),
            ...(projectData.Due_Date_c !== undefined && { Due_Date_c: projectData.Due_Date_c }),
            ...(projectData.dueDate !== undefined && { Due_Date_c: projectData.dueDate })
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
          console.error(`Failed to update ${failed.length} projects: ${JSON.stringify(failed)}`);
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
      console.error("Error updating project:", error?.response?.data?.message || error.message);
      toast.error("Failed to update project");
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
          console.error(`Failed to delete ${failed.length} projects: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0;
      }

      return false;
    } catch (error) {
      console.error("Error deleting project:", error?.response?.data?.message || error.message);
      toast.error("Failed to delete project");
      return false;
    }
  }
};