/*
 * Using exports because several hours of trying
 * to make Volar see my declarations in .vue files
 * resulted in failure. Open to any advices
 */

export interface LogEntry {
  id: number;
  temperature: number;
}

/**
 * Vuex store typings
 */
export interface StoreState {
  nextLogId: number;
  logs: LogEntry[];
}

/**
 * Transitional type mostly used in mutation operations
 */
export type LogEntryDto = Omit<LogEntry, 'id'>;
