import React from "react";
import styles from "./style-Dashboard-Component.module.scss";

const DashboardComponent = () => {
  const [summonerData, setSummonerData] = React.useState(null);
  const [matchHistory, setMatchHistory] = React.useState(null);
  const [matchData, setMatchData] = React.useState(null);

  const [summonerName, setSummonerName] = React.useState("");
  const [region, setRegion] = React.useState("eu");
  const [tag, setTag] = React.useState("");
  const [playerUUID, setPlayerUUID] = React.useState("");

  const [canSubmit, setCanSubmit] = React.useState(false);
  React.useEffect(() => {
    if (summonerName && tag) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [summonerName, tag]);

  const getSummonerData = async () => {
    const response = await fetch(
      `/api/riot-account/${region}/${summonerName}/${tag}`
    );
    const data = await response.json();
    setSummonerData(data);
    setPlayerUUID(data.puuid);
  };

  const getMatchHistory = async () => {
    const response = await fetch(`/api/match-history/eu/${playerUUID}`);
    const data = await response.json();
    setMatchHistory(data);
  };

  const getMatchData = async () => {
    const response = await fetch(
      `/api/match-details/eu/${matchHistory.match_ids[0]}`
    );
    const data = await response.json();
    setMatchData(data);
  };

  return (
    <>
      <div className={styles.main}>
        <p className={styles.title}>Dashboard</p>
        <div>
          <div className={styles.inputSection}>
            <div className={styles.region}>
              <p>Region:</p>
              <select onChange={(e) => setRegion(e.target.value)}>
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
              <input onChange={(e) => setSummonerName(e.target.value)} />
            </div>
            <div>
              <p>Tag:</p>
              <input
                className={styles.tag}
                placeholder="#"
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
          </div>
          {canSubmit && (
            <button onClick={getSummonerData}>Get {summonerName}'s data</button>
          )}
          {playerUUID && <pre>{JSON.stringify(summonerData, null, 2)}</pre>}
          {playerUUID && (
            <button onClick={getMatchHistory}>Get match history</button>
          )}
          {matchHistory && (
            <pre className={styles.test}>
              {JSON.stringify(matchHistory, null, 2)}
            </pre>
          )}
          {matchHistory && (
            <button onClick={getMatchData}>Get match data</button>
          )}
          {matchData && (
            <pre className={styles.test}>
              {JSON.stringify(matchData, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
