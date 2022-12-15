import React from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { convertNumbers } from "../../../functions/convertNumbers";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";

function List({ coin, delay }) {
  return (
    <a href={`/coin/${coin.id}`}>
      <motion.tr
        className="list-row"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: delay }}
      >
        <Tooltip placement="bottom-start" title="Image">
          <td className="td-img">
            <img src={coin.image} className="coin-image" />
          </td>
        </Tooltip>
        <Tooltip placement="bottom-start" title="Info">
          <td className="td-info-flex">
            <div className="coin-name-flex">
              <h3 className="coin-symbol coin-symbol-list">{coin.symbol}</h3>
              <p className="coin-name coin-name-list">{coin.name}</p>
            </div>
          </td>
        </Tooltip>
        <Tooltip placement="bottom-start" title="Price">
          <td>
            {coin.price_change_percentage_24h > 0 ? (
              <div className="info-flex" style={{ marginBottom: 0 }}>
                <div className="price-chip price-chip-list">
                  {coin.price_change_percentage_24h.toFixed(2)} %
                </div>
                <TrendingUpRoundedIcon className="trending-icon trending-icon-list" />
              </div>
            ) : (
              <div className="info-flex" style={{ marginBottom: 0 }}>
                <div className="price-chip price-chip-list red">
                  {coin.price_change_percentage_24h.toFixed(2)} %
                </div>
                <TrendingDownRoundedIcon className="trending-icon red trending-icon-list" />
              </div>
            )}
          </td>
        </Tooltip>
        <Tooltip placement="bottom-start" title="Curent Price">
          <td>
            <p
              className={`coin-price coin-price-list ${
                coin.price_change_percentage_24h < 0 && "coin-price-red"
              }`}
            >
              ${coin.current_price.toLocaleString()}
            </p>
          </td>
        </Tooltip>
        <Tooltip placement="bottom-start" title="Total Volume">
          <td className="td-mkt-cap">
            <span className="coin-total_volume">
              {coin.total_volume.toLocaleString()}
            </span>
          </td>
        </Tooltip>
        <Tooltip placement="bottom-start" title="Market Cap">
          <td className="td-mkt-cap">
            <span className="coin-total_volume">
              ${coin.market_cap.toLocaleString()}
            </span>
          </td>
        </Tooltip>
        <Tooltip placement="bottom-start" title="Market Cap">
          <td className="mobile-td-cap">
            <span className="coin-total_volume coin-total_volume-list">
              ${convertNumbers(parseInt(coin.market_cap))}
            </span>
          </td>
        </Tooltip>
      </motion.tr>
    </a>
  );
}

export default List;
