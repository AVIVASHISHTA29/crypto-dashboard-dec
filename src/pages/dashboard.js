import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs/tabs";

function DashboardPage() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // Call the API and get the data
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        console.log("RESPONSE>>>", response);
        if (response.status == 200) {
          setCoins(response.data);
        }
      })
      .catch((error) => {
        console.log("ERROR>>>", error);
      });
  };

  return (
    <div>
      <Header />
      <TabsComponent coins={coins} />
    </div>
  );
}

export default DashboardPage;
