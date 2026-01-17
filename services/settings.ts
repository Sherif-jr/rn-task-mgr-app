import { StorageEntity } from "@/utils/storage";

const SETTINGS_KEY = "@TaskManager:settings";
interface Settings {
  theme: "light" | "dark" | "system";
}

export const settingsDB = new StorageEntity<Settings>(SETTINGS_KEY);
