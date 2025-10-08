import tasksData from "../mockData/tasks.json";

let tasks = [...tasksData];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const taskService = {
  async getAll() {
    await delay();
    return [...tasks];
  },

  async getById(id) {
    await delay();
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async getByProjectId(projectId) {
    await delay();
    return tasks.filter(t => t.projectId === parseInt(projectId)).map(t => ({ ...t }));
  },

  async create(taskData) {
    await delay();
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    const newTask = {
      Id: maxId + 1,
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, taskData) {
    await delay();
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      tasks[index] = {
        ...tasks[index],
        ...taskData,
        updatedAt: new Date().toISOString()
      };
      return { ...tasks[index] };
    }
    return null;
  },

  async delete(id) {
    await delay();
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      tasks.splice(index, 1);
      return true;
    }
    return false;
  },

  async updateStatus(id, status) {
    return this.update(id, { status });
  }
};