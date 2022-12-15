import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader/loader";
import List from "../components/Dashboard/List/list";

function CoinPage() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState();
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        console.log("RESPONSE>>>", response.data);
        setCoinData(response.data);
        setLoading(false);
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
      })
      .catch((error) => {
        console.log("ERROR>>>", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {loading || !coin?.id ? (
        <Loader />
      ) : (
        <>
          <Header />
          <List coin={coin} delay={1} />
        </>
      )}
    </div>
  );
}

export default CoinPage;
