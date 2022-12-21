import React, { useEffect, useState } from "react";
import Button from "../components/Common/Button/button";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader/loader";
import TabsComponent from "../components/Dashboard/Tabs/tabs";
import { get100Coins } from "../functions/get100Coins";

function WatchlistPage() {
  const coins = JSON.parse(localStorage.getItem("watchlist"));
  const [myWatchlist, setMyWatchlist] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    console.log("COINS>>>", coins);
    const allCoins = await get100Coins();
    console.log("ALLCOINS>>>", allCoins);
    setMyWatchlist(allCoins.filter((item) => coins.includes(item.id)));
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {myWatchlist.length == 0 ? (
            <>
              <Header />
              <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
                No Items in the Watchlist
              </h1>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a href="/dashboard">
                  <Button text={"Dashboard"} />
                </a>
              </div>
            </>
          ) : (
            <>
              <Header />
              <TabsComponent coins={myWatchlist} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default WatchlistPage;
