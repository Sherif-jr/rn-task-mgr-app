import { Colors } from "@/constants/theme";
import { Task } from "@/types/task";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  isLoading?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  isLoading,
}) => {
  const renderItem: ListRenderItem<Task> = useCallback(
    ({ item }) => (
      <TaskItem task={item} onToggle={onToggleTask} onDelete={onDeleteTask} />
    ),
    [onToggleTask, onDeleteTask]
  );

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={Colors.light.tint} size={60} />
              <Text style={styles.emptyText}>Loading saved tasks...</Text>
            </View>
          ) : (
            <Text style={styles.emptyText}>No tasks yet. Add one above!</Text>
          )}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: "100%",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  loadingContainer: {
    gap: 10,
  },
});

export default TaskList;
