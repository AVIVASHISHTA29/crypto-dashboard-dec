import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import SelectDays from "../../Coin/SelectDays/selectDays";
import "./styles.css";

function SelectCoin({ allCoins }) {
  const [coin1, setCoin1] = useState(allCoins[0]?.id ?? "bitcoin");
  const [coin2, setCoin2] = useState(allCoins[1]?.id ?? "ethereum");
  const [days, setDays] = useState(120);

  const selectStyle = {
    height: "2.5rem",
    color: "var(--white)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
  };

  return (
    <div className="select-flex">
      <p>Crypto 1</p>
      <Select
        className="select-coin"
        value={coin1}
        onChange={(e) => setCoin1(e.target.value)}
        sx={selectStyle}
      >
        {allCoins
          .filter((coin) => coin.id != coin2)
          .map((coin, index) => (
            <MenuItem key={index} value={coin.id}>
              {coin.name}
            </MenuItem>
          ))}
      </Select>
      <p>Crypto 2</p>
      <Select
        className="select-coin"
        value={coin2}
        onChange={(e) => setCoin2(e.target.value)}
        sx={selectStyle}
      >
        {allCoins
          .filter((coin) => coin.id != coin1)
          .map((coin, index) => (
            <MenuItem key={index} value={coin.id}>
              {coin.name}
            </MenuItem>
          ))}
      </Select>
      <SelectDays
        days={days}
        handleDaysChange={(e) => setDays(e.target.value)}
        noText={true}
      />
    </div>
  );
}

export default SelectCoin;
