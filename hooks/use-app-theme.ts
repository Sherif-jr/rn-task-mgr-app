import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";

type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

export function useAppTheme() {
  const { theme, themeMode, setThemeMode } = useTheme();

  const getThemeColor = (
    props: { light?: string; dark?: string },
    colorName: ColorName
  ) => {
    const colorFromProps = props[theme];
    return colorFromProps || Colors[theme][colorName];
  };

  return {
    theme,
    themeMode,
    setThemeMode,
    colors: Colors[theme],
    getThemeColor,
  };
}
