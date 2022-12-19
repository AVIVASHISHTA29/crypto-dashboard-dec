import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

function SelectCoin({ allCoins }) {
  const [coin1, setCoin1] = useState("bitcoin");
  return (
    <div>
      <Select
        value={coin1}
        onChange={(e) => setCoin1(e.target.value)}
        sx={{
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
        }}
      >
        {allCoins.map((coin, index) => (
          <MenuItem key={index} value={coin.id}>
            {coin.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default SelectCoin;
