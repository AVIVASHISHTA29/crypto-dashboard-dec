import { convertDate } from "./convertDate";

export const settingChartData = (setChartData, coin, prices) => {
  setChartData({
    labels: prices.map((data) => convertDate(data[0])),
    datasets: [
      {
        label: coin?.name ?? "",
        data: prices.map((data) => data[1]),
        borderWidth: 1,
        fill: true,
        tension: 0.25,
        backgroundColor: "rgba(58, 128, 233,0.1)",
        borderColor: "#3a80e9",
        pointRadius: 0,
      },
    ],
  });
};
