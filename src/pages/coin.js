import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/Coin/CoinInfo/info";
import LineChart from "../components/Coin/LineChart/lineChart";
import SelectDays from "../components/Coin/SelectDays/selectDays";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader/loader";
import List from "../components/Dashboard/List/list";

function CoinPage() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState();
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getData();
  }, [id]);

  const getData = () => {
    setLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        console.log("RESPONSE>>>", response.data);
        setCoinData(response.data);
        setCoin({
          id: response.data.id,
          name: response.data.name,
          symbol: response.data.symbol,
          image: response.data.image.large,
          desc: response.data.description.en,
          price_change_percentage_24h:
            response.data.market_data.price_change_percentage_24h,
          total_volume: response.data.market_data.total_volume.usd,
          current_price: response.data.market_data.current_price.usd,
          market_cap: response.data.market_data.market_cap.usd,
        });
        getPrices();
      })
      .catch((error) => {
        console.log("ERROR>>>", error);
        setLoading(false);
      });
  };

  const getPrices = () => {
    setLoading(false);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`
      )
      .then((response) => {
        console.log("PRICES>>>>", response.data.prices);
        setChartData({
          labels: response.data.prices.map(
            (data) =>
              new Date(data[0]).getDate() +
              "/" +
              (new Date(data[0]).getMonth() + 1)
          ),
          datasets: [
            {
              label: coin.name,
              data: response.data.prices.map((data) => data[1]),
              borderColor: "#fff",
            },
          ],
        });
      })
      .catch((error) => {
        console.log("ERROR>>>", error);
        setLoading(false);
      });
  };

  return (
    <div>
      {loading || !coin?.id || !chartData ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="grey-wrapper">
            <List coin={coin} delay={0.1} />
          </div>
          <div className="grey-wrapper">
            <SelectDays />
            <LineChart chartData={chartData} />
          </div>
          <CoinInfo name={coin.name} desc={coin.desc} />
        </>
      )}
    </div>
  );
}

export default CoinPage;
