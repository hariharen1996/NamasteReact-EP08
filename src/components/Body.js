import { resList, resLists } from "../utils/config";

import { useEffect, useState } from "react";
import RestaurentData from "./RestaurentData";
import { API_DATA } from "../constants";
import { Link } from "react-router-dom";
import { ShimmerUI } from "./ShimmerUI";

const Body = () => {
  const [resData, setResData] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_DATA);
      const data = await response.json();
      const modifieddata = data?.data?.cards;
      const rest_id = "restaurant_grid_listing";
      for (let arr of modifieddata) {
        if (arr.card.card.id === rest_id) {
          const responseData =
            arr?.card?.card?.gridElements?.infoWithStyle?.restaurants;
          setResData(responseData);
          setFilteredRes(responseData);
        }
      }
      console.log(modifieddata);
    } catch (err) {
      console.log(err.message);
    }
  };
  console.log(resData);

  return resData.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div className="body">
      <div className="filter-container">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredData = resData.filter(
              (item) => item.info.avgRating >= 4
            );
            setFilteredRes(filteredData);
          }}
        >
          Top Rated Restaurents
        </button>
        <div className="search-container">
          <input
            type="search"
            className="search-input"
            placeholder="search here.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              const searchFilter = resData.filter((item) =>
                item.info.name.toLowerCase().includes(search.toLowerCase())
              );
              setFilteredRes(searchFilter);
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="rest-container">
        {filteredRes?.map((swiggyData) => (
          <Link
            key={swiggyData.info.id}
            to={`/restaurant/${swiggyData.info.id}`}
          >
            <RestaurentData swiggyData={swiggyData} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
