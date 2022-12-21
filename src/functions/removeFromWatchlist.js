export const removeFromWatchlist = (id) => {
  let items = localStorage.getItem("watchlist");
  let arr = JSON.parse(items);
  localStorage.setItem(
    "watchlist",
    JSON.stringify(arr.filter((item) => item != id))
  );
};
