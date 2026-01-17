import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Task } from "@/types/task";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedView } from "../themed-view";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const [collapsed, setCollapsed] = useState(true);
  const tintColor = useThemeColor({}, "tint");
  const bg = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "icon");
  const textColor = useThemeColor({}, "text");

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        onPress={() => setCollapsed((prev) => !prev)}
        activeOpacity={0.7}
      >
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              { borderColor: task.completed ? tintColor : borderColor },
              { backgroundColor: task.completed ? tintColor : bg },
            ]}
            onPress={() => onToggle(task.id)}
            hitSlop={10}
          >
            {task.completed ? (
              <Ionicons name="checkmark-done-outline" size={18} color={bg} />
            ) : (
              <Ionicons name="checkmark" size={18} color={Colors.light.icon} />
            )}
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              { color: textColor },
              task.completed && styles.completedText,
            ]}
            numberOfLines={collapsed ? 1 : undefined}
          >
            {task.text}
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(task.id)}
            hitSlop={10}
          >
            <Ionicons name="close" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  row: { flexDirection: "row", alignItems: "center", padding: 16 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
    fontStyle: "italic",
  },
  deleteButton: {
    padding: 8,
  },
});

export default TaskItem;
