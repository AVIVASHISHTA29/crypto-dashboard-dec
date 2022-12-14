import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import SearchComponent from "../components/Dashboard/Search/search";
import TabsComponent from "../components/Dashboard/Tabs/tabs";

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  var filteredCoins = coins.filter((coin) => {
    if (
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    ) {
      return coin;
    }
  });

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
      <SearchComponent search={search} onChange={onChange} />
      <TabsComponent coins={filteredCoins} />
    </div>
  );
}

export default DashboardPage;
