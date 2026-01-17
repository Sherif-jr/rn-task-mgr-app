import { getTasks, saveTasks } from "@/services/tasks";
import { useCallback, useEffect, useRef, useState } from "react";
import { Task } from "../types/task";
import { useDebounce } from "./useDebounce";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const lastDeletedRef = useRef<{
    task: Task;
    index: number;
    timeoutId: ReturnType<typeof setTimeout>;
  } | null>(null);

  const [persistTasks] = useDebounce((tasks: Task[]) => {
    saveTasks(tasks);
  }, 250);

  //init from async storage
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const stored = await getTasks();
        if (isMounted) {
          setTasks(stored || []);
        }
      } catch (err) {
        console.error("Failed to load tasks", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
      if (lastDeletedRef.current) {
        clearTimeout(lastDeletedRef.current.timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoading) persistTasks(tasks);
  }, [tasks, isLoading, persistTasks]);

  const addTask = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: `${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === id);
      if (index === -1) return prev;

      const task = prev[index];

      if (lastDeletedRef.current) {
        clearTimeout(lastDeletedRef.current.timeoutId);
      }

      const timeoutId = setTimeout(() => {
        lastDeletedRef.current = null;
      }, 5000);

      lastDeletedRef.current = { task, index, timeoutId };

      const updated = [...prev];
      updated.splice(index, 1);

      return updated;
    });
  }, []);

  const undoDelete = useCallback(() => {
    const lastDeleted = lastDeletedRef.current;
    if (!lastDeleted) return;

    const { task, index, timeoutId } = lastDeleted;
    clearTimeout(timeoutId);

    setTasks((prev) => {
      const updated = [...prev];
      const safeIndex = Math.min(index, updated.length);
      updated.splice(safeIndex, 0, task);
      return updated;
    });

    lastDeletedRef.current = null;
  }, []);

  return {
    tasks,
    isLoading,
    lastDeletedTask: lastDeletedRef.current,
    addTask,
    toggleTask,
    deleteTask,
    undoDelete,
  };
};
