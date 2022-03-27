import { defineStore } from 'pinia';

import { LogEntry, LogEntryDto } from '@/types/app';

export const useStore = defineStore('main', {
  state: () => ({
    nextLogId: 1,
    logs: [] as LogEntry[],
  }),
  actions: {
    /**
     * Create new log entry and add it to main storage
     * @param log Log entry data
     */
    createLog(log: LogEntryDto) {
      this.logs.unshift({ ...log, id: this.nextLogId++ });
    },

    /**
     * Delete log entry by its ID
     * @param logId Log ID to delete
     */
    deleteLog(logId: number) {
      const index = this.logs.findIndex((log) => log.id === logId);
      if (index === -1) throw new Error("Log with this ID doesn't exist");

      this.logs.splice(index, 1);
    },

    /**
     * Update log entry data by its ID
     * @param logId ID of log to search for
     * @param dto Data to update in target log entry
     */
    updateLog(logId: number, dto: Partial<LogEntryDto>) {
      const index = this.logs.findIndex((log) => log.id === logId);
      if (index === -1) throw new Error("Log with this ID doesn't exist");

      this.logs.splice(index, 1, { ...this.logs[index], ...dto });
    },
  },
});
