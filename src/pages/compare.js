import React, { useEffect, useState } from "react";
import CoinInfo from "../components/Coin/CoinInfo/info";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader/loader";
import SelectCoin from "../components/Compare/SelectCoin/selectCoin";
import List from "../components/Dashboard/List/list";
import { coinObject } from "../functions/coinObject";
import { get100Coins } from "../functions/get100Coins";
import { getCoinData } from "../functions/getCoinData";

function ComparePage() {
  const [allCoins, setAllCoins] = useState([]);
  const [coin1, setCoin1] = useState(allCoins[0]?.id ?? "bitcoin");
  const [coin2, setCoin2] = useState(allCoins[1]?.id ?? "ethereum");
  const [days, setDays] = useState(120);
  const [coin1Data, setCoin1Data] = useState();
  const [coin2Data, setCoin2Data] = useState();
  const [loading, setLoading] = useState(false);

  const handleCoinChange = async (e, isCoin1) => {
    if (isCoin1) {
      setCoin1(e.target.value);
      const data1 = await getCoinData(e.target.value);
      coinObject(setCoin1Data, data1);
    } else {
      setCoin2(e.target.value);
      const data2 = await getCoinData(e.target.value);
      coinObject(setCoin2Data, data2);
    }
  };
  const handleDaysChange = (e) => {
    setDays(e.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const data = await get100Coins();
    if (data) {
      setAllCoins(data);
    }
    const data1 = await getCoinData(coin1);
    const data2 = await getCoinData(coin2);
    coinObject(setCoin1Data, data1);
    coinObject(setCoin2Data, data2);
    setLoading(false);
  };

  return (
    <div>
      {loading || !coin1Data?.id || !coin2Data?.id ? (
        <Loader />
      ) : (
        <>
          <Header />
          <SelectCoin
            allCoins={allCoins}
            coin1={coin1}
            coin2={coin2}
            days={days}
            handleCoinChange={handleCoinChange}
            handleDaysChange={handleDaysChange}
          />
          <div className="grey-wrapper">
            <List coin={coin1Data} delay={0.1} />
          </div>
          <div className="grey-wrapper">
            <List coin={coin2Data} delay={0.2} />
          </div>
          <CoinInfo name={coin1Data.name} desc={coin1Data.desc} />
          <CoinInfo name={coin2Data.name} desc={coin2Data.desc} />
        </>
      )}
    </div>
  );
}

export default ComparePage;
