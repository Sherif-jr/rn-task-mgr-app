import { AddTask, Snackbar, TaskList } from "@/components/tasks";
import { useTasks } from "@/hooks/useTasks";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TasksScreen() {
  const {
    tasks,
    isLoading,
    lastDeletedTask,
    addTask,
    toggleTask,
    deleteTask,
    undoDelete,
  } = useTasks();
  const { top } = useSafeAreaInsets();

  return (
    <>
      <TaskList
        tasks={tasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
        isLoading={isLoading}
      />
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={top}>
        <AddTask onAddTask={addTask} />
      </KeyboardAvoidingView>

      <Snackbar
        visible={!!lastDeletedTask}
        message="Task deleted"
        actionText="UNDO"
        onActionPress={undoDelete}
        duration={5000}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});
