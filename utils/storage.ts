import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageError";
  }
}

export class StorageEntity<T extends { id: string }> {
  private storageKey: string;
  private cache: T[] | null = null;
  private writeLock = false;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  private async load(fresh: boolean = false): Promise<T[]> {
    if (this.cache && !fresh) return this.cache;

    try {
      const raw = await AsyncStorage.getItem(this.storageKey);
      if (!raw) {
        this.cache = [];
        return [];
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        throw new Error("Invalid storage format");
      }
      this.cache = parsed;
      return parsed;
    } catch (err) {
      const error = new StorageError("Failed to read or parse storage");
      console.error(error);
      this.cache = [];
      return [];
    }
  }

  /**this will overwrite the list */
  async write(items: T[]): Promise<void> {
    if (this.writeLock) {
      //prevents concurrent
      await new Promise((resolve) => setTimeout(resolve, 5));
      return this.write(items);
    }

    this.writeLock = true;
    this.cache = items;

    try {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (e) {
      const error = new StorageError("Failed to write storage");
      throw error;
    } finally {
      this.writeLock = false;
    }
  }

  public async find(filters?: Partial<T>): Promise<T[]> {
    const items = await this.load();
    if (!filters) return [...items];

    return items.filter((item) =>
      Object.entries(filters).every(
        ([key, value]) => item[key as keyof T] === value
      )
    );
  }

  public async create(item: T): Promise<T[]> {
    const items = await this.load();

    if (items.some((i) => i.id === item.id)) {
      const error = new StorageError("ID already exists");
      throw error;
    }

    const newItems = [...items, item];
    await this.write(newItems);
    return newItems;
  }

  public async update(
    id: string,
    updates: Partial<Omit<T, "id">>
  ): Promise<T[]> {
    const items = await this.load();
    const index = items.findIndex((i) => i.id === id);

    if (index === -1) {
      const error = new StorageError("Item not found");
      throw error;
    }

    const updatedItem = { ...items[index], ...updates };
    const newItems = [...items];
    newItems[index] = updatedItem;

    await this.write(newItems);

    return newItems;
  }

  public async delete(id: string): Promise<T[]> {
    const items = await this.load();
    const index = items.findIndex((i) => i.id === id);

    if (index === -1) {
      const error = new StorageError("Item not found");
      throw error;
    }

    const deletedItem = items[index];
    const newItems = items.filter((i) => i.id !== id);

    await this.write(newItems);
    return newItems;
  }

  public async refresh(): Promise<T[]> {
    return this.load(true);
  }
}
