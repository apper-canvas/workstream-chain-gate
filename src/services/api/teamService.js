import { toast } from "react-toastify";

const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = "team_member_c";

export const teamService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name_c" } },
          { field: { Name: "Email_c" } },
          { field: { Name: "Role_c" } },
          { field: { Name: "Avatar_c" } }
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
      console.error("Error fetching team members:", error?.response?.data?.message || error.message);
      toast.error("Failed to load team members");
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name_c" } },
          { field: { Name: "Email_c" } },
          { field: { Name: "Role_c" } },
          { field: { Name: "Avatar_c" } }
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
      console.error(`Error fetching team member ${id}:`, error?.response?.data?.message || error.message);
      toast.error("Failed to load team member");
      return null;
    }
  },

  async create(memberData) {
    try {
      const payload = {
        records: [
          {
            Name_c: memberData.Name_c || memberData.name,
            Email_c: memberData.Email_c || memberData.email,
            Role_c: memberData.Role_c || memberData.role,
            Avatar_c: memberData.Avatar_c || memberData.avatar
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
          console.error(`Failed to create ${failed.length} team members: ${JSON.stringify(failed)}`);
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
      console.error("Error creating team member:", error?.response?.data?.message || error.message);
      toast.error("Failed to create team member");
      return null;
    }
  },

  async update(id, memberData) {
    try {
      const payload = {
        records: [
          {
            Id: parseInt(id),
            ...(memberData.Name_c !== undefined && { Name_c: memberData.Name_c }),
            ...(memberData.name !== undefined && { Name_c: memberData.name }),
            ...(memberData.Email_c !== undefined && { Email_c: memberData.Email_c }),
            ...(memberData.email !== undefined && { Email_c: memberData.email }),
            ...(memberData.Role_c !== undefined && { Role_c: memberData.Role_c }),
            ...(memberData.role !== undefined && { Role_c: memberData.role }),
            ...(memberData.Avatar_c !== undefined && { Avatar_c: memberData.Avatar_c }),
            ...(memberData.avatar !== undefined && { Avatar_c: memberData.avatar })
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
          console.error(`Failed to update ${failed.length} team members: ${JSON.stringify(failed)}`);
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
      console.error("Error updating team member:", error?.response?.data?.message || error.message);
      toast.error("Failed to update team member");
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
          console.error(`Failed to delete ${failed.length} team members: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0;
      }

      return false;
    } catch (error) {
      console.error("Error deleting team member:", error?.response?.data?.message || error.message);
      toast.error("Failed to delete team member");
      return false;
    }
  }
};