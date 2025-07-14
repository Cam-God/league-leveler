const RegionSelectorComponent = ({ region, updateRegion }) => {
  const handleRegionChange = (event) => {
    updateRegion(event.target.value);
  };

  return (
    <div className="region-selector">
      <label htmlFor="region">Select Region:</label>
      <select id="region" value={region} onChange={handleRegionChange}>
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
  );
};

export default RegionSelectorComponent;
