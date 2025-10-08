import projectsData from "../mockData/projects.json";

let projects = [...projectsData];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const projectService = {
  async getAll() {
    await delay();
    return [...projects];
  },

  async getById(id) {
    await delay();
    const project = projects.find(p => p.Id === parseInt(id));
    return project ? { ...project } : null;
  },

  async create(projectData) {
    await delay();
    const maxId = projects.length > 0 ? Math.max(...projects.map(p => p.Id)) : 0;
    const newProject = {
      Id: maxId + 1,
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    projects.push(newProject);
    return { ...newProject };
  },

  async update(id, projectData) {
    await delay();
    const index = projects.findIndex(p => p.Id === parseInt(id));
    if (index !== -1) {
      projects[index] = {
        ...projects[index],
        ...projectData,
        updatedAt: new Date().toISOString()
      };
      return { ...projects[index] };
    }
    return null;
  },

  async delete(id) {
    await delay();
    const index = projects.findIndex(p => p.Id === parseInt(id));
    if (index !== -1) {
      projects.splice(index, 1);
      return true;
    }
    return false;
  }
};