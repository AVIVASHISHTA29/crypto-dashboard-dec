import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import SelectCoin from "../components/Compare/SelectCoin/selectCoin";
import { get100Coins } from "../functions/get100Coins";

function ComparePage() {
  const [allCoins, setAllCoins] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await get100Coins();
    if (data) {
      setAllCoins(data);
    }
  };

  return (
    <div>
      <Header />
      <SelectCoin allCoins={allCoins} />
    </div>
  );
}

export default ComparePage;
