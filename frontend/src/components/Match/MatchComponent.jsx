import React from "react";
import useSummonerStore from "../../services/useSummonerStore";
import styles from "./style-MatchComponent.module.scss";
import champIcons from "../../assets/champIconMap.json";

const MatchComponent = (props) => {
  const { summonerData } = useSummonerStore();
  const summonerId = summonerData ? summonerData.puuid : null;

  const matchData = props.match;
  const summonerFromMatch = matchData.info.participants.find(
    (participant) => participant.puuid === summonerId
  );
  console.log("summonerFromMatch:", summonerFromMatch);

  const champIconNumber = summonerFromMatch.championName
    ? champIcons[summonerFromMatch.championName.toLowerCase()]
    : null;

  const didWin = summonerFromMatch.win;

  return (
    <div className={[styles.main, didWin ? styles.win : styles.loss].join(" ")}>
      <div className={styles.reportSummary}>
        <p className={styles.resultText}>{didWin ? "Victory" : "Defeat"}:</p>
        {/* <p className={styles.championName}>{summonerFromMatch.championName}</p> */}
        <div className={styles.championIcon}>
          <img src={champIcons.baseUrl + champIconNumber} />
        </div>
      </div>
      <div className={styles.matchDetails}>
        <p>KDA</p>
        <p className={styles.kda}>
          {summonerFromMatch.kills} / {summonerFromMatch.deaths} /{" "}
          {summonerFromMatch.assists}
        </p>
        <p>Lvl: {summonerFromMatch.champLevel}</p>
      </div>
      <div className={styles.items}>
        <p>Items:</p>
      </div>
    </div>
  );
};

export default MatchComponent;
