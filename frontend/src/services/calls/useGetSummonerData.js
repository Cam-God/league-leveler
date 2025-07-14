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

    updateSummonerData(data);
    updatePlayerUUID(data.puuid);
  };

  return getSummonerData;
}
