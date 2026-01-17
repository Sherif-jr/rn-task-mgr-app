import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollView, StyleSheet } from "react-native";

const settings = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold">App theme:</ThemedText>
        <ThemeToggle />
      </ThemedView>
    </ScrollView>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 12,
  },
});
