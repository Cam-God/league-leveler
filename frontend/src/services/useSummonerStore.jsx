import { create } from "zustand";

const useSummonerStore = create((set) => ({
  // Summoner data
  summonerData: null,
  updateSummonerData: (data) => set({ summonerData: data }),

  // Match history
  matchHistory: null,
  updateMatchHistory: (data) => set({ matchHistory: data }),

  // Match data
  matchData: null,
  updateMatchData: (data) => set({ matchData: data }),

  // Summoner name
  summonerName: "",
  updateSummonerName: (name) => set({ summonerName: name }),

  // Region
  region: "eu",
  updateRegion: (region) => set({ region }),

  // Summoner tag
  summonerTag: "",
  updateSummonerTag: (summonerTag) => set({ summonerTag }),

  // Summoner UUID
  playerUUID: "",
  updatePlayerUUID: (playerUUID) => set({ playerUUID }),

  // Can submit flag
  canSubmit: false,
  updateCanSubmit: (status) => set({ canSubmit: status }),

  // Bulk match data
  bulkMatchData: null,
  updateBulkMatchData: (data) => set({ bulkMatchData: data }),
}));

export default useSummonerStore;
