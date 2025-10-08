import teamMembersData from "../mockData/teamMembers.json";

let teamMembers = [...teamMembersData];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const teamService = {
  async getAll() {
    await delay();
    return [...teamMembers];
  },

  async getById(id) {
    await delay();
    const member = teamMembers.find(m => m.Id === parseInt(id));
    return member ? { ...member } : null;
  },

  async create(memberData) {
    await delay();
    const maxId = teamMembers.length > 0 ? Math.max(...teamMembers.map(m => m.Id)) : 0;
    const newMember = {
      Id: maxId + 1,
      ...memberData
    };
    teamMembers.push(newMember);
    return { ...newMember };
  },

  async update(id, memberData) {
    await delay();
    const index = teamMembers.findIndex(m => m.Id === parseInt(id));
    if (index !== -1) {
      teamMembers[index] = {
        ...teamMembers[index],
        ...memberData
      };
      return { ...teamMembers[index] };
    }
    return null;
  },

  async delete(id) {
    await delay();
    const index = teamMembers.findIndex(m => m.Id === parseInt(id));
    if (index !== -1) {
      teamMembers.splice(index, 1);
      return true;
    }
    return false;
  }
};