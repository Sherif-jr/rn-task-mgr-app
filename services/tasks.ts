import { Task } from "../types/task";
import { StorageEntity } from "../utils/storage";

const TASKS_STORAGE_KEY = "@TaskManager:tasks";

export const tasksDB = new StorageEntity<Task>(TASKS_STORAGE_KEY);

const saveTasks = async (tasks: Task[]) => {
  await tasksDB.write(tasks);
};

const getTasks = async () => {
  return await tasksDB.find();
};

export { getTasks, saveTasks };
