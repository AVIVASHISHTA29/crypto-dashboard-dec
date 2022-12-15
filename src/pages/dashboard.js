import axios from "axios";
import { useEffect, useState } from "react";
import TopButton from "../components/Common/BackToTop/topButton";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader/loader";
import PaginationComponent from "../components/Dashboard/Pagination/pagination";
import SearchComponent from "../components/Dashboard/Search/search";
import TabsComponent from "../components/Dashboard/Tabs/tabs";

function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const handlePageChange = (event, value) => {
    console.log("Page number1 ", value);
    setPageNumber(value);
    // Page 1 - [0,10)
    // Page 2 - [10,20)
    // Page 3 - [20,30)
    var startingIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(startingIndex, startingIndex + 10));
  };

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
    setLoading(true);
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        console.log("RESPONSE>>>", response);
        if (response.status == 200) {
          setCoins(response.data);
          setPaginatedCoins(response.data.slice(0, 10));
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("ERROR>>>", error);
        setLoading(false);
      });
  };

  return (
    <>
      <TopButton />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <SearchComponent search={search} onChange={onChange} />
          <TabsComponent coins={search ? filteredCoins : paginatedCoins} />
          {!search && (
            <PaginationComponent
              pageNumber={pageNumber}
              handleChange={handlePageChange}
            />
          )}
        </div>
      )}
    </>
  );
}

export default DashboardPage;
