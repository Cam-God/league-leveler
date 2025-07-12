import { create } from "zustand";

const useSummonerStore = create((set) => ({
  // State variables
  summonerData: null,
  matchHistory: null,
  matchData: null,
  summonerName: "",
  region: "eu",
  tag: "",
  playerUUID: "",
  canSubmit: false,

  // Update functions
  updateSummonerData: (data) => set({ summonerData: data }), // can input any data structure and it will be set to the state property.
  updateMatchHistory: (data) => set({ matchHistory: data }),
  updateMatchData: (data) => set({ matchData: data }),
  updateSummonerName: (name) => set({ summonerName: name }),
  updateRegion: (region) => set({ region }), // expects the input to imediately match the expected region format - and appends it.
  updateTag: (tag) => set({ tag }),
  updatePlayerUUID: (uuid) => set({ playerUUID: uuid }),
  updateCanSubmit: (status) => set({ canSubmit: status }),
}));

export default useSummonerStore;
