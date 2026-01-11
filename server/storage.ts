
import { db } from "./db";
import {
  userSettings,
  type InsertUserSettings,
  type UserSettings
} from "@shared/schema";

export interface IStorage {
  getUserSettings(sessionId: string): Promise<UserSettings | undefined>;
  saveUserSettings(settings: InsertUserSettings): Promise<UserSettings>;
}

export class DatabaseStorage implements IStorage {
  async getUserSettings(sessionId: string): Promise<UserSettings | undefined> {
    // Simulate the eq function behavior
    const condition = { _: { column: { name: 'sessionId' }, value: sessionId } };
    const result = await db
      .select()
      .from(userSettings)
      .where(condition);
    return result[0];
  }

  async saveUserSettings(settings: InsertUserSettings): Promise<UserSettings> {
    // Upsert
    const existing = await this.getUserSettings(settings.sessionId);
    if (existing) {
      const condition = { _: { column: { name: 'sessionId' }, value: settings.sessionId } };
      const result = await db
        .update(userSettings)
        .set(settings)
        .where(condition)
        .returning();
      return result[0];
    }
    
    const result = await db.insert(userSettings).values(settings).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
