import { useAppTheme } from "@/hooks/use-app-theme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const THEME_OPTIONS = ["light", "dark", "system"] as const;

export function ThemeToggle() {
  const { theme, themeMode, setThemeMode } = useAppTheme();

  return (
    <View style={styles.container}>
      {THEME_OPTIONS.map((mode) => (
        <Pressable
          key={mode}
          onPress={() => setThemeMode(mode)}
          style={[styles.option, themeMode === mode && styles.selectedOption]}
        >
          <Text
            style={[
              styles.optionText,
              { color: theme === "dark" ? "#fff" : "#000" },
              themeMode === mode && styles.selectedText,
            ]}
          >
            {mode}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedOption: {
    backgroundColor: "#0a7ea4",
    borderColor: "#0a7ea4",
  },
  optionText: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },
});
