import React from "react";
import styles from "./style-Dashboard-Component.module.scss";
import useSummonerStore from "../../services/useSummonerStore";
import { useGetSummonerData } from "../../services/calls/useGetSummonerData";
import MatchComponent from "../Match/MatchComponent";
import ChampIconMap from "../../assets/champIconMap.json";

const DashboardComponent = () => {
  const {
    summonerName,
    region,
    summonerTag,
    canSubmit,
    updateSummonerName,
    updateRegion,
    updateSummonerTag,
    updateCanSubmit,
  } = useSummonerStore();

  const [bulkMatchData, setBulkMatchData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // const [allItems, setAllItems] = React.useState(null);

  // const itemMap = async () => {
  //   const response = await fetch(
  //     "https://ddragon.leagueoflegends.com/cdn/14.13.1/data/en_US/item.json"
  //   );
  //   const data = await response.json();
  //   const items = {};
  //   Object.keys(data.data).forEach((key) => {
  //     items[data.data[key].id] = data.data[key].name;
  //   });
  //   setAllItems(items);
  //   console.log("All items:", items);
  //   return items;
  // };

  React.useEffect(() => {
    if (summonerName && summonerTag) {
      updateCanSubmit(true);
    } else {
      updateCanSubmit(false);
    }
  }, [summonerName, summonerTag]);

  const getSummonerData = useGetSummonerData();

  const handleFullSummonerLoad = async () => {
    setLoading(true);
    updateCanSubmit(false);
    await getSummonerData();

    const updatedUUID = useSummonerStore.getState().playerUUID;
    console.log("Player UUID after update:", updatedUUID);

    const response = await fetch(
      `/api/match-details/bulk/${region}/${updatedUUID}`
    );
    const data = await response.json();
    setBulkMatchData(data);
    setLoading(false);
  };

  return (
    <>
      <div className={styles.main}>
        <p className={styles.title}>Dashboard</p>
        <div>
          <div className={styles.inputSection}>
            <div className={styles.region}>
              <p>Region:</p>
              <select onChange={(e) => updateRegion(e.target.value)}>
                <option value="eu">EUW/EUNE</option>
                <option value="na">NA</option>
                <option value="kr">KR</option>
                <option value="jp">JP</option>
                <option value="br">BR</option>
                <option value="lan">LAN</option>
                <option value="las">LAS</option>
                <option value="oce">OCE</option>
                <option value="tr">TR</option>
                <option value="ru">RU</option>
                <option value="ph">PH</option>
                <option value="sg">SG</option>
                <option value="th">TH</option>
                <option value="vn">VN</option>
                <option value="tw">TW</option>
                <option value="pbe">PBE</option>
                <option value="global">Global</option>
              </select>
            </div>
            <div className={styles.name}>
              <p>Summoner Name:</p>
              <input onChange={(e) => updateSummonerName(e.target.value)} />
            </div>
            <div>
              <p>Tag:</p>
              <input
                className={styles.tag}
                placeholder="#"
                onChange={(e) => updateSummonerTag(e.target.value)}
              />
            </div>
          </div>
          {loading && <p>Loading...</p>}
          {canSubmit && (
            <button onClick={handleFullSummonerLoad}>
              Get {summonerName}'s data
            </button>
          )}
          {bulkMatchData &&
            bulkMatchData.matches.map((match) => (
              <MatchComponent key={match.metadata.matchId} match={match} />
            ))}
          <div className={styles.champs}></div>
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
