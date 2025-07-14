import useSummonerStore from "../useSummonerStore";

export function useGetSummonerData() {
  const {
    summonerName,
    summonerTag,
    region,
    updateSummonerData,
    updatePlayerUUID,
  } = useSummonerStore();

  const getSummonerData = async () => {
    const response = await fetch(
      `/api/riot-account/${region}/${summonerName}/${summonerTag}`
    );
    const data = await response.json();
    if (!data || !data.puuid) {
      updatePlayerUUID("NA");
      return new Error("Invalid summoner data received");
    }
    updateSummonerData(data);
    updatePlayerUUID(data.puuid);
  };

  return getSummonerData;
}
