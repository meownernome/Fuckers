import { REST } from 'discord.js';
import { Logger } from './Logger.js';

const REST_DELAY_MS = 1200;
const MAX_RETRIES = 3;
const REQUEST_TIMEOUT_MS = 20000;

export interface RoleData {
  name: string;
  color: number;
  permissions?: string[];
}

export class RoleCreator {
  private rest: REST;
  private guildId: string;

  constructor(token: string, guildId: string) {
    this.rest = new REST({ version: '10' }).setToken(token);
    this.guildId = guildId;
  }

  async createRole(roleData: RoleData): Promise<string | null> {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

        const role = await this.rest.post(
          `/guilds/${this.guildId}/roles`,
          {
            body: {
              name: roleData.name,
              color: roleData.color,
              permissions: roleData.permissions || [],
              mentionable: false,
              hoist: false,
            },
          },
          { signal: controller.signal }
        );

        clearTimeout(timeoutId);
        Logger.success(`Created role: ${roleData.name} (${role.id})`);
        return role.id;
      } catch (error: unknown) {
        clearTimeout(timeoutId);
        
        if (error instanceof Error && error.name === 'AbortError') {
          Logger.error(`Role creation timeout for ${roleData.name}`, error);
          if (attempt < MAX_RETRIES) {
            await this.delay(REST_DELAY_MS * 2);
            continue;
          }
          return null;
        }

        const restError = error as { status?: number; rawError?: { code?: number; message?: string } };
        
        if (restError.status === 429) {
          const retryAfter = restError.rawError?.retry_after ?? REST_DELAY_MS;
          Logger.rateLimit(`Rate limited creating ${roleData.name}`, retryAfter);
          await this.delay(retryAfter);
          continue;
        }

        if (restError.status === 400 && restError.rawError?.code === 50035) {
          Logger.warn(`Role name invalid: ${roleData.name}`);
          return null;
        }

        if (restError.status === 403) {
          Logger.error(`Missing permissions to create role: ${roleData.name}`, error);
          return null;
        }

        Logger.error(`Failed to create role ${roleData.name} (attempt ${attempt}/${MAX_RETRIES})`, error);
        
        if (attempt < MAX_RETRIES) {
          await this.delay(REST_DELAY_MS);
        }
      }
    }
    return null;
  }

  async createRolesSequentially(roles: RoleData[]): Promise<Map<string, string>> {
    const createdRoles = new Map<string, string>();
    const existingRoles = await this.fetchExistingRoles();
    
    for (const role of roles) {
      if (existingRoles.has(role.name)) {
        Logger.debug(`Role already exists: ${role.name}`);
        createdRoles.set(role.name, existingRoles.get(role.name)!);
        continue;
      }

      const roleId = await this.createRole(role);
      if (roleId) {
        createdRoles.set(role.name, roleId);
        existingRoles.set(role.name, roleId);
      }
      
      await this.delay(REST_DELAY_MS);
    }

    return createdRoles;
  }

  async fetchExistingRoles(): Promise<Map<string, string>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      const roles = await this.rest.get(
        `/guilds/${this.guildId}/roles`,
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);
      
      const roleMap = new Map<string, string>();
      for (const role of roles) {
        roleMap.set(role.name, role.id);
      }
      Logger.info(`Fetched ${roleMap.size} existing roles`);
      return roleMap;
    } catch (error) {
      Logger.error('Failed to fetch existing roles', error);
      return new Map();
    }
  }

  async deleteRole(roleId: string): Promise<boolean> {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

        await this.rest.delete(
          `/guilds/${this.guildId}/roles/${roleId}`,
          { signal: controller.signal }
        );

        clearTimeout(timeoutId);
        Logger.success(`Deleted role: ${roleId}`);
        return true;
      } catch (error: unknown) {
        clearTimeout(timeoutId);
        
        const restError = error as { status?: number; rawError?: { code?: number; message?: string } };
        
        if (restError.status === 429) {
          const retryAfter = restError.rawError?.retry_after ?? REST_DELAY_MS;
          Logger.rateLimit(`Rate limited deleting role ${roleId}`, retryAfter);
          await this.delay(retryAfter);
          continue;
        }

        Logger.error(`Failed to delete role ${roleId} (attempt ${attempt}/${MAX_RETRIES})`, error);
        
        if (attempt < MAX_RETRIES) {
          await this.delay(REST_DELAY_MS);
        }
      }
    }
    return false;
  }

  async deleteAllRoles(roleIds: string[]): Promise<number> {
    let deleted = 0;
    for (const roleId of roleIds) {
      if (await this.deleteRole(roleId)) {
        deleted++;
      }
      await this.delay(REST_DELAY_MS);
    }
    return deleted;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}