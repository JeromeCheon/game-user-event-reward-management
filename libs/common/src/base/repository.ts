export interface Repository<T> {
  insert(entity: T): Promise<void>;
  // findById(id: string): Promise<T | null>;
}
