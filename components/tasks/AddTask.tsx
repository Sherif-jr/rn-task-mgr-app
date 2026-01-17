import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface AddTaskProps {
  onAddTask: (text: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [text, setText] = useState("");

  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  const borderColor = useThemeColor(
    {
      dark: "#333",
      light: "#eee",
    },
    "icon"
  );

  const handleAddTask = () => {
    if (text.trim()) {
      onAddTask(text);
      setText("");
    }
  };

  const isAddButtonDisabled = !text.trim();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          borderTopColor: borderColor,
        },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          {
            color: textColor,
          },
        ]}
        value={text}
        onChangeText={setText}
        placeholder="Add a new task..."
        placeholderTextColor="#999"
        onSubmitEditing={handleAddTask}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[styles.addButton, isAddButtonDisabled && { opacity: 0.5 }]}
        onPress={handleAddTask}
        disabled={isAddButtonDisabled}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    fontSize: 16,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.tint,
  },
});

export default AddTask;
