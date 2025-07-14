import React from "react";
import styles from "./style-Dashboard-Component.module.scss";
import useSummonerStore from "../../services/useSummonerStore";
import { useGetSummonerData } from "../../services/calls/useGetSummonerData";
import MatchComponent from "../Match/MatchComponent";
import RegionSelectorComponent from "../sub components/regionSelectorComponent";

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
  const [badUser, setBadUser] = React.useState(false);

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
  }, [summonerName, summonerTag, updateCanSubmit]);

  const getSummonerData = useGetSummonerData();

  const handleFullSummonerLoad = async () => {
    setBulkMatchData(null);
    setBadUser(false);
    setLoading(true);
    updateCanSubmit(false);
    await getSummonerData();
    const updatedUUID = useSummonerStore.getState().playerUUID;
    if (updatedUUID === "NA") {
      console.error("Invalid player UUID, cannot fetch match data.");
      document.getElementById("summonerName").placeholder = summonerName;
      document.getElementById("summonerTag").placeholder = summonerTag;
      setBadUser(true);
      document.getElementById("summonerName").value = "";
      document.getElementById("summonerTag").value = "";
      updateCanSubmit(false);
      setBulkMatchData(null);
      setLoading(false);
      return;
    }
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
              <RegionSelectorComponent
                region={region}
                updateRegion={updateRegion}
              />
            </div>
            <div className={styles.name}>
              <p>Summoner Name:</p>
              <input
                id="summonerName"
                onChange={(e) => updateSummonerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleFullSummonerLoad()}
                className={badUser ? styles.falseInput : ""}
              />
            </div>
            <div>
              <p>Tag:</p>
              <input
                id="summonerTag"
                className={badUser ? styles.falseInput : styles.tag}
                placeholder="#"
                onChange={(e) => updateSummonerTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleFullSummonerLoad()}
              />
            </div>
          </div>
          {loading && <p>Loading...</p>}
          {canSubmit && (
            <button onClick={handleFullSummonerLoad}>
              Get {summonerName}'s data
            </button>
          )}
          {bulkMatchData && <p>Match History:</p>}
          {bulkMatchData &&
            bulkMatchData.matches.map((match) => (
              <MatchComponent key={match.metadata.matchId} match={match} />
            ))}
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
