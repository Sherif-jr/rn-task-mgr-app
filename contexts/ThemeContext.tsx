import { settingsDB } from "@/services/settings";
import {
    createContext,
    FC,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useColorScheme as useDeviceColorScheme } from "react-native";

type ThemeMode = "light" | "dark" | "system";

type ThemeContextType = {
  theme: "light" | "dark";
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const deviceTheme = useDeviceColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  const theme = useMemo(
    () => (themeMode === "system" ? deviceTheme ?? "light" : themeMode),
    [themeMode, deviceTheme]
  );

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const settings = await settingsDB.load();
        if (settings?.theme) setThemeMode(settings.theme);
      } catch (error) {
        console.error("Couldn't load theme from storage");
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    const saveTheme = async () => {
      try {
        await settingsDB.write((settings) => ({
          ...settings,
          theme: themeMode,
        }));
      } catch (error) {
        console.error("Couldn't save theme to storage");
      }
    };
    saveTheme();
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
