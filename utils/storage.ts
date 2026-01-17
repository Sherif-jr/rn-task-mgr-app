import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageError";
  }
}

export class StorageEntity<T extends Record<any, any>> {
  private storageKey: string;
  private cache: T | null = null;
  private writeLock = false;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  async load(fresh: boolean = false): Promise<T | null> {
    if (this.cache && !fresh) return this.cache;

    try {
      const raw = await AsyncStorage.getItem(this.storageKey);
      if (!raw) {
        this.cache = null;
        return null;
      }

      const parsed = JSON.parse(raw);
      this.cache = parsed;
      return parsed;
    } catch (err) {
      const error = new StorageError("Failed to read or parse storage");
      console.error(error);
      this.cache = null;
      return null;
    }
  }

  /**this will overwrite the current stored value */
  async write(items: T | ((current: T) => T)): Promise<void> {
    if (this.writeLock) {
      //prevents concurrent
      await new Promise((resolve) => setTimeout(resolve, 5));
      return this.write(items);
    }

    this.writeLock = true;
    this.cache =
      typeof items === "function"
        ? (items as (current: T) => T)(this.cache as T)
        : items;

    try {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(this.cache));
    } catch (e) {
      const error = new StorageError("Failed to write storage");
      throw error;
    } finally {
      this.writeLock = false;
    }
  }

  public async refresh(): Promise<T | null> {
    return this.load(true);
  }
}
