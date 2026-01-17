import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";

interface SnackbarProps {
  message: string;
  actionText: string;
  onActionPress: () => void;
  visible: boolean;
  duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  actionText,
  onActionPress,
  visible,
  duration = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const translateY = useRef(new Animated.Value(100)).current;
  const backgroundColor = useThemeColor(
    {
      dark: "#333",
    },
    "background"
  );

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        hideSnackbar();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      hideSnackbar();
    }
  }, [visible, duration]);

  const hideSnackbar = () => {
    Animated.timing(translateY, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
    });
  };

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          backgroundColor,
        },
      ]}
    >
      <ThemedText style={styles.message} numberOfLines={2}>
        {message}
      </ThemedText>
      <Pressable onPress={onActionPress}>
        <ThemedText type="default" style={styles.actionText}>
          {actionText}
        </ThemedText>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  message: {
    flex: 1,
    marginRight: 8,
  },
  actionText: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default Snackbar;
