import { createStore } from 'vuex';

import { LogEntryDto, StoreState } from '@/types/app';

export type UpdateLogPayload = {
  /** ID of log to search for */
  logId: number;
  /** Data to update in target log entry */
  data: Partial<LogEntryDto>;
};

export default createStore<StoreState>({
  state: {
    nextLogId: 1,
    logs: [],
  },
  mutations: {
    createLog: (state, log: LogEntryDto) => {
      state.logs.unshift({ ...log, id: state.nextLogId++ });
    },
    deleteLog: (state, logId: number) => {
      const index = state.logs.findIndex((log) => log.id === logId);
      if (index === -1) throw new Error("Log with this ID doesn't exist");

      state.logs.splice(index, 1);
    },
    updateLog: (state, payload: UpdateLogPayload) => {
      const index = state.logs.findIndex((log) => log.id === payload.logId);
      if (index === -1) throw new Error("Log with this ID doesn't exist");

      state.logs.splice(index, 1, { ...state.logs[index], ...payload.data });
    },
  },
  actions: {
    /**
     * Create new log entry and add it to main storage
     * @param log Log entry data
     */
    createLog: ({ commit }, log: LogEntryDto) => commit('createLog', log),
    /**
     * Delete log entry by its ID
     * @param logId Log ID to delete
     */
    deleteLog: ({ commit }, logId: number) => commit('deleteLog', logId),
    /**
     * Update log entry data by its ID
     * @param payload Operation options
     */
    updateLog: ({ commit }, payload: UpdateLogPayload) => commit('updateLog', payload),
  },
});
