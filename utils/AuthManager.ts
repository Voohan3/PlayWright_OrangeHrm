import fs from "fs";
import path from "path";

export class AuthManager {
  private readonly storageStatePath: string;

  constructor(storageStatePath = ".auth/admin.json") {
    this.storageStatePath = storageStatePath;
  }

  /**
   * Returns the storage state path.
   */
  public getStorageStatePath(): string {
    return this.storageStatePath;
  }

  /**
   * Checks whether the storage state file exists.
   */
  public storageStateExists(): boolean {
    return fs.existsSync(this.storageStatePath);
  }

  /**
   * Deletes the existing storage state.
   */
  public deleteStorageState(): void {
    if (this.storageStateExists()) {
      fs.unlinkSync(this.storageStatePath);
    }
  }

  /**
   * Creates the .auth folder if it doesn't exist.
   */
  public createAuthDirectory(): void {
    const directory = path.dirname(this.storageStatePath);

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  }

  /**
   * Returns true if authentication needs to be generated.
   */
  public shouldGenerateStorageState(): boolean {
    return !this.storageStateExists();
  }
}
