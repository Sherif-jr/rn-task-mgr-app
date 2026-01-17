import { ThemeProvider } from "@/contexts/ThemeContext";
import { useAppTheme } from "@/hooks/use-app-theme";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function NavigationThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useAppTheme();
  const navigationTheme =
    theme === "dark" ? NavigationDarkTheme : NavigationDefaultTheme;

  return (
    <NavigationThemeProvider value={navigationTheme}>
      {children}
    </NavigationThemeProvider>
  );
}

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationThemeWrapper>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </NavigationThemeWrapper>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
